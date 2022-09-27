<template>
    <div class="panel panel-default">
        <div class="panel-body" id="login" ref="loginWidth">
            <h3 style="font-weight: bold;">{{title}}</h3>
            <form>
                <div class="form-group">
					<label>用户名</label>
                    <input type="text" v-model="username" ref="usernameOnfocus" placeholder="请输入用户名">
                </div>
                <div class="form-group">
					<label>密码</label>
                    <input type="password" v-model="pwd" ref="passwordOnfocus" placeholder="6-12位的数字、字母或下划线">
                </div>
				<div class="form-group" v-show="flag">
					<label>手机号码</label>
                    <input type="text" v-model="telephone" ref="telephoneOnfocus" placeholder='11位的手机号码'>
                </div>
				<div class="form-group" v-show="flag">
					<label>邮箱地址</label>
                    <input type="email" v-model="mail" ref="emailOnfocus" placeholder='请输入你的邮箱'>
                </div>
                <button type="button" @click="login" v-show="!flag">登&nbsp;&nbsp;录</button>
				<button v-show="flag" type="button" @click="register">注&nbsp;&nbsp;册</button>
            </form>
        </div>
		
        <div id="loginImg">
            <div>
				<h3 style="margin-bottom:10px;">{{hSide}}</h3>
				<span>{{spSide}}</span>
				<p @click="jump">{{pSide}}</p>
            </div>
        </div> 
		
		
    </div>
</template>

<script>
import {debounce} from "../../router/utils.js"
import axios from 'axios'
    export default {
        name:'LoginPage',
        data(){
			return {
				//登录/注册数据
				username:'',
				pwd:'',
				telephone:'',
				mail:'',
				
				
				
				flag:false,
				title:'欢迎登录',
				/*侧边图片的属性*/
				hSide:'还未注册?',
				spSide:'立即注册,发现大量机会!',
				pSide:'去注册'
				
			}
		},
		methods:{
			//注册
			register(){
				let telephoneOnfocus=this.$refs.telephoneOnfocus;
				let emailOnfocus=this.$refs.emailOnfocus;
				let usernameOnfocus=this.$refs.usernameOnfocus;
				let passwordOnfocus=this.$refs.passwordOnfocus;
				if(!usernameOnfocus.value||!passwordOnfocus.value||!telephoneOnfocus.value||!emailOnfocus.value){
					alert("输入框不能为空");
				}else{
					let password_reg=/^[\w]{6,12}$/;
					let telephone_reg=/^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/;
					if(password_reg.test(passwordOnfocus.value)&&telephone_reg.test(telephoneOnfocus.value)){
						axios.post('http://localhost:8080/user/register',
							`username=${this.username}&password=${this.pwd}&telephone=${this.telephone}&email=${this.mail}`
						).then(res=>{
							if(res.data){
								alert("注册成功");
								this.$router.push('/home');
							}else{
								alert("注册失败");
							}
						});
					}else{
						alert("请检查你输入的格式是否正确");
					}

				}
			},

			
			//登录	
			login(){
				let usernameOnfocus=this.$refs.usernameOnfocus;
				let passwordOnfocus=this.$refs.passwordOnfocus;
				if(!usernameOnfocus.value || !passwordOnfocus){
					alert("用户名或密码不能为空");
				}else{
					let reg=/^[\w]{6,12}$/;
					if(reg.test(passwordOnfocus.value)){
						axios.post('http://localhost:8080/user/login',
							`username=${this.username}&password=${this.pwd}`
						).then(res=>{
							if(res.data[0]){
								sessionStorage.setItem("user_name",res.data[0].user_name);
								this.$router.push('/home');
							}else{
								alert("登录失败,请检查是否输入正确！");
							}
						});
					}else{
						alert("密码格式不正确");
					}
				}
			},


			//转换为登录或注册部分
			jump(){
				if(!this.flag){
					this.hSide='已有帐号?',
					this.spSide='有账号就登录吧,好久不见了!',
					this.pSide='返回登录',
					this.$refs.loginWidth.style.transform=`translate(50%)`;
					document.getElementById("loginImg").style.transform=`translate(-200%)`;
					this.flag=true;
					this.title='立即注册';
				}else{
					this.hSide='还未注册?',
					this.spSide='立即注册,发现大量机会!',
					this.pSide='去注册',
					this.$refs.loginWidth.style.transform=`translate(0%)`;
					document.getElementById("loginImg").style.transform=`translate(0%)`;
					this.flag=false;
					this.title='欢迎登录';
				}

			}
		}
    }
</script>

<style scoped>
    .panel{
		border-radius:10px;
		width:50%;
		height:470px;
		margin:100px auto;
		display:flex;
		align-items: center;
		box-shadow:1px 1px 10px 1px #bbb;
		overflow:hidden;
		background-color:white;
		
	}
	.panel-body{
		padding:20px 0;
		transition: all 0.5s ease-in;
		flex:2;
	}
	.panel-body form{
		width:60%;
		margin:0 auto;
	}
	.form-group input{
		border:none;
		border-bottom:2px solid #bbb;
		text-align:center;
		margin-bottom:5px;
		height: 20px;
		width:100%;
	}
	input:focus{
		outline:0;
	}
	h3{
		margin:30px 0;
	}
	.checkbox{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin:10px 0px;
	}
	button{
		width: 100%;
		height: 40px;
		background-color: #D3B077;
		font-size: 20px;
		color:white;
		margin:10px auto;
		border:none;
		border-radius:50px;
	}
	#loginImg{
		height:100%;
		background:url(../../../public/image/login/login.png);
		background-size:100% 100%;
		background-repeat: no-repeat;
		transition: all 0.5s ease-in;
		flex:1;
	}
	div#loginImg>div{
		width: 100%;
		height: 100%;
		background-color:rgba(0,0,0,0.15);
		display: flex;
		flex-direction: column;
		color:white;
	}
	div#loginImg>div>p{
		padding:5px;
		border:2px solid #fff;
		width: 100px;
		margin:100px auto;
		border-radius: 20px;
		cursor:pointer;
	}
	label{
		font-size:12px;
		color:#bbb;
	}
</style>






