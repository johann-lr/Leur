const path = require("path");

module.exports = {
    entry: "./src/app.ts",
    mode: "development",
    output: {
        filename: "build.js",
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        modules: [__dirname, 'node_modules'],
        extensions: [".ts", ".js"],
        fallback: {
            "path": require.resolve('path-browserify')
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)?$/,
                use: {
                    loader: "ts-loader"
                },
                exclude: /node_modules/
            }
        ]
    }
}
