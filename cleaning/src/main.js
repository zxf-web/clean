import { createApp } from 'vue'
import App from './App.vue'

// import axios from 'axios'
//导入bootstrap
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
//导入element-plus的js文件
import ElementPlus from 'element-plus'
//导入element-plus的css文件
import 'element-plus/dist/index.css'
//导入路由文件
import router from './router/index.js'

//导入状态管理
import store from './store/index'

createApp(App).use(ElementPlus).use(router).use(store).mount('#app');