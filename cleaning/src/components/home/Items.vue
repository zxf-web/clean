<template>
    <div id="items">
        <h2 :class="{bounce_In:Items}">洗护项目</h2>
        
        <div :class="{bounce_InUp:Items}" class="view">
            <router-link to="/service">LET'S KNOW MORE</router-link>
        </div>
        
        <div class="row">
            <div class="col-lg-4 other">
				<div style="width:65%;margin:0 auto;height: 150px;padding:20px;">
					<h3>品牌护理</h3>
					<p>单肩包、爱马仕、古驰、LV、啄木鸟、手拿包、双肩包</p>
				</div>
				<div style="width:65%;margin:0 auto;height: 150px;padding:20px;">
					<h3>家纺洗护</h3>
					<p>窗帘、床单、被套、枕套、枕芯、被芯、床垫</p>
				</div>
            </div>
            <div class="col-lg-4 col-md-6 clothes">
                <div :class="{bounce_InLeft:Items}">
                    <img style="width:100%;height:100%;" src="../../../public/image/home/item1.jpg">
                </div>
                <div :class="{bounce_InRight:Items}">
                    <h3>衣物洗护</h3>
                    <p>西装、衬衫、卫衣、T恤、羊毛衫、工装裤、直筒裤、紧身裤、外套、风衣、羽绒服、裙类、连衣裙、披肩/围巾、大衣、棉衣、休闲上衣、短袖</p>
                </div>
            </div>
            <div class="col-lg-4 col-md-6 shoes">
                <div :class="{bounce_InUp:Items}">
                    <h3>鞋靴洗护</h3>
                    <p>休闲运动鞋、光面短靴、绒毛短靴、光面长靴、绒毛长靴、中靴、皮鞋、高跟鞋、篮球鞋、登山鞋、跑步鞋、帆布鞋</p>
                </div>
                <div :class="{bounce_InLeft:Items}">
                    <img style="width:100%;height:100%;" src="../../../public/image/home/case1.jpg">
                </div>                
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'ItemsComponent',
        data(){
            return{
                Items:false
            }
        },
        mounted(){
            window.addEventListener('scroll',this.handleScroll,true);
        },
        methods:{
            handleScroll(){
                var scrollTop=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
                this.Items=scrollTop>900&&scrollTop<1700?true:false;
            }
            
        }
    }
</script>

<style>
    #items{
        width:80%;
        margin:100px auto;
        padding:0;
    }
    div#items>h2{
        height:80px;
        width:150px;
        margin:50px auto 5px;
        border-bottom:1px solid #eee;
        padding:20px 0;
        font-weight:bold;
    } 
    div#items>div.view{
        width:250px;
        height:50px;
        background-color:#FBB034;
        font-size:20px;
        border-radius: 50px;
        text-align:center;
        padding:10px;
        color:white;
        font-weight:bolder;
        cursor:pointer;
        margin:20px auto;
    }
    div#items>div.view:hover{
        background-color:black;
    }
    div#items .row{
        margin-top:30px;
    }

    div#items .row>div:first-child,div#items .row>div{
        padding:0;   
    }
    div#items .row>div:first-child>div{
        width:100%;
        height:220px;
        background-repeat:no-repeat;
        background-size:100% 100%;
    }
	div#items .other{
		background-image: url('../../../public/image/home/grid1.jpg');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		font-weight: bold;
		color:#aaa;
	}
	div#items .other>div{
		border-radius:15px;
		background-color: white;
	}
    div#items .clothes>div:first-child,div#items .shoes>div:last-child{
        width:100%;
        height:65%;
    }
    div#items .clothes>div:last-child,div#items .shoes>div:first-child{
        width:100%;
        height:35%;
        padding:20px;
    }

    div#items .clothes h3,div#items .shoes h3{
        color:#aaa;
    }
    div#items .clothes p,div#items .shoes p{
        color:#bbb;
    }
</style>