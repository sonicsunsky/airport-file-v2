"use strict";
const path = require("path");
const defaultSettings = require("./src/settings.js");

const dayjs = require("dayjs");
const time = dayjs().format("YYYY-M-D HH:mm:ss");
process.env.VUE_APP_UPDATE_TIME = time;

function resolve(dir) {
  return path.join(__dirname, dir);
}

const name = defaultSettings.title;

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
const port = process.env.port || process.env.npm_config_port || 9527; // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath:
    process.env.NODE_ENV === "production" ? "/airport-file-cli/" : "/",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: true,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
    // before: require('./mock/mock-server.js')
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        "@": resolve("src")
      }
    }
  },
  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin("preload").tap(() => [
      {
        rel: "preload",
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: "initial"
      }
    ]);

    config.plugins.delete("prefetch"); // TODO: need test

    // set svg-sprite-loader
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();

    config.when(process.env.NODE_ENV !== "development", config => {
      config
        .plugin("ScriptExtHtmlWebpackPlugin")
        .after("html")
        .use("script-ext-html-webpack-plugin", [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }
        ])
        .end();
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial" // only package third parties that are initially dependent
          },
          elementUI: {
            name: "chunk-elementUI", // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      });

      // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
      config.optimization.runtimeChunk("single");
    });
  },
  css: {
    requireModuleExtension: true,
    sourceMap: true,
    loaderOptions: {
      // postcss: {
      //   plugins: [
      //     require("postcss-plugin-px2rem")({
      //       rootValue: 100, //换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
      //       unitPrecision: 5, //允许REM单位增长到的十进制数字。
      //       //propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
      //       // propBlackList: [], //黑名单
      //       // exclude: /(node_modules)/, //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
      //       // selectorBlackList: [], //要忽略并保留为px的选择器
      //       // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
      //       // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
      //       mediaQuery: false, //（布尔值）允许在媒体查询中转换px。
      //       minPixeclValue: 3 //设置要替换的最小像素值(3px会被转rem)。 默认 0
      //     })
      //     // 设计稿宽度的1/10，一般为75
      //     // require("postcss-px2rem")({ remUnit: 75 })
      //   ]
      // },
      scss: {
        /*sass-loader 8.0语法 */
        prependData: '@import "~@/styles/variables.scss";'
        /*sass-loader 9.0写法，感谢github用户 shaonialife*/
        // additionalData(content, loaderContext) {
        //   const { resourcePath, rootContext } = loaderContext;
        //   const relativePath = path.relative(rootContext, resourcePath);
        //   if (
        //     relativePath.replace(/\\/g, "/") !== "src/styles/variables.scss"
        //   ) {
        //     return '@import "~@/styles/variables.scss";' + content;
        //   }
        //   return content;
        // }
      }
    }
  }
};
