import AddToCartPlugin from 'src/plugin/add-to-cart/add-to-cart.plugin';
import DomAccess from 'src/helper/dom-access.helper';
import HttpClient from 'src/service/http-client.service';

export default class ChangeButtonIcon extends AddToCartPlugin {
    init() {
        this.PluginManager = window.PluginManager;
        this._cartEl = DomAccess.querySelector(document, '.header-cart');
        this._iconEls = DomAccess.querySelectorAll(document, '.btn-buy-icon');
        this._formEls = DomAccess.querySelectorAll(document, '.buy-widget');
        this._btnEls = DomAccess.querySelectorAll(document, '.btn-buy');
        this._client = new HttpClient(window.accessKey, window.contextToken);
        super.init();
    }

    _openOffCanvasCart(instance, requestUrl, formData) {
        this._client.post(requestUrl, formData, this._afterAddItemToCart.bind(this));
    }

    _afterAddItemToCart() {
        this._refreshCartValue();
    }

    _refreshCartValue() {
        const cartWidgetEl = DomAccess.querySelector(this._cartEl, '[data-cart-widget]');
        const cartWidgetInstance = this.PluginManager.getPluginInstanceFromElement(cartWidgetEl, 'CartWidget');
        cartWidgetInstance.fetch();
    }

    _changeIcon() {
        for (let i = 0; i < this._btnEls.length; i++) {
            this._btnEls[i].addEventListener('click', (e) => {
                e.target.children[0].classList.add('hidden');
                e.target.children[1].classList.remove('hidden');
            })
        }
    }

    _registerEvents() {
        this.el.addEventListener('submit', this._formSubmit.bind(this));
        this.el.addEventListener('submit', this._changeIcon());
    }
}
