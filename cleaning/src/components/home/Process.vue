<template>
    <div id="process">
        <h2 :class="{roll_In:Process}">清洗流程</h2>
        <div :class="{flip_InX:Process}">
            <div v-for="item in processList" :key="item">
                <div>
                    <img :src="require(`../../../public/image/home/${item.processSrc}`)" style="width:50%;height:50%;margin:auto;">
                </div>
                <p>{{item.processTitle}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'ProcessComponent',
        data(){
            return{
                Process:false,
                processList:[
                    {processSrc:'computer.png',processTitle:'线上下单'},
                    {processSrc:'pick.png',processTitle:'上门取件'},
                    {processSrc:'check.png',processTitle:'检查衣物'},
                    {processSrc:'wash.png',processTitle:'清洁洗涤'},
                    {processSrc:'packing.png',processTitle:'包装送回'},
                ]
            }
        },
        mounted(){
            window.addEventListener('scroll',this.handleScroll,true);
        },
        methods:{
            handleScroll(){
                var scrollTop=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
                this.Process=scrollTop>2300&&scrollTop<2700?true:false;
            }
        }
    }
</script>

<style>
    #process{
        width:80%;
        margin:100px auto;
    }
    div#process>h2{
        height:80px;
        width:150px;
        margin:50px auto 5px;
        border-bottom:1px solid #eee;
        padding:20px 0;
        font-weight:bold;
    }
    div#process>div{
        width:100%;
        display:flex;
        justify-content:space-around;
        flex-wrap:wrap;
        margin-top:30px;
    }
    div#process>div div>div{
        width:200px;
        height:200px;
        border-radius:50%;
        overflow:hidden;
        display:flex;
    }
</style>