import TestThemePlugin from './test-theme.plugin';

const PluginManager = window.PluginManager;
PluginManager.register('TestThemePlugin', TestThemePlugin, '[data-test-theme-plugin]')

alert(1);
