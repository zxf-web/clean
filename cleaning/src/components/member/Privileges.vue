<template>
    <div id="privileges">
        <p class="p_title" :class="{lightSpeed_In:Privileges}"><span>会员特权</span>&nbsp;&nbsp;PRIVILEGES</p>
        <table class="table " :class="{bounce_In:Privileges}">
            <thead>
                <tr style="background:#6785FF;color:white;">
                    <th>会员级别</th>
                    <th>会员条件</th>
                    <th>会员折扣</th>
                    <th>优先接待</th>
                    <th>会员日</th>
                </tr>
            </thead>
            <tbody style="background-color:white;">
                <tr class="active" v-for="item in member_form" :key="item"> 
                    <td :class="{bounce_InDown:Privileges}">{{item.level}}</td>
                    <td :class="{bounce_InLeft:Privileges}">{{item.condition}}</td>
                    <td :class="{bounce_InUp:Privileges}">{{item.discount}}</td>
                    <td :class="{bounce_InLeft:Privileges}">{{item.priority}}</td>
                    <td :class="{bounce_InUp:Privileges}">{{item.memberDate}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name:'PribilegesComponent',
        data(){
			return{
				member_form:[
                    {
                        level:'普通会员',
                        condition:'申请成为会员即可',
                        discount:'9.8折',
                        multiple:'1.1倍',
                        priority:'是',
                        memberDate:'5月2日'
                    },
                    {
                        level:'黄金会员',
                        condition:'单笔充值166元',
                        discount:'9.5折',
                        multiple:'1.2倍',
                        priority:'是',
                        memberDate:'6月2日'
                    },
                    {
                        level:'白金会员',
                        condition:'单笔充值266元',
                        discount:'9.0折',
                        multiple:'1.5倍',
                        priority:'是',
                        memberDate:'10月2日'
                    },
                    {
                        level:'紫金会员',
                        condition:'单笔充值366元',
                        discount:'8.5折',
                        multiple:'2倍',
                        priority:'是',
                        memberDate:'12月2日'
                    }
                ],
				Privileges:false
			}	
		},
		mounted(){
			window.addEventListener('scroll',this.handleScroll,true);
		},
		methods:{
			handleScroll(){
				var scrollTop=document.body.scrollTop||window.pageYOffset||document.documentElement.scrollTop;
				this.Privileges=scrollTop>300&&scrollTop<1100?true:false;
			}
		}
    }
</script>

<style>
    #privileges{
        width:80%;
        margin:100px auto;
    }
</style>