<?php declare(strict_types=1);
/*
 * (c) shopware AG <info@shopware.com>
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Swag\PayPal\Checkout\Plus;

use Psr\Log\LoggerInterface;
use Shopware\Core\Checkout\Order\Aggregate\OrderTransaction\OrderTransactionEntity;
use Shopware\Core\Checkout\Order\Aggregate\OrderTransaction\OrderTransactionStateHandler;
use Shopware\Core\Checkout\Payment\Cart\AsyncPaymentTransactionStruct;
use Shopware\Core\Checkout\Payment\Cart\PaymentHandler\AsynchronousPaymentHandlerInterface;
use Shopware\Core\Checkout\Payment\Exception\CustomerCanceledAsyncPaymentException;
use Shopware\Core\Checkout\Payment\Exception\InvalidTransactionException;
use Shopware\Core\Checkout\Payment\Exception\PaymentProcessException;
use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepositoryInterface;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsFilter;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\MultiFilter;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\NotFilter;
use Shopware\Core\Framework\Routing\Annotation\RouteScope;
use Shopware\Core\Migration\Migration1602494495SetUsersAsAdmins;
use Shopware\Core\System\SalesChannel\SalesChannelContext;
use Swag\PayPal\Checkout\Payment\PayPalPaymentHandler;
use Swag\PayPal\SwagPayPal;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\RouterInterface;

class PlusPaymentFinalizeController extends AbstractController
{
    /**
     * @var EntityRepositoryInterface
     */
    private $orderTransactionRepo;

    /**
     * @var AsynchronousPaymentHandlerInterface
     */
    private $paymentHandler;

    /**
     * @var OrderTransactionStateHandler
     */
    private $transactionStateHandler;

    /**
     * @var RouterInterface
     */
    private $router;

    /**
     * @var LoggerInterface
     */
    private $logger;

    public function __construct(
        EntityRepositoryInterface $orderTransactionRepo,
        AsynchronousPaymentHandlerInterface $paymentHandler,
        OrderTransactionStateHandler $transactionStateHandler,
        RouterInterface $router,
        LoggerInterface $logger
    ) {
        $this->orderTransactionRepo = $orderTransactionRepo;
        $this->paymentHandler = $paymentHandler;
        $this->transactionStateHandler = $transactionStateHandler;
        $this->router = $router;
        $this->logger = $logger;
    }

    /**
     * @RouteScope(scopes={"storefront"})
     * @Route(
     *     "/paypal/plus/payment/finalize-transaction",
     *     name="payment.paypal.plus.finalize.transaction",
     *     methods={"GET"},
     *     defaults={"auth_required"=false}
     * )
     *
     * @throws InvalidTransactionException
     * @throws CustomerCanceledAsyncPaymentException
     */
    public function finalizeTransaction(Request $request, SalesChannelContext $salesChannelContext): RedirectResponse
    {
        $token = $request->query->get('token');

        $criteria = new Criteria();
        $criteria->addAssociation('order');
        $criteria->addFilter(
            new MultiFilter(
                MultiFilter::CONNECTION_AND,
                [
                    new EqualsFilter(
                        \sprintf('customFields.%s', SwagPayPal::ORDER_TRANSACTION_CUSTOM_FIELDS_PAYPAL_TOKEN),
                        $token
                    ),
                    new NotFilter(
                        NotFilter::CONNECTION_AND,
                        [
                            new EqualsFilter(
                                \sprintf('customFields.%s', SwagPayPal::ORDER_TRANSACTION_CUSTOM_FIELDS_PAYPAL_TOKEN),
                                null
                            ),
                        ]
                    ),
                ]
            )
        );

        $context = $salesChannelContext->getContext();
        /** @var OrderTransactionEntity|null $orderTransaction */
        $orderTransaction = $this->orderTransactionRepo->search($criteria, $context)->getEntities()->first();

        if ($orderTransaction === null) {
            throw new InvalidTransactionException('');
        }
        $order = $orderTransaction->getOrder();

        if ($order === null) {
            throw new InvalidTransactionException($orderTransaction->getId());
        }

        $paymentTransactionStruct = new AsyncPaymentTransactionStruct($orderTransaction, $order, '');

        $orderId = $order->getId();
        $changedPayment = $request->query->getBoolean('changedPayment');
        $finishUrl = $this->router->generate('frontend.checkout.finish.page', [
            'orderId' => $orderId,
            PayPalPaymentHandler::PAYPAL_PLUS_CHECKOUT_ID => true,
            'changedPayment' => $changedPayment,
        ]);

        try {
            $this->paymentHandler->finalize($paymentTransactionStruct, $request, $salesChannelContext);
        } catch (PaymentProcessException $paymentProcessException) {
            if ($this->isAtLeastShopware6330()) {
                $finishUrl = $this->redirectToConfirmPageWorkflow(
                    $paymentProcessException,
                    $context,
                    $orderId
                );
            } else {
                $finishUrl = $this->redirectToFinishPageWorkflow(
                    $paymentProcessException,
                    $context,
                    $orderId,
                    $changedPayment
                );
            }
        }

        return new RedirectResponse($finishUrl);
    }

    private function redirectToConfirmPageWorkflow(
        PaymentProcessException $paymentProcessException,
        Context $context,
        string $orderId
    ): string {
        $errorUrl = $this->router->generate('frontend.account.edit-order.page', ['orderId' => $orderId]);

        if ($paymentProcessException instanceof CustomerCanceledAsyncPaymentException) {
            $this->transactionStateHandler->cancel(
                $paymentProcessException->getOrderTransactionId(),
                $context
            );
            $urlQuery = \parse_url($errorUrl, PHP_URL_QUERY) ? '&' : '?';

            return \sprintf('%s%serror-code=%s', $errorUrl, $urlQuery, $paymentProcessException->getErrorCode());
        }

        $transactionId = $paymentProcessException->getOrderTransactionId();
        $this->logger->error(
            'An error occurred during finalizing async payment',
            ['orderTransactionId' => $transactionId, 'exceptionMessage' => $paymentProcessException->getMessage()]
        );
        $this->transactionStateHandler->fail(
            $transactionId,
            $context
        );
        $urlQuery = \parse_url($errorUrl, PHP_URL_QUERY) ? '&' : '?';

        return \sprintf('%s%serror-code=%s', $errorUrl, $urlQuery, $paymentProcessException->getErrorCode());
    }

    private function redirectToFinishPageWorkflow(
        PaymentProcessException $paymentProcessException,
        Context $context,
        string $orderId,
        bool $changedPayment
    ): string {
        $this->transactionStateHandler->fail(
            $paymentProcessException->getOrderTransactionId(),
            $context
        );

        return $this->router->generate('frontend.checkout.finish.page', [
            'orderId' => $orderId,
            PayPalPaymentHandler::PAYPAL_PLUS_CHECKOUT_ID => true,
            'changedPayment' => $changedPayment,
            'paymentFailed' => true,
        ]);
    }

    private function isAtLeastShopware6330(): bool
    {
        return \class_exists(Migration1602494495SetUsersAsAdmins::class);
    }
}
