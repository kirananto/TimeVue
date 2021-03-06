const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV;

const setPath = function(folderName) {
  return path.join(__dirname, folderName);
}

const buildingForLocal = () => {
  return (NODE_ENV === 'development');
};

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const setPublicPath = () => {
  let env = NODE_ENV;
  if (env === 'production') {
    return 'https://your-directory/production/';
  } else if (env === 'staging') {
    return 'https://your-directory/staging/';
  } else {
    return '/';
  }
};

// Not extracting CSS because its not compatible yet.
// https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/701
// Should be working soon.
const extractCSS = new ExtractTextPlugin({
  filename: "css/styles.[hash].css",//"[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development"
});

const CopyWebPack = new CopyWebpackPlugin([
  {
    from: path.resolve(__dirname, './static'),
    to: path.resolve(__dirname, './dist/static'),
    ignore: ['.*']
  },
  // Copy redirects file
  {
    from: path.resolve(__dirname, './_redirects'),
    to: path.resolve(__dirname, './dist/'),
    ignore: ['.*']
  }
])
const extractHTML = new HtmlWebpackPlugin({
  title: 'History Search',
  filename: 'index.html',
  inject: true,
  template: 'index.html',
  environment: process.env.NODE_ENV,
  isLocalBuild: buildingForLocal(),
  imgPath: (!buildingForLocal()) ? 'assets' : 'src/assets'
});


const config = {
  /**
   * You can use these too for bigger projects. For now it is 0 conf mode for me!
   */
  entry: {
    build: path.join(setPath('src'), 'index.js')
  },
  output: {
    path: buildingForLocal() ? path.resolve(__dirname) : setPath('dist'), //this one sets the path to serve
    publicPath: setPublicPath(),
    filename: buildingForLocal() ? 'js/[name].js' : 'js/[name][hash].js'
  },
  
  optimization:{
    runtimeChunk: true,
    splitChunks: {
      chunks: "all", //Taken from https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693
    }
  },
  resolveLoader: {
    modules: [setPath('node_modules')]
  },
  mode: buildingForLocal() ? 'development' : 'production',
  devServer: {
    historyApiFallback: true,
    noInfo: false
  },
  plugins: [
    extractHTML,
    CopyWebPack,
    // extractCSS,
    new webpack.DefinePlugin({
      'process.env': {
        isStaging: (NODE_ENV === 'development' || NODE_ENV === 'staging'),
        NODE_ENV: '"'+NODE_ENV+'"'
      }
    })
  ], 
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  }, 
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: "pre",
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          // postcss: [require('postcss-cssnext')()],
          // options: {
          //     extractCSS: true
          // },
          loaders: {
            js: 'babel-loader'
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: "babel-loader",
          options: { presets: ['env'] }
        },
        {
          loader: "babel-loader",
          options: { presets: ['env'] }
        }]
      },
      {
        test: /\.css$/,
        use: extractCSS.extract({
          fallback: "style-loader",
          use: ["css-loader", "autoprefixer-loader"]
        })
      },
      {
        test: /\.scss$/,
        use: !buildingForLocal() ?
             extractCSS.extract({
               fallback: "style-loader",
               use: ['css-loader', 'autoprefixer-loader', 'sass-loader']
            }) :
            [{
                loader: "style-loader" // creates style nodes from JS strings
              }, {
                loader: "css-loader" // translates CSS into CommonJS
              }, {
                loader: "sass-loader" // compiles Sass to CSS
              }]
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]?[hash]',
          useRelativePath: buildingForLocal()
        }
      }    
    ]
  },
};
module.exports = config; 