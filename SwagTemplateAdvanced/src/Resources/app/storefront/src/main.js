import Rumble from './script/rumble';
import QuantityFieldPlugin from './script/quantity-field.plugin';
import StickyHeader from './script/sticky-header';


window.PluginManager.override('AddToCart', Rumble, '[data-add-to-cart]');
window.PluginManager.register('QuantityField', QuantityFieldPlugin, '[data-quantity-field]');
window.PluginManager.register('StickyHeader', StickyHeader, '[data-sticky-header]', {
    showOnScrollPosition: 2000
});
