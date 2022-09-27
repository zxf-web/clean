<template>
    <div id="offline">
        <h2 :class="{lightSpeed_In:offLine}">线下门店</h2>
        <div class="row" :class="{bounce_InDown:offLine}">
        <!--
            <div class="col-sm-6 col-md-4 col-lg-3 m-1">
                <div class="thumbnail">
                    <img src="../../../public/image/home/small.jpg" style="width:100%;height:100%;">
                    <div class="caption">
                        <h4>小型基础店</h4>
                        <p>Small basic store</p>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-md-4 col-lg-3 m-1">
                <div class="thumbnail">
                <img src="../../../public/image/home/middle.jpg" style="width:100%;height:100%;">
                <div class="caption">
                    <h4>中型标准店</h4>
                    <p>Medium sized standard</p>
                </div>
                </div>
            </div>
            <div class="col-sm-6 col-md-4 col-lg-3 m-1">
                <div class="thumbnail">
                <img src="../../../public/image/home/large.jpg" style="width:100%;height:100%;">
                <div class="caption">
                    <h4>大型豪华店</h4>
                    <p>Large luxury store</p>
                </div>
                </div>
            </div>
            <div class="col-sm-6 col-md-4 col-lg-3 m-1">
                <div class="thumbnail">
                <img src="../../../public/image/home/flagship.jpg" style="width:100%;height:100%;">
                <div class="caption">
                    <h4>旗舰店</h4>
                    <p>Flagship store</p>
                </div>
                </div>
            </div>
        -->
            <div class="col-sm-6 col-md-4 col-lg-2" v-for="item in offShop" :key="item">
                <div class="thumbnail">
                    <img :src="require(`../../../public/image/home/${item.imgName}`)" style="width:100%;height:100%;"/>
                    <div class="caption">
                        <h4>{{item.title}}</h4>
                        <p>{{item.english}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:"OfflineComponent",
        data(){
            return{
                offLine:false,
                offShop:[
                    {imgName:'small.jpg',title:'小型基础店',english:'Small basic store'},
                    {imgName:'middle.jpg',title:'中型标准店',english:'Medium sized standard'},
                    {imgName:'large.jpg',title:'大型豪华店',english:'Large luxury store'},
                    {imgName:'flagship.jpg',title:'旗舰店',english:'Flagship store'}
                ]
            }
        },
        mounted(){
            window.addEventListener('scroll',this.handleScroll,true);
        },
        methods:{
            handleScroll(){
                var scrollTop=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
                this.offLine=scrollTop>1700&&scrollTop<2300?true:false;
            }
        }
    }
</script>

<style>
    #offline{
        margin:100px auto;
    }
    div#offline>h2{
        height:80px;
        width:150px;
        margin:50px auto 5px;
        border-bottom:1px solid #eee;
        padding:20px 0;
        font-weight:bold;
    } 
    div#offline .row{
        width:75%;
        margin:30px auto;
        display:flex;
        justify-content:space-around;
    }
    div#offline .row>div{
        box-shadow:1px 1px 5px 1px #eee;
        padding:0;
        border-radius:10px;
        overflow:hidden;
    }
</style>