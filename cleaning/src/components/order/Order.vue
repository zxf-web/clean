<template>
    <TopNav></TopNav>
    <div id='order' class="row">
        <el-card class="box-card"  style="margin:15px;width:375px;" v-for="(item) in order_list" :key="(item)">
            <template #header>
            <div class="card-header" style="display:flex;justify-content:space-between;">
                <span style="font-size:20px;font-weight:bold;">{{item.order_thing_name}}</span>
                <span @click="visible = true">查看所有订单</span>
            </div>
            <p style="text-align:left;margin:0;">下单时间：<span>{{item.order_time}}</span></p>
            </template>
            <div style="display:flex;">
                <div style="width:50%;margin-right:10px;">
                    <img :src="item.order_thing_picture" class="bounce_In" style="width:100%;height:100%;">
                </div>
                <div>
                    <div style="text-align:left;" class="bounce_InUp">
                        <span>清洗方式：</span>{{item.order_clean_way}}
                    </div>
                    <div style="text-align:left;" class="bounce_InUp">
                        <span>清洗数量：</span>{{item.order_number}}
                    </div>
                    <div style="text-align:left;"  class="bounce_InUp">
                        <span>清洗单价：</span>{{item.order_price}}
                    </div>
                    <div style="text-align:left;" class="bounce_InUp">
                        <span>物件总价：</span>{{item.order_total}}
                    </div>
                    <div style="text-align:left;" class="bounce_InUp">
                        <span>订单状态：</span>
                        <span style="color:#65D00B;"  @click="confirm(item.order_id,$event)">{{item.order_status}}</span>
                        
                    </div>
                </div>
            </div>
        </el-card>
    </div>

    <!-- 所有订单 -->
    <el-dialog v-model="visible" :show-close="false">
        <template #header="{ titleId, titleClass }">
        <div class="my-header" style="display:flex;justify-content:space-between;">
            <h4 :id="titleId" :class="titleClass">所有订单</h4>
            <el-button type="danger" @click="visible=false">关闭</el-button>
        </div>
        </template>
        <el-table @cell-click="change_status($event)" :data="orderAll" height="350" style="width: 110%">
            <el-table-column prop="order_thing_name" label="物件名称"/>
            <el-table-column prop="order_clean_way" label="清洗方式" />
            <el-table-column prop="order_price" label="清洗单价" />
            <el-table-column prop="order_number" label="清洗数量"/>
            <el-table-column prop="order_total" label="清洗总价" />
            <el-table-column prop="order_time" label="下单时间" />
            <el-table-column prop="order_status" label="订单状态" />
        </el-table>
    </el-dialog>
</template>

<script>
import TopNav from '../TopNav.vue'
import axios from 'axios'
    export default {
        name:'OrderPage',
        data(){
            return{
                order_list:[],//前六个订单
                orderAll:[],//所有订单
                visible:false,//所有订单是否可见
            }
        },
        mounted(){
            this.select_order();
        },
        methods:{
            //确认完成
            confirm(id,e){
                axios.get("http://localhost:8080/order/order_status",{
                    params:{id}
                }).then(res=>{
                    if(res.data){
                        e.target.innerText="已完成";
                    }
                })
            },
            change_status(event){
                axios.get("http://localhost:8080/order/order_status",{
                    params:{id:event.order_id}
                }).then(res=>{
                    if(res.data){
                        event.order_status="已完成";
                    }
                })
                
            },

            //查询订单
            select_order(){
                let user_name=sessionStorage.getItem("user_name");
                axios.post('http://localhost:8080/order/select',`user_name=${user_name}`).then(res=>{
                    //console.log(res.data.length);
                    if(res.data.length>12){
                        this.order_list=res.data.slice(0,12)
                    }else{
                        this.order_list=res.data;
                    }
                    this.orderAll=res.data;
                    
                })
            }
        },
        components:{
            TopNav
        }
    }
</script>

<style>
    #order{
        width:80%;
        margin:100px auto;
        display:flex;
        flex-wrap:wrap;
        justify-content:flex-start;
    }
    
</style>