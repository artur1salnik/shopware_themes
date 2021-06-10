const {join, resolve} = require('path');

module.exports = () => {
    return {
        resolve: {
            alias: {
                '@missionlog': resolve(
                    join(__dirname, '..', 'node_modules', 'missionlog')
                )
            }
        }
    }
}
