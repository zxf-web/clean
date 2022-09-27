<template>
    <div id="unscramble">
        <p class="p_title" :class="{lightSpeed_In:Unscramble}"><span>会员解读</span>&nbsp;&nbsp;MEMBER INTERPRETATION</p>
        <div>
            <div class="member_introduce" v-for="item in introduce" :key="item">
                <div :class="{bounce_InRight:Unscramble}">{{item.introduce_title}}</div>
                <div :class="{bounce_In:Unscramble}">{{item.introduce_content}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'UnscrambleComponent',
        data(){
			return{
                introduce:[
                    {
                        introduce_title:'累计消费金额',
                        introduce_content:'会员累计金额为确认收货后交易成功订单的实付金额'
                    },
                    {
                        introduce_title:'关于升级制度',
                        introduce_content:'累计交易金额仅限同一个会员ID，不同ID不可累计，转存等，累计额度达到指定会员级别要求，会自动升级'
                    },
                    {
                        introduce_title:'关于会员折扣',
                        introduce_content:'店铺商品可使用会员折扣，会员登录后可进入“我是会员”页面查看'
                    },
                    {
                        introduce_title:'会员级别查询',
                        introduce_content:'登录---点击个人中心---查看会员等级'
                    }
                ],
				Unscramble:false
			}	
		},
		mounted(){
			window.addEventListener('scroll',this.handleScroll,true);
		},
		methods:{
			handleScroll(){
				var scrollTop=document.body.scrollTop||window.pageYOffset||document.documentElement.scrollTop;
				this.Unscramble=scrollTop>500?true:false;
			}
		}
    }
</script>

<style>
    #unscramble{
        width:80%;margin:100px auto;
    }
    div#unscramble .member_introduce{
        display:flex;
        margin:20px;
    }
    div#unscramble .member_introduce>div:first-child{
        width:150px;
        background-color:#8F735E;
        padding:8px;
        border-bottom-left-radius:50px;
        border-top-right-radius:60px;
        color:white;
    }
    div#unscramble .member_introduce>div:last-child{
        border-bottom:1px solid #8F735E;
        padding-left:50px;
        width:100%;
        text-align:left;
    }
</style>