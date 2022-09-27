<template>
	<div>
		<el-form style="width:85%;margin:0 auto;padding:50px;">
            <el-form-item label="是否选择会员优惠">
                <el-switch v-model="integral" />
            </el-form-item>
            <el-form-item label="支付方式">
                <el-select v-model="payWays">
                    <el-option value="支付宝付款" />
					<el-option value="会员账户付款"/>
                </el-select>
            </el-form-item>
            <p style="font-size:15px;">支付金额：￥<span style="font-size:2em;color:red;">{{cost}}</span></p>
            <el-button type="primary" @click="payment">立即支付</el-button>
        </el-form>
	</div>
</template>

<script>
import axios from 'axios'
	export default {
		name:'OnlinePayComponent',
		data(){
			return{
				cost:0,
				payWays:'支付宝付款',
				integral:false
			}
		},
		mounted(){
			let thing_name=sessionStorage.getItem("thing_name");
			axios.get("http://localhost:8080/payment/select_thing",{
				params:{
					thing_name:thing_name
				}
			}).then(res=>{
				this.cost=res.data[0].thing_price;
			});
			
		},
		methods:{
			payment(){
				//this.$emit("parent");
				var spend=this.cost;
				var discount=1;
				var chars=[
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
				if(this.integral){
					let user_name=sessionStorage.getItem("user_name");
					axios.get("http://localhost:8080/payment/member_level",{
						params:{user_name:user_name}
					}).then(res=>{
						//console.log(res.data[0]==true);
						if(!res.data[0]){
						console.log(res.data);
						console.log(res.data[0]);
							spend=this.Total;
						}else if(res.data[0].member_level=="普通会员"){
							spend*=0.98;
                            discount=0.98;
						}else if(res.data[0].member_level=="黄金会员"){
							spend*=0.95;
                            discount=0.95;
						}else if(res.data[0].member_level=="白金会员"){
							spend*=0.9;
                            discount=0.9;
						}else if(res.data[0].member_level=="紫金会员"){
							spend*=0.85;
                            discount=0.85;
						}
						this.select_member_account(spend,randcode,discount);
						
						
					})
				}else{
					this.select_member_account(spend,randcode,discount);
					
				}
			},
			//查询会员账户
			select_member_account(spend,randcode,discount){
				let user_name=sessionStorage.getItem("user_name");
				//console.log(this.payWays);
				if(this.payWays=="会员账户付款"){
					axios.get("http://localhost:8080/admin/member_account",{
						params:{user_name}
					}).then(res=>{
						if(res.data && res.data[0].member_account>=spend){
							axios.get("http://localhost:8080/admin/member_account_decrease",{
								params:{spend,user_name}
							}).then(res=>{
								if(res.data){
									alert("付款成功");
									this.addOrder(spend,discount);
									this.$router.push("/home");
								}
							})
						}else{
							alert("账户余额不足");
							//this.paying(spend,randcode,discount);
						}
					})
				}else{
				
					this.paying(spend,randcode,discount);
				}
			},
			//支付过程
			paying(spend,randcode,discount){
				//console.log(spend);
				axios.post("http://localhost:8080/payment/paying",
					`cost=${spend}&randcode=${randcode}`
				).then(res=>{
					//console.log(res.data);
					document.write(res.data);
					if(res.data){
						this.addOrder(spend,discount);
					}
				});
			},
			//加入订单表
			addOrder(spend,discount){
				let user_name=sessionStorage.getItem("user_name");
				let thing_name=sessionStorage.getItem("thing_name");
				let clean_ways=sessionStorage.getItem("clean_ways");
				axios.get("http://localhost:8080/order/add",{
					params:{
						user_name,thing_name,clean_ways,spend,discount
					}
				}).then(res=>{
					if(res.data){
						axios.post("http://localhost:8080/admin/pointsAdd",`user_name=${user_name}`)
					}
					
				})
			}
		}
	}
</script>

<style scoped>

</style>