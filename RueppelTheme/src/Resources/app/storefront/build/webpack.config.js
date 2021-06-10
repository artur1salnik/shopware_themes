const {join, resolve} = require('path');

module.exports = () => {
    return {
        resolve: {
            alias: {
                '@fabric': resolve(
                    join(__dirname, '..', 'node_modules', 'fabric')
                )
            }
        }
    }
}
