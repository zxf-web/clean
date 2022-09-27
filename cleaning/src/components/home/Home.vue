<template>
    <!-- 顶部导航条 -->
    <TopNav></TopNav>
    <!-- 轮播图 -->
    <Carousel></Carousel>    
    <main>
        <!-- 关于我们 -->
        <section>
            <About></About>
        </section>
        <!-- 洗护项目组件 -->
        <section>
            <Items></Items>
        </section>
        <!-- 线下门店组件 -->
        <section>
            <Offline></Offline>
        </section>
        <!-- 流程介绍组件 -->
        <section>
            <Process></Process>
        </section>
        <!-- 案例展示组件 -->
        <section>
            <Case></Case>
        </section>
        <!-- 平台服务保障 -->
        <section style="width:70%;margin:0 auto;display:flex;justify-content:space-around;">
            <div style="width:15%;"><img style="width:60px;height:60px;" src="../../../public/image/home/icon1.png"><p>品质保障</p></div>
            <div style="width:15%;"><img style="width:60px;height:60px;" src="../../../public/image/home/icon2.png"><p>同城直送</p></div>
            <div style="width:15%;"><img style="width:60px;height:60px;" src="../../../public/image/home/icon3.png"><p>全国连锁</p></div>
            <div style="width:15%;"><img style="width:60px;height:60px;" src="../../../public/image/home/icon4.png"><p>专属特权</p></div>
        </section>
    </main>
    <footer>
    
    </footer>
</template>

<script>
//导入顶部导航条组件
import TopNav from '../TopNav.vue'
//导入轮播图组件
import Carousel from './Carousel.vue'
//导入关于我们组件
import About from './About.vue'
//导入洗护项目组件
import Items from './Items.vue'
//导入线下门店组件
import Offline from './Offline.vue'
//导入流程介绍组件
import Process from './Process.vue'
//导入案例展示组件
import Case from './Case.vue'

    export default {
        name:'HomePage',
        components:{
            TopNav:TopNav,
            Carousel:Carousel,
            About,
            Items,
            Offline,
            Process,
            Case
        }
    }
</script>

<style scoped>
    section{
        margin:50px auto;
    }
    
</style>