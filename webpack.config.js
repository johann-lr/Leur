const path = require("path");

module.exports = {
    entry: "./src/app.ts",
    output: {
        filename: "build.js",
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                use: {
                    loader: "ts-loader"
                },
                exclude: /node_modules/
            }
        ]
    }
}
