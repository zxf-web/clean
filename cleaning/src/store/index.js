//1.导入vuex需要用到的方法
import {createStore} from "vuex"
//2.创建store实例，并导出
export default createStore({
    state:{
        //查询也得当前页码
        currentPage:1
    },
    //同步更新store状态的函数
    mutations:{},
    //用于计算状态存储的数据
    getters:{},
    //异步操作store的函数
    actions:{}
})