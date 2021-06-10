import MyCookiePermission
    from '../../../../../../../../RueppelTheme/src/Resources/app/storefront/src/plugin/my-cookie-permission/my-cookie-permission.plugin';

export default class MyNewCookiePermission extends MyCookiePermission {
    init() {
        super.init();
        console.log('kdsjsaflkjdsapfoipgaishfrigfoi');
    }

    _hideCookieBar() {
        super._hideCookieBar();
    }
}
