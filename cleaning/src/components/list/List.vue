<template>
        <TopNav></TopNav>
        <div id="clean_list">
        <table class="table bg-white">
            <thead>
            <tr style="background:#6785FF;color:white;">
                <th>清洗物件</th>
                <th>清洗方式</th>
                <th>预约时间</th>
                <th>单价（元）</th>
                <th>数量</th>
                <th>金额</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in cleanList" :key="(item,index)">
                    <td>
                        <input @click="chooseThing" class="check" type="checkbox"/>
                        <img :src="item.item_picture"/>
                        <p>{{item.item_name}}</p>
                    </td>
                    <td>{{item.clean_way}}
                    </td>
                    <td>
                        <select>
                            <option>08:00-09:00</option>
                            <option>09:00-10:00</option>
                            <option>10:00-11:00</option>
                            <option>11:00-12:00</option>
                            <option>14:00-15:00</option>
                            <option>15:00-16:00</option>
                            <option>16:00-17:00</option>
                            <option>17:00-18:00</option>
                        </select>
                    </td>
                    <td>￥<span>{{item.item_price}}</span></td>
                    <td>
                        <input @click="changeNum($event)" type="number" :min="1" v-model="item.item_number" style="width:40px;border:none"/>
                    </td>
                    <td>￥<span class="subtotal">{{item.item_price}}</span></td>
                    <td><button class="del" @click="cut(item.item_id)">删除</button></td>
                </tr>
            </tbody>
        </table>
        <el-form >
            <el-form-item label="取件地址：">
                <el-select  placeholder="请选择你的地址" v-model="my_address">
                    <el-option v-for="item in myAddress" :value="item.site"/>
                </el-select>
            </el-form-item>
        </el-form>
        <div>
            <div>
                <input @click="chooseAllThings" id="checkAll" type="checkbox" />全选
                <input type="checkbox" ref="integral"/>会员优惠
                <input type="checkbox" ref="payWays"/>会员支付
                
            </div>
            <div>
                <span>合计：<span id="total">{{Total}}</span>元</span>&nbsp;
                <button @click="payment" class="btn" style="color:#fff;width:150px;background-color:#0AA1ED;height:62px;">去结算</button>
            </div>
        </div>
    </div>
    
</template>

<script>
import TopNav from '../TopNav.vue'
import axios from 'axios'
    export default {
        name:'ListPage',
        data(){
            return{
                cleanList:[],
                Total:0,

                clean_count:[],//各物件清洗数量

                myAddress:[],//选择的地址
                my_address:'',

            }
        },
        mounted(){
            this.select_thing();
            this.select_address();
        },
        methods:{
            //查找地址
            select_address(){
                let user_name=sessionStorage.getItem("user_name");
                console.log(user_name);
                axios.get("http://localhost:8080/cart/select_addr",{
                    params:{user_name:user_name}
                }).then(res=>{
                    this.myAddress=res.data;
                });
            },
            //支付后加入订单
            addOrderList(arr,discount){
                axios.get("http://localhost:8080/cart/update",{
                    params:{arr}
                }).then(res=>{
                    //console.log(res.data);
                    let purchase=res.data;
                    //console.log(purchase);
                    let user_name=sessionStorage.getItem("user_name");
                    axios.get("http://localhost:8080/order/addList",{
                        params:{purchase,user_name,discount}
                    }).then(res=>{
                        if(res.data){
                            axios.post("http://localhost:8080/admin/pointsAdd",`user_name=${user_name}`)
                        }
                    })
                });
            },
            //支付过程
            payment(){
                let checked=document.getElementsByClassName("check");
                let arr=[];
                for(let item of checked){
                    if(item.checked){
                        let obj1='';
                        let thing_name=item.parentElement.parentElement.children[0].lastChild;
                        obj1=this.choose_clean_list(thing_name.innerText);
                        //console.log(obj1);
                        arr.push(obj1);
                    }
                } 
                
                if(arr[0]){
                    var spend=this.Total;
                    let discount=1;//优惠折扣
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
                    if(this.$refs.integral.checked){
                        let user_name=sessionStorage.getItem("user_name");
                        axios.get("http://localhost:8080/payment/member_level",{
                            params:{user_name:user_name}
                        }).then(res=>{
                            if(!res.data[0]){
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
                            this.select_member_account(spend,randcode,discount,arr);
                            
                        })
                    }else{
                        this.select_member_account(spend,randcode,discount,arr);
                   
				    }
                    
                }else{
                    alert("请选中商品后在购买");
                }
                
			},
            //查询会员账户
			select_member_account(spend,randcode,discount,arr){
				let user_name=sessionStorage.getItem("user_name");
				//console.log(this.payWays);
				if(this.$refs.payWays.checked){
					axios.get("http://localhost:8080/admin/member_account",{
						params:{user_name}
					}).then(res=>{
						if(res.data && res.data[0].member_account>=spend){
						
							axios.get("http://localhost:8080/admin/member_account_decrease",{
								params:{spend,user_name}
							}).then(res=>{
								if(res.data){
									alert("付款成功");
                                    this.addOrderList(arr,discount);
								}
							})
						}else{
							alert("账户余额不足");
							//this.paying(spend,randcode,discount,arr);
						}
					})
				}else{
					this.paying(spend,randcode,discount,arr);
				}
			},
            //支付过程
			paying(spend,randcode,discount,arr){
				axios.post("http://localhost:8080/payment/paying",
					`cost=${spend}&randcode=${randcode}`
				).then(res=>{
					//console.log(res.data);
					document.write(res.data);
					if(res.data){
						this.addOrderList(arr,discount);
                    }
				});
			},
            //选中的清洗物件列表
            choose_clean_list(name){
                for(let item of this.cleanList){
                    if(name==item.item_name){
                        return item;
                    }
                }
            },

            //删除清洗列表
            cut(id){
                axios.get('http://localhost:8080/cart/delete',{
                    params:{id:id}
                }).then(res=>{
                    if(res.data){
                        alert("删除成功");
                        this.$router.push("/reload");
                    }else{
                        alert("删除失败");
                    }
                });
            },


            //查询清洗列表
            select_thing(){
                let user_name=sessionStorage.getItem("user_name");
                axios.post('http://localhost:8080/cart/select',`user_name=${user_name}`).then(res=>{
                    //console.log(res.data);
                    this.cleanList=res.data;
                    for(let i=0;i<res.data.length;i++){
                        this.clean_count[i]=1;
                    }
                });
            },
            //计算总价
            total(){
                this.Total=0;
                let checked=document.getElementsByClassName("check");
                for(let item of checked){
                    let subTotal=0;
                    if(item.checked){
                        subTotal=item.parentElement.parentElement.children[5].children[0].innerText;
                        this.Total+=Number(subTotal);
                    }
                }
            },
            //单个物件选择
            chooseThing(){
                let count=0;
                let checked=document.getElementsByClassName("check");
                let checkAll=document.getElementById("checkAll");
                
                for(let item of checked){
                    if(!item.checked){
                        count--;
                    }else{
                        count++;
                    }
                }
                checkAll.checked=(count==checked.length)?true:false;
                this.total();
            },
            //全选
            chooseAllThings(){
                let checked=document.getElementsByClassName("check");
                let checkAll=document.getElementById("checkAll");
                if(checkAll.checked){
                    for(let item of checked){
                        item.checked=true;
                    }
                }else{
                    for(let item of checked){
                        item.checked=false;
                    }
                }
                this.total();
            },
            //数量减少/增加
            changeNum(e){
                if(e.target.value<1){
                    e.target.value=1
                }
                const price =e.target.parentElement.previousElementSibling.children[0].innerText;
                let subTotal=e.target.parentElement.nextElementSibling.children[0].innerText;
                subTotal=Number(e.target.value)*Number(price);
                e.target.parentElement.nextElementSibling.children[0].innerText=subTotal;
                this.total();
            },

            
        },
        components:{
            TopNav:TopNav
        }
    }
</script>

<style>
    #clean_list{
        width:80%;
        margin:100px auto;
    }
    div#clean_list table tbody tr td{
        vertical-align: middle;
    }
    div#clean_list table tbody tr td>img{
        margin:0 10px;
        width:70px;
        height:70px;
        border-radius:50%;
        box-shadow:1px 1px 1px 1px #eee;
    }
    div#clean_list table tbody tr td>p{
        font-weight:bolder;
        margin-top:10px;
    }
    div#clean_list table tbody tr td>select,div#clean_list table tbody tr td>input{
        border:none;
        outline:none;
    }

    div#clean_list>div{
        display:flex;
        justify-content:space-between;
        flex-wrap:wrap;
        background-color:#E7E7E7;
        font-size:14px;
    }
    div#clean_list>div>div:first-child{
        display:flex;
        align-items:center;
        padding:0 30px;
    }
    div#clean_list>div>div:last-child span#total{
        color: #0AA1ED;
        font-weight:bold;
        margin:0 10px;
    }
</style>