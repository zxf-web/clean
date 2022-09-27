<template>
    <div id="notice">
        <p class="p_title" :class="{lightSpeed_In:Notice}"><span>会员须知</span>&nbsp;&nbsp;NOTICE TO MEMBER</p>
        <div>
            <p :class="{bounce_InUp:Notice}">1.达到升级条件的会员，系统会自动升级。</p>
            <p :class="{bounce_InUp:Notice}">2.会员级别查询：登录---点击个人中心---查看会员等级。</p>
            <p :class="{bounce_InUp:Notice}">3.累计交易金额已成功交易金额为准，不包含退款金额，同一个ID交易记录有效，不同ID交易记录不可累加。</p>
            <p :class="{bounce_InUp:Notice}">4.如果发现自己的会员级别有误，请联系相关人员核实。</p>
        </div>
    </div>
</template>

<script>
    export default {
        name:'NoticeComponent',
        data(){
			return{
				Notice:false
			}	
		},
		mounted(){
			window.addEventListener('scroll',this.handleScroll,true);
		},
		methods:{
			handleScroll(){

				var scrollTop=document.body.scrollTop||window.pageYOffset||document.documentElement.scrollTop;
                console.log(scrollTop);
				this.Notice=scrollTop>900?true:false;
			}
		}
    }
</script>

<style>
    #notice{
        width:80%;
        margin:100px auto;
    }
    div#notice>div{
        background-color:#E1D9C4;
        text-align:left;
        padding:10px 10px 5px;
        color:white;
    }
    div#notice div>p{
        padding:5px;
    }
</style>