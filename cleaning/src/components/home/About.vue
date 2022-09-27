<template>
    <div id="about">
        <h2 :class="{bounce_In:aboutUS}">关于我们</h2>
        <div class="row">
            <div :class="{bounce_InRight:aboutUS}" class="col-lg-6 col-md-12"><img style="width:100%;height:100%;" src="../../../public/image/home/about.png"></div>
            <div :class="{bounce_InLeft:aboutUS}"  class="col-lg-5 col-md-12">
                <h3>关于我们</h3>
                <span>ABOUT US</span>
                <p>洗衣平台是指一种专门为大众提供服装洗涤服务的商业形态，洗衣服务商把自己开发的产品系统、服务系统、技术系统、品牌系统（包括商标，商号），以服务化的形式，转化成干净的能再穿的衣服，延长衣物的使用寿命，保障穿着的美观，让更多的人享受到干净的，整洁的衣服。</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'AboutComponent',
        data(){
            return{
                aboutUS:false
            }
        },
        mounted(){
            window.addEventListener('scroll',this.handleScroll,true);
        },
        methods:{
            handleScroll(){
                var scrollTop=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
                this.aboutUS=scrollTop>300&&scrollTop<1000?true:false;
            }
            
        }
    }
</script>

<style>
    div#about{
        width:80%;
        margin:0 auto;
    }  
    div#about>h2{
        height:80px;
        width:150px;
        margin:50px auto;
        border-bottom:1px solid #eee;
        padding:20px 0;
        font-weight:bold;
        
    } 
    div#about .row>div:first-child{
        padding:0;
        border-radius:20px;
        overflow:hidden;
    }
    div#about .row>div:last-child{
        padding:30px 40px;
        color:#aaa;
    }
    div#about .row>div:last-child>p{
        font-size:18px;
        color:#bbb;
        text-align:left;
        margin:50px 0;
    }
</style>