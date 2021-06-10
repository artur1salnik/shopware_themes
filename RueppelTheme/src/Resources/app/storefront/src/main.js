import FubricPlugin from './plugin/fabric/fabric.plugin';
import MyCookiePermission from './plugin/my-cookie-permission/my-cookie-permission.plugin';

const PluginManager = window.PluginManager;
PluginManager.register('FabricPlugin', FubricPlugin, '[data-fabric-plugin]');
PluginManager.override('CookiePermission', MyCookiePermission, '[data-cookie-permission]');
