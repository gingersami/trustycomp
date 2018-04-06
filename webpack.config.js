const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');
const path = require('path');
const loaderUtils = require('loader-utils');
const spreadPlugin = require('@babel/plugin-proposal-object-rest-spread');

const extractPlugin = new ExtractTextPlugin({
  publicPath: './dist/',
  filename: './[name].css',
  allChunks: true,
});

const spritesFilename = loaderUtils.interpolateName({resourcePath: 'images/sprites.png'}, 'images/generated/sprites-[hash].png',
  {
    context: 'images/sprites.png',
    content: null,
    regExp: null,
  },
);

module.exports = {
  entry: ['./src/js/app.js', './src/styles/app.scss'],
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: extractPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        }),
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [spreadPlugin],
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            },
          },
        ],
      },
      {
        test: /\.(woff2?|ttf|otf|eot|svg)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
        },
      },
      {
        test: /\.styl$/,
        loader: 'style-loader!css-loader!stylus-loader',
      },
      {
        test: /\.jade$/,
        loader: 'jade-loader',
      },
    ],
  },
  resolve: {
    modules: ['node_modules', 'spritesmith-generated'],
  },
  plugins: [
    extractPlugin,
    new HtmlWebpackPlugin({
      template: 'src/templates/index.html',
      filename: './index.html',
    }),
    new WriteFilePlugin({
      test: /\.css$/,
    }),
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, 'src/images/sprites/icons'),
        glob: '*.png',
      },
      target: {
        image: path.resolve(__dirname, 'src/' + spritesFilename),
        css: path.resolve(__dirname, 'src/styles/sprites.scss'),
      },
      apiOptions: {
        cssImageRef: '../' + spritesFilename,
      },
    }),
  ],
};
