const path = require("path")
module.exports= {
    entry: "index.js",
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "build")
    },  
    devServer: {
        publicPath: "/build/",
        port: 8000
    },
    mode: process.env.NODE_ENV,
    module:{
        rules:[{
            test: /\js|jsx?/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options:{
                    presets:['@babel/preset-react','@babel/preset-env']
                }
            }
        }, {
            test: /\.css?/,
            exclude: /node_modules/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
          }
    ]
    }
}