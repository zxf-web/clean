const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false
})
// module.exports = {
//   // 配置跨域代理
//   devServer: {
//       proxy: {
//           '/api': {
//               target: 'http://localhost:8080/api',    // 你自己的api接口地址
//               changeOrigin: true,
//               ws: true,
//               pathRewrite: {
//                   '^/api': '',  
//               }
//           }
//       }
//   }
// };

