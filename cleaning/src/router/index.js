//导入路由组件模块
import { createRouter,createWebHistory } from "vue-router"
//导入组件模块
import Reload from '../components/Reload'//刷新组件
import TopNav from '../components/TopNav.vue'//顶部导航条组件
const Change=()=>import('../components/Change.vue')//修改信息组件
import Page from '../components/Page.vue'//分页组件
//用户首页面
import Home from '../components/home/Home.vue'
import Carousel from '../components/home/Carousel.vue'//轮播图组件
import About from '../components/home/About.vue'//关于我们组件
import Items from '../components/home/Items.vue'//洗护项目组件
import Offline from '../components/home/Offline.vue'//线下门店组件
import Process from '../components/home/Process.vue'//流程介绍组件
import Case from '../components/home/Case.vue'//案例展示组件
//清洗项目页面
import Service from '../components/things/Service.vue'
//使用懒加载
const Information = ()=>import('../components/things/Information') //填写订单信息组件
const Generate = ()=>import('../components/things/Generate');//生成订单组件
const OnlinePay = ()=>import('../components/things/OnlinePay') //在线支付组件
//清洗列表页面
import List from '../components/list/List.vue'
//订单页面
import Order from '../components/order/Order.vue'
//会员页面
import Member from '../components/member/Member.vue'
import Growth from '../components/member/Growth.vue'//会员成长体系组件
import Privileges from '../components/member/Privileges.vue'//会员特权组件
import Unscramble from '../components/member/Unscramble.vue'//会员解读组件
import Notice from '../components/member/Notice.vue'//会员须知组件
//个人中心页面
import Person from '../components/person/Person.vue'
//使用懒加载
const Info =()=>import('../components/person/Info')//个人信息组件
const Address=()=>import('../components/person/Address.vue')//我的地址组件
//登录/注册页
import Login from '../components/login/Login.vue'

//管理员(商家)页面
import Adminstrator from '../components/admin/Administrator.vue'
const User=()=>import('../components/admin/User.vue')//用户管理组件
const Invioce=()=>import('../components/admin/Invoice.vue')//订单管理组件
const MemberShip=()=>import('../components/admin/MemberShip.vue')//会员管理
const thingList=()=>import('../components/admin/thing_list.vue')//清洗物品管理
const Statistic=()=>import('../components/admin/Statistic')//统计管理
import AdminstratorLogin from '../components/login/AdminLogin'//管理员登录
//创建字典
const routes=[
    {path:'/',redirect:"/home"},
    {path:'/reload',component:Reload},
    //---------------用户----------------
    //首页
    {
		path:'/home',
		component:Home,
        children:[
            {path:'topNav',component:TopNav},
            {path:'carousel',component:Carousel},
            {path:'about',component:About},
            {path:'item',component:Items},
            {path:'offline',component:Offline},
            {path:'process',component:Process},
            {path:'case',component:Case}
        ]
	},
    //清洗项目
    {
        path:'/service',
        component:Service,
        children:[
            {path:'topNav',component:TopNav},
            {path:'information',component:Information},
            {path:'generate',component:Generate},
			{path:'onlinePay',component:OnlinePay}
        ]
    },
    //清洗列表
    {
        path:'/list',component:List,
        meta:{auth:true},//添加字段判断该页面是否需要登录
        children:[
            {path:'topNav',component:TopNav}
        ]
    },
    //订单
    {
        path:'/order',component:Order,
        meta:{auth:true},//添加字段判断该页面是否需要登录
        children:[{path:'topNav',component:TopNav}]
    },
    //会员
    {
        path:'/member',component:Member,
        children:[
            {path:'topNav',component:TopNav},
            {path:'growth',component:Growth},
            {path:'privileges',component:Privileges},
            {path:'unscramble',component:Unscramble},
            {path:'notice',component:Notice}
        ]
    },
    //个人中心
    {
        path:'/person',component:Person,
        meta:{auth:true},//添加字段判断该页面是否需要登录
        children:[
            {path:'info',component:Info},
            {path:'change',component:Change},
            {path:'address',component:Address}
        ]
    },
    //登录/注册
    {path:'/login',component:Login},

    //---------------管理员----------------
    //管理员页
    {
        path:'/administrator',component:Adminstrator,
        children:[
            {path:'user',component:User},
            {path:'invoice',component:Invioce},
            {path:'memberShip',component:MemberShip},
            {path:'clean',component:thingList},
            {path:'statistic',component:Statistic},
            {path:'page',component:Page}
        ]
    },
    {
        path:'/adminLogin',component:AdminstratorLogin
    }
]
//创建路由对象，封装字典
const router=createRouter({
    routes:routes,
    history:createWebHistory()
})
//路由守卫
router.beforeEach((to,from,next)=>{
    //to要跳转到的路径
    //from从那个路径来
    //next往下执行的回调
    //在sessionStorage中获取token
    let token=sessionStorage.getItem("user_name");
    //判断页面是否需要登录
    if(to.meta.auth){
        //如果token存在直接跳转
        if(token){
            next();
        }else{
            alert("请先登录！");
        }
    }else{
        next();
    }
})

//导出路由模块
export default router;



