import Plugin from 'src/plugin-system/plugin.class.js';
import AOS from '@aos';
import '@aos/dist/aos.css';


export default class AosPlugin extends Plugin {
    init() {
        AOS.init();
    }
}
