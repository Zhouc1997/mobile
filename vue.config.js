'use strict'
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
const name = '宁可赚'// page title
const devServer = {
  port: 9528,
  open: true,
  overlay: {
    warnings: false,
    errors: true
  },
  // before: require('./mock/mock-server.js') // 对接接口时关闭mock 并配置下面代理
  proxy: {
    '/test': {
      // target: 'https://nkzapi.nnho.cn/api', // 测试
      target: 'https://csg.cnnho.com/ningkezhuan-api/api', // 测试
      // target: 'https://test-timemarket.cnnho-vu.cn:8049/api', // 测试
      changeOrigin: true,
      pathRewrite: {
        '/test': ''// 重写接口，去掉/test
      }
      // ws: true,
    }
  }
}
module.exports = {
  // outputDir: 'dist/' + process.env.VUE_APP_DIST,
  outputDir: 'dist/',
  publicPath: '/',
  devServer,
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = name
        return args
      })
  },
  // 修改vant默认样式
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            'toast-default-width': '200px'
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            // hack: `true; @import "your-less-file-path.less";`,
          }
        }
      }
    }
  }

}
