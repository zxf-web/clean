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
								<h6>{{adminAccount}}</h6>
								<p><span class="online_animation"></span> Online</p>
							</div>
						</div>
					</div>
				</div>
				<div class="sidebar_blog_2">
					<h4>General</h4>
					<ul class="list-unstyled components">
						<li @click="this.flag=true"><router-link to="/administrator/invoice">订单管理</router-link></li>
						<li @click="this.flag=true"><router-link to="/administrator/user">用户管理</router-link></li>
						<li @click="this.flag=true"><router-link to="/administrator/clean">清洗物品管理</router-link></li>
						<li @click="this.flag=true"><router-link to="/administrator/memberShip">会员管理</router-link></li>
						<li @click="this.flag=false"><router-link to="/administrator/statistic">数据可视化管理</router-link></li>
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
								<img class="img-responsive" src="../../../public/image/logo/logo.png" alt="#" />
							</div>
							<div class="right_topbar">
								<div class="icon_info">
									<ul class="user_profile_dd">
										<li>
											<a class="dropdown-toggle" data-toggle="dropdown"><img class="img-responsive rounded-circle" src="../../../public/image/user_img.jpg" alt="#" /><span class="name_user">{{adminAccount}}</span></a>
											<div class="dropdown-menu" @click="signUp">
												<a class="dropdown-item" href="#"><span>Log Out</span> <i class="fa fa-sign-out"></i></a>
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
				<div class="midde_cont">
					<div class="container-fluid">
						
						<!-- row -->
						<div class="row column1" style="margin:30px auto;">
							<div class="col-md-12">
								<div class="white_shd full margin_bottom_30">
									<div class="full graph_head">
										<div class="heading1 margin_0">
											<h2>管理员 <small>(Admin)</small></h2>
										</div>
									</div>
									<div class="map_section padding_infor_info">
										<div class="map m_style1">
											<div id="map">
												<router-view @father="things" :state="state"></router-view>
												<Page :flag="flag"  :pages="pages" @mychange="pageState"></Page>
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
							<p>Copyright © Designed by html.design. All rights reserved.</p>
						</div>
					</div>
				</div>
				<!-- end dashboard inner -->
			</div>
		</div>
	</div>
    
</template>

<script>
import Page from '../Page.vue'
    export default {
        name:'AdministratorPage',
		data(){
			return{
				thingsAll:'',
				thingList:'',
				state:1,
				pages:0,//数据绑定，多少页
				adminAccount:'',
				flag:true,//传递给分页组件的状态
			}
		},
		mounted(){
			this.adminAccount=sessionStorage.getItem("adminAccount");
		},
		methods:{
			//退出登录
			signUp(){
				sessionStorage.removeItem("adminAccount");
				this.$router.push("/home");
			},
			//物件总个数
			things(thing){
				this.pages=Math.ceil(thing.long/6);
			},
			//当前页面状态
			pageState(num){
				this.state=num;
			}
		},
        components:{Page}
    }
</script>

<style>

</style>