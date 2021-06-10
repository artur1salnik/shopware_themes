const {join, resolve} = require('path');

module.exports = () => {
    return {
        resolve: {
            alias: {
                '@animejs': resolve(
                    join(__dirname, '..', 'node_modules', 'animejs')
                ),
                '@aos': resolve(
                    join(__dirname, '..', 'node_modules', 'aos')
                )
            }
        },
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
                },
            ],
        },
    }
}
