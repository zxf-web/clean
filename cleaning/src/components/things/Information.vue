<template>
    <div id="information">
        <el-form style="width:85%;margin:0 auto;padding:50px;">
            <el-form-item label="清洗物件">
                <el-select v-model="goods" placeholder="Please select thing">
                    <el-option v-for="item in thingList" :key="item" :value="item" />
                </el-select>
            </el-form-item>
            <el-form-item label="清洗方式">
                <el-select v-model="ways" placeholder="Please select way">
                    <el-option value="水洗" />
                    <el-option value="干洗" />
                </el-select>
            </el-form-item>
            <el-form-item label="取件时间">
                <el-select v-model="delivery" placeholder="Please select delivery time">
                    <el-option v-for="item in delevery_time" :key="item" :value="item" />
                </el-select>
            </el-form-item>
            
            <el-form-item label="取件地址">
                <el-input v-model="addr" type="textarea" placeholder="请输入取件地址"/>
            </el-form-item>
            <el-form-item label="手机号码">
                <el-input placeholder="请输入你的手机号码" v-model="reservedPhone" />
            </el-form-item>
            <el-form-item label="备注信息">
                <el-input v-model="desc" type="textarea" />
            </el-form-item>  
            <el-form-item label="是否加入清洗列表">
                <el-switch v-model="addcart" />
            </el-form-item>
			<el-button type="primary" @click="firstChild">下一步</el-button>
        </el-form>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        name:"InformationComponent",
        data(){
            return{
                goods:'',
                ways:'',
                delivery:'',
                reservedPhone:'',
                addr:'',
                desc:'',
                addcart:false,
                thingList:[
                    "西服套装","衬衫","T恤","休闲上衣","毛呢大衣","皮衣",
                    "风衣","连衣裙","裙类","披肩/围巾","棉衣","羽绒服",
                    "裤装","羊毛衫","卫衣","冲锋衣","绒面短靴","光面短靴",
                    "绒面长靴","光面长靴","高跟靴","皮鞋","运动休闲鞋",
                    "中靴","棉质四件套","真丝四件套","毛巾被","被套",
                    "被芯","枕套","毛毯","枕芯","帆布袋","钱夹","皮包",
                    "皮草大衣","高端鞋靴",
                ],
                delevery_time:[
                    '08:30-09:30','09:30-10:30',
                    '10:30-11:30','13:00-14:00',
                    '14:00-15:00','15:00-16:00',
                    '16:00-17;00','17:00-18:00'
                ]
            }
        },
        methods:{
            firstChild(){
                if(sessionStorage.getItem("user_name")){
                    //sessionStorage.setItem("thing_name",this.goods);
                    //sessionStorage.setItem("clean_ways",this.ways);

                    this.$emit('parent',{
                        goods:this.goods,
                        ways:this.ways,
                        addr:this.addr,
                        delivery:this.delivery,
                        reservedPhone:this.reservedPhone,
                        desc:this.desc,
                        addcart:this.addcart
                    });
                    
                    if(this.addcart){
                        let user_name=sessionStorage.getItem("user_name");
                        axios.get("http://localhost:8080/cart/ifAdd",{
                            params: {
                                user_name:user_name,
                                item_name:this.goods
                            }
                        }).then(res=>{
                            if(res.data){
                                axios.get("http://localhost:8080/cart/add",{
                                    params:{
                                        user_name:user_name,
                                        item_name:this.goods,
                                        clean_way:this.ways
                                    }
                                }).then(res=>{
                                    if(res.data){
                                        alert("添加成功");
                                    }else{
                                        alert("添加失败");
                                    }
                                });
                            }else{
                                alert("此物件已在购物车存在");
                            }
                        });
                    }
                }else{
                    alert("请先登录");
                    this.$router.push("/login");
                }
            }
        }
    }
</script>

<style>

</style>