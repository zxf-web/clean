<template>
    <div id="nav" class="navbar navbar-expand-md">
        <!-- 商标部分，不管是展开还是收回都会显示的一部分 -->
        <div id="logo" class="col-3">
            <router-link to="/home" class="nav-link">
                <img src="../../public/image/logo/logo.png"/>
            </router-link>
        </div>
        <!-- 汉堡导航部分，缩小的时候才会出现 -->
        <button data-toggle="collapse" data-target="#bar1" class="navbar-toggler">
            <span class="navbar-toggler-icon"></span>
        </button>
        <!-- 导航部分 -->
        <div id="bar1" class="collapse navbar-collapse ">
            <ul class="navbar-nav">
                <li v-for="(item) in lis" :key="item" class="nav-item">
                    <router-link :to="item.pageAddress" class="nav-link">{{item.pageName}}</router-link>
                </li>
            </ul>
        </div>
        <!-- 登录/注册部分 -->
        <div id="logo" class="col-2">
            <router-link to="/login" class="nav-link" v-if="!username">登录/注册</router-link>
            <router-link to="/person" class="nav-link" v-else>欢迎你，{{username}}</router-link>
        </div>
    </div>

</template>
<script>

    export default {
        name:'TopNavComponent',
        data(){
            return{
                flag:true,
                username:'',
                navActive:[true],
                lis:[
                    {pageName:'家',pageAddress:'/home'},
                    {pageName:'清洗项目',pageAddress:'/service/information'},
                    {pageName:'清洗列表',pageAddress:'/list'},
                    {pageName:'我的订单',pageAddress:'/order'},
                    {pageName:'我是会员',pageAddress:'/member'},
                    {pageName:'我是商家',pageAddress:'/adminLogin'},
                    {pageName:'个人中心',pageAddress:'/person'}
                ]
            }
        },
        mounted(){
            this.username=sessionStorage.user_name;
            
        }
        

    }
</script>

<style>
    #nav{
       background-color:white;
       font-weight:bolder;
       color:black;
       position:fixed;
       top:0;
       left:0;
       width:100%;
       z-index:100;
       padding:0;
    }
    div#nav div#bar1 ul li{
        padding:10px 0;
    }
</style>
