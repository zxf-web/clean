<template>
    <div id="address">
        <div>
            <el-card class="box-card" style="margin:10px auto;" v-for="item in addressList" :key="item">
                <template #header>
                <div class="card-header" style="display:flex;justify-content:space-between;">
                    <div style="display:flex;justify-content:space-around;">
                        <span style="color:#669EFF;">{{item.address_user_name}}</span>
                        <span>{{item.telephonenumber}}</span>
                    </div>
                    <div style="display:flex;justify-content:space-around;">
                        <el-button class="button" @click="eject(item)">编辑</el-button>
                        <el-button @click="cut(item.address_id)" class="button bg-danger" style="color:white;">删除</el-button>
                    </div>
                </div>
                </template>
                <p style="text-align:left;">{{item.site}}</p>
            </el-card>
        </div>

        

        
        <!-- 添加地址 -->
        <el-button type="primary" style="" @click="drawer2 = true">添加地址</el-button>
        <el-drawer v-model="drawer2" :direction="direction">
            <template #title>
                <h4>添加你的收件地址</h4>
            </template>
            <template #default>
            <div>
                <el-form >
                    <el-form-item label="收件人名" :label-width="formLabelWidth">
                        <el-input  v-model="addressee"/>
                    </el-form-item>
                    <el-form-item label="手机号码" :label-width="formLabelWidth">
                        <el-input   v-model="numberphone"/>
                    </el-form-item>
                    <el-form-item label="收件地址" :label-width="formLabelWidth">
                        <el-input  v-model="to_address"/>
                    </el-form-item>
                </el-form>
            </div>
            </template>
            <template #footer>
            <div style="flex: auto">
                <el-button @click="drawer2=false">取消</el-button>
                <el-button type="primary" @click="addAddress">添加</el-button>
            </div>
            </template>
        </el-drawer>


        <!-- 编辑地址 -->
        <el-dialog v-model="dialogFormVisible" title="修改地址">
            <el-form >
                <el-form-item label="收件人名" :label-width="formLabelWidth">
                    <el-input  v-model="username" />
                </el-form-item>
                <el-form-item label="手机号码" :label-width="formLabelWidth">
                    <el-input v-model="telephone"  />
                </el-form-item>
                <el-form-item label="收件地址" :label-width="formLabelWidth">
                    <el-input v-model="address" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="exit()">保存</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        name:'AddressComponent',
        data(){
            return {
                dialogFormVisible:false,
                addressList:[],
                username:'',
                telephone:'',
                address:'',
                aid:'',

                //添加地址
                drawer2:false,
                addressee:'',
                numberphone:'',
                to_address:''
            }
        },
        mounted(){
            this.select_addr();
        },
        methods:{
            //删除地址
            cut(id){
                console.log(id);
                axios.get("http://localhost:8080/address/delete",{
                    params:{id:id}
                }).then(res=>{
                    if(res.data){
                        alert("删除成功");
                        this.select_addr();
                    }else{
                        alert("删除失败");
                    }
                })
            },


            //添加地址 
            addAddress(){
                let address_user_name=sessionStorage.getItem("user_name");
                
                axios.get("http://localhost:8080/address/add",{
                    params:{
                        addressee:this.addressee,
                        numberphone:this.numberphone,
                        to_address:this.to_address,
                        address_user_name:address_user_name
                    }
                }).then(res=>{
                    //console.log(res.data);
                    if(res.data){
                        alert("添加成功");
                        this.drawer2=false;
                        this.select_addr();
                    }else{
                        alert("添加失败");
                    }
                })
            },

            //修改地址
            exit(){
                axios.get("http://localhost:8080/address/exit",{
                    params:{
                        aid:this.aid,
                        username:this.username,
                        telephone:this.telephone,
                        address:this.address,
                    }
                }).then(res=>{
                    if(res.data){
                        this.select_addr();
                        alert("修改成功");
                        this.dialogFormVisible = false;
                    }else{
                        alert("修改失败");
                    }
                    
                })
            },
            eject(e){
                this.dialogFormVisible = true;
                this.username=e.address_user_name;
                this.telephone=e.telephonenumber;
                this.address=e.site;
                this.aid=e.address_id;
            },
            //查询地址
            select_addr(){
                let address_user_name=sessionStorage.getItem("user_name");
                //console.log(address_user_name);
                axios.get('http://localhost:8080/address/select',{
                    params:{
                        address_user_name:address_user_name
                    }
                }).then(res=>{
                    this.addressList=res.data;
                })
            }
        }
        
    }
</script>

<style>
    #address{
        width:90%;
        margin:80px auto;
    }
    div#address .address_list{
        box-shadow:1px 1px 10px 1px #eee;
        background:#459FFA;
        color:white;
        border-radius:20px;
    }
</style>