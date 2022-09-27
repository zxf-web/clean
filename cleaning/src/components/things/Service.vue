<template>
    <!-- 顶部导航条 -->
    <TopNav></TopNav>
    <!-- 中间图 -->
    <div class="serviceImg"></div>
    <main>
        <div class="demo-collapse">
            <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="&nbsp;&nbsp;&nbsp;^-^&nbsp;可以在这里下单哦&nbsp;^-^">
                <el-steps :active="active" align-center>
                    <el-step title="填写订单"/>
                    <el-step title="确认订单"/>
                    <el-step title="在线支付"/>
                </el-steps>
				<router-view @parent="onSubmit"></router-view>  
            </el-collapse-item>
            </el-collapse>
        </div>
        <!-- 洗护类型 -->
        <!-- 衣物洗护 -->
        <div class="service_items">
            <h3>衣物洗护</h3>
            <p>Clothes care</p>
            <div class="row">
				<div class="col-lg-3 p-1 col-md-4 col-sm-6 col-xs-12 h-25" v-for="item in allClothes" :key="item">
					<img :src="item.thing_picture">
					<p>{{item.thing_name}}</p>
				</div>
            </div>
        </div>
        <!-- 鞋靴洗护 -->
        <div class="service_items">
            <h3>鞋靴洗护</h3>
            <p>Shoes care</p>
            <div class="row">
				<div class="col-lg-3 p-1 col-md-4 col-sm-6 col-xs-2 h-25" v-for="item in allShoes" :key="item">
					<img :src="item.thing_picture">
					<p>{{item.thing_name}}</p>
				</div>
			</div>
        </div>
        <!-- 家纺洗护 -->
        <div class="service_items">
            <h3>家纺洗护</h3>
            <p>Textiles care</p>
            <div class="row">
                <div class="col-lg-3 p-1 col-md-4 col-sm-6 col-xs-12 h-25" v-for="item in allTexiles" :key="item">
					<img :src="item.thing_picture">
					<p>{{item.thing_name}}</p>
				</div>
            </div>
        </div>
        <!-- 奢侈品护理 -->
        <div class="service_items">
            <h3>奢侈品护理</h3>
            <p>Brand care</p>
            <div class="row">
                <div class="col-lg-3 p-1 col-md-4 col-sm-6 col-xs-12 h-25" v-for="item in allBrand" :key="item">
					<img :src="item.thing_picture">
					<p>{{item.thing_name}}</p>
				</div>
            </div>
        </div>
    </main>
</template>

<script>
import TopNav from '../TopNav.vue'
import axios from 'axios'
    export default{
        name:'ServicePage',
        data(){
            return{
				//步骤条状态标记
				active:0,
				allClothes:[],
				allShoes:[],
				allTexiles:[],
				allBrand:[]
				
            }
        },
		mounted(){
			this.things();
            //this.$router.push("/service/information");
		},
        methods:{
            //查询所有清洗物件
			things(){
				axios.get('http://localhost:8080/thing/select_clothes',{
					params:{thing_form:1}
				}).then(res=>{
					this.allClothes=res.data;
				});
				axios.get('http://localhost:8080/thing/select_shoes',{
					params:{thing_form:2}
				}).then(res=>{
					this.allShoes=res.data;
				});
				axios.get('http://localhost:8080/thing/select_texiles',{
					params:{thing_form:3}
				}).then(res=>{
					this.allTexiles=res.data;
				});
				axios.get('http://localhost:8080/thing/select_brands',{
					params:{thing_form:4}
				}).then(res=>{
					this.allBrand=res.data;
				})
			},


            //子组件传递过来的参数触发的方法
			onSubmit(thing){
				if(this.active==0){
					this.$router.push({
						path:'/service/generate',
						query:{thing:JSON.stringify(thing)}
					});
					this.active++;
				}else if(this.active==1){
                    this.$router.push("/service/onlinePay");
                    this.active++;
                }else if(this.active==2){
                    this.$router.push("/service/payFinish");
                    this.active++;
                }
			},
			
        },
        components:{
            TopNav
        }
    }
</script>

<style>   
    .serviceImg{
        width:100%;
        height:600px;
        background-image:url('../../../public/image/items/banner3.png');
        background-repeat:no-repeat;
        background-size:100% 100%;
		animation:bounceInDown 1s;
    }
	a{
		text-decoration:none;
		color:black;
	}
    #place_order{
        display: flex;
        width: 100%;
        justify-content: space-around;
        font-size:17px;
        margin-top:10px;
    }
    .service_items{
        width:80%;
        margin:100px auto;
    }
    .service_items .row div>img{
        width:100%;
        height:100%;
    }
</style>