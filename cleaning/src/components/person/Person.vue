<template>	
	<div class="full_container">
		<div class="inner_container">
			<!-- Sidebar  -->
			<nav id="sidebar">
				<div class="sidebar_blog_1">
					<div class="sidebar_user_info">
						<div class="icon_setting"></div>
						<div class="user_profle_side">
							<div class="user_img"><img class="img-responsive" src="../../../public/image/user_img.jpg" alt="#" /></div>
							<div class="user_info">
								<h6>{{username}}</h6>
								<p><span class="online_animation"></span> Online</p>
							</div>
						</div>
					</div>
				</div>
				<div class="sidebar_blog_2">
					<h4>General</h4>
					<ul class="list-unstyled components">
						<li><router-link to="/person/info">个人信息</router-link></li>
						<li><router-link to="/person/change">修改信息</router-link></li>
						<li><router-link to="/person/address">我的地址</router-link></li>
					</ul>
				</div>
			</nav>
			<!-- end sidebar -->
			<!-- right content -->
			<div id="content">
				<!-- topbar -->
				<div class="topbar">
					<nav class="navbar navbar-expand-lg navbar-light">
						<div class="full">
							<button type="button" id="sidebarCollapse" class="sidebar_toggle"><i class="navbar-toggler-icon"></i></button>
							<div class="logo_section">
								<router-link to="/home"><img class="img-responsive" src="../../../public/image/logo/logo.png" alt="#" /></router-link>
							</div>
							<div class="right_topbar">
								<div class="icon_info">
									<ul class="user_profile_dd">
										<li>
											<a class="dropdown-toggle" data-toggle="dropdown"><img class="img-responsive rounded-circle" src="../../../public/image/user_img.jpg" alt="#" /><span class="name_user">{{username}}</span></a>
											<div class="dropdown-menu">
												<a class="dropdown-item" href="#" @click="dialogVisible=true"><span>会员充值</span> <i class="fa fa-sign-out"></i></a>
												<a class="dropdown-item" href="#" @click="signUp"><span>Login Out</span> <i class="fa fa-sign-out"></i></a>
											</div>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</nav>
				</div>
				<!-- end topbar -->
				<!-- dashboard inner -->
				<div class="midde_cont" style="margin:20px auto;">
					<div class="container-fluid">
						<!-- row -->
						<div class="row column1">
							<div class="col-md-12">
								<div class="white_shd full margin_bottom_30">
									<div class="full graph_head">
										<div class="heading1 margin_0">
											<h2>个人中心<small>(Person)</small></h2>
										</div>
									</div>
									<div class="map_section padding_infor_info">
										<div class="map m_style1">
											<div id="map">
												<router-view></router-view>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<!-- end row -->
					</div>
					<!-- footer -->
					<div class="container-fluid">
						<div class="footer">
							<p>Copyright © 2022 Designed by html.design. All rights reserved.</p>
						</div>
					</div>
				</div>
				<!-- end dashboard inner -->
			</div>
		</div>
	</div>

	<!-- 会员充值 -->
  <el-dialog v-model="dialogVisible" title="请充值" width="30%">
    <el-form-item label="充值金额">
		<el-input v-model="money" />
	</el-form-item>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="recharge">充值</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import axios from 'axios'
    export default {
        name:'PersonPage',
		data(){
			return{
				username:'',
				dialogVisible:false,
				money:''
			}
		},
		mounted(){
			this.username=sessionStorage.getItem("user_name");
			this.$router.push("/person/info");
		},
		methods:{
			//会员充值
			recharge(){
				let user_name=sessionStorage.getItem("user_name");
				this.dialogVisible=false;
				let chars=[
					'1','2','3','4','5','6','7','8','9',
					'a','b','c','d','e','f','g','h','i',
					'j','k','l','m','n','o','p','q','r',
					's','t','u','v','w','x','y','z',
					'A','B','C','D','E','F','G','H','I',
					'J','K','L','M','N','O','P','Q','R',
					'S','T','U','V','W','X','Y','Z'
				];
				let randcode="";
				for(let i=0;i<14;i++){
					let randpos=Math.floor(Math.random()*chars.length);
					randcode+=chars[randpos];
				}
				axios.post("http://localhost:8080/payment/paying",
					`cost=${this.money}&randcode=${randcode}`
				).then(res=>{
					document.write(res.data);
					if(res.data){
						axios.get("http://localhost:8080/admin/member_account_increase",{
							params:{user_name:user_name,money:this.money}
						})
					}else{
						alert("充值失败");
					}
				})
			},
			//退出登录
			signUp(){
				sessionStorage.removeItem("user_name");
				this.$router.push("/home");
			}
		},
        components:{
        }
    }
</script>

<style>
		
</style>