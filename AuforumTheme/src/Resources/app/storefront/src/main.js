import MyNewCookiePermission from './plugin/my-new-cookie-permission/my-new-cookie-permission.plugin';
import MyCookiePermission from '../../../../../../RueppelTheme/src/Resources/app/storefront/src/plugin/my-cookie-permission/my-cookie-permission.plugin';

const PluginManager = window.PluginManager;
PluginManager.register('MyCookiePermission', MyCookiePermission, '[data-cookie-permission]')
PluginManager.override('MyCookiePermission', MyNewCookiePermission, '[data-cookie-permission]');

if (module.hot) {
    module.hot.accept();
}
