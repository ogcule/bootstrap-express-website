const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: __dirname + '/src/index.js',
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
    use: ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: [{
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
})
}
]
},
devServer: {
  contentBase: path.join(__dirname, "dist"),
  compress: true,
  hot: true
},
plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default'],
        "Tether": 'tether'
      }),
      new ExtractTextPlugin("styles.css"),
      new HtmlWebpackPlugin({
        template: 'src/index.html'
     }),
     new webpack.HotModuleReplacementPlugin()
   ],
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname,'dist')
   }
}
