const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname,'dist')
  },
  module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }
    },
    {
    test: /\.(scss)$/,
    use: [{
      loader: 'style-loader',
    }, {
      loader: 'css-loader',
    }, {
      loader: 'postcss-loader',
      options: {
        plugins: function () {
          return [
            require('precss'),
            require('autoprefixer')
          ];
        }
      }
    }, {
      loader: 'sass-loader'
    }
  ]
},
/*{
  test: /\.css$/,
  use: ExtractTextPlugin.extract({
  fallback: "style-loader",
  use: "css-loader"
  })
}*/
]
},
devServer: {
  contentBase: path.join(__dirname, "dist"),
  compress: true
},
plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default']
      }),
    /*  new ExtractTextPlugin("dist/styles.css"),*/
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        filename: 'index.html'
     })

    ]
}
