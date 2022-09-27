<template>
    <div id="growth">
        <p :class="{lightSpeed_In:Level}" class="p_title"><span>会员成长体系</span>&nbsp;&nbsp;GROWTH SYSTEM</p>
        <div>
            <div v-for="item in level" :key="item" :class="{bounce_In:Level}">
                <div class="member_level">
					<img align="left" :src="require(`../../../public/image/member/${item.levelSrc}`)" style="height: 20px;width: 20px;"/>
					<span>{{item.levelName}}</span>
				</div>
                <div class="member_level_color" :style="{'background-color':item.bg1}">
                    <div :style="{'border-top':`10px solid ${item.bg1}`}"></div>
                </div>
                <div class="member_condition" :style="{'background-color':item.bg2}">{{item.level_condition}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'GrowthComponent',
		data(){
			return{
                
				level:[
					{
                        levelSrc:'commom.png',
                        levelName:'普通会员',
                        bg1:'#FFB2B8',
                        border_top:'#FFB2B8',
                        bg2:'#9CB056',
                        level_condition:'申请成为会员即可'
                    },
					{
                        levelSrc:'gold.png',
                        levelName:'黄金会员',
                        bg1:'gold',
                        border_top:'gold',
                        bg2:'#9CB056',
                        level_condition:'单笔充值166元'
                    },
					{
                        levelSrc:'platinum.png',
                        levelName:'白金会员',
                        bg1:'#C7EBE9',
                        border_top:'#C7EBE9',
                        bg2:'#9CB056',
                        level_condition:'单笔充值266元'
                    },
					{
                        levelSrc:'purple_gold.png',
                        levelName:'紫金会员',
                        bg1:'#927EC3',
                        border_top:'#927EC3',
                        bg2:'#9CB056',
                        level_condition:'单笔充值366元'
                    },
				],
				Level:false
			}	
		},
		mounted(){
			window.addEventListener('scroll',this.handleScroll,true);
		},
		methods:{
			handleScroll(){
				var scrollTop=document.body.scrollTop||window.pageYOffset||document.documentElement.scrollTop;
				this.Level=scrollTop<600?true:false;
			}
		}
    }
</script>

<style>
    #growth{
        width:80%;
        margin:100px auto;
    }
    .p_title{
        text-align:left;
    }
    .p_title>span{
        font-size:30px;
        font-weight:bolder;
    }
    div#growth>div{
        display:flex;
        margin:30px auto;
    }
    div#growth>div>div{
        width:25%;
    }

    div#growth .member_level{
        background-color:#FFFAE8;
        width:120px;
        margin:0 auto;
        padding:10px;
        border-radius:10px;
		box-shadow:1px 1px 1px 1px #dee;
    }
    div#growth .member_level_color{
        height:20px;
        margin:20px auto;
        padding-top:20px;
    }
    div#growth .member_level_color>div{
        margin:0 auto;
        width: 0;
        height: 0;
        border-left: 10px solid #F8F8F8;
        border-bottom: 10px solid #F8F8F8;
        border-right: 10px solid #F8F8F8;
    }
    div#growth .member_condition{
        width:150px;
        padding:10px;
        margin:0 auto;
        border-radius:10px;
        box-shadow:1px 1px 5px 1px #aaa;
    }
</style>