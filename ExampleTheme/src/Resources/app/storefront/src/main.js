import ExampleTheme from './example-theme/example-theme.plugin';

const PluginManager = window.PluginManager;
PluginManager.register('ExampleTheme', ExampleTheme, '[data-example-theme]');
