import Plugin from 'src/plugin-system/plugin.class';
import {log} from '@missionlog';

log.init({initializer: 'INFO'}, (level, tag, msg, params) => {
    console.log(`${level}: [${tag}] `, msg, ...params);
});

export default class MyTemplate extends Plugin {
    init() {
        console.log('init');

        log.info('initializer', 'plugin got started', this);
    }
}
