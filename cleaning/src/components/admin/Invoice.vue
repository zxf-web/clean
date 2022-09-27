<template>
    <div class="table-responsive">
        <table class="table">
            <thead>
                <tr>
                    <th>序号</th>
                    <th>用户名</th>
                    <th>清洗物件</th>
                    <th>物件图片</th>
                    <th>清洗数量</th>
                    <th>清洗方式</th>
                    <th>下单时间</th>
                    <th>订单状态</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in invoiceList" :key="(item,index)">
                    <td>{{(index+1)+(state-1)*6}}</td>
                    <td>{{item.order_user_name}}</td>
                    <td>{{item.order_thing_name}}</td>
                    <td><img style="width:50px;height:50px;border-radius:50%;" :src="item.order_thing_picture" /></td>
                    <td>{{item.order_number}}</td>
                    <td>{{item.order_clean_way}}</td>
                    <td>{{item.order_time}}</td>
                    <td>{{item.order_status}}</td>
                    <td><button class="del" @click="cut(item.order_id)">删除</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        name:'invoiceComponent',
        inject:['reload'],
        props:["state"],
        data(){
            return{
                invoicesAllList:'',
                invoiceList:'',


            }
        },
        watch:{
            state(){
                //变化现在显示的数据信息
                this.invoiceList=this.invoicesAllList.slice( (this.state-1)*6 , this.state*6 );
            }
            
        },
        mounted(){
            this.select_invoice();
            
        },
        methods:{
            //查找订单
            select_invoice(){
                axios.get('http://localhost:8080/admin/select_invoice').then(res=>{
                    //先保存所有物件
                    this.invoicesAllList=res.data;
                    //console.log(res.data);
                    //变化现在显示的数据信息
                    this.invoiceList=this.invoicesAllList.slice(0,6);


                    this.$emit("father",{
                        long:res.data.length,
                    })
                });
            },
            //删除订单
            cut(id){
                axios.get("http://localhost:8080/admin/delete_invoice",{
                    params:{id}
                }).then(res=>{
                    if(res.data){
                        alert("删除成功");
                        this.$router.push("/reload");
                    }else{
                        alert("删除失败");
                    }
                })
            },
            
        }
    }
</script>

<style>
    /*
    .del{
        background-color:red;
        color:white;
        border:none;
        outline:none;
    }
    */
</style>