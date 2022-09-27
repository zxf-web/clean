<template>
    <div id="info" style="width:90%;margin:90px auto;">
        <el-form style="">
            <el-form-item label="用户名称">
                <el-input :value="user_name" disabled/>
            </el-form-item>
            <el-form-item label="个人密码">
                <el-input type="password" value="******" disabled/>
            </el-form-item>
            <el-form-item label="手机号码">
                <el-input :value="user_phone" disabled/>
            </el-form-item>
            <el-form-item label="邮箱地址">
                <el-input :value="user_email" disabled/>
            </el-form-item>
            <el-form-item label="会员等级">
                <el-input :value="member_level" disabled/>
            </el-form-item>
            
        </el-form>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        name:'InfoComponent',
        data(){
            return{
                user_name:'',
                user_phone:'',
                user_email:'',
                member_level:''
            }
        },
        mounted(){
            this.select_personInfo();
        },
        methods:{
            //查询用户表信息
            select_personInfo(){
                let username=sessionStorage.getItem("user_name");
                axios.get('http://localhost:8080/person/select',{
                    params:{user_name:username}
                }).then(res=>{
                    //console.log(res.data);
                    this.user_name=res.data[0].user_name;
                    this.user_email=res.data[0].user_email;
                    this.user_phone=res.data[0].user_phone;
                    this.memberLevel(res.data[0].user_id);
                });
            },
            //查询会员表对应用户的会员等级
            memberLevel(id){
                axios.get('http://localhost:8080/person/select_member_id',{
                    params:{member_user_id:id}
                }).then(res=>{
                    //console.log(res.data);
                    this.member_level=res.data[0].member_level;
                })
            }
        }
    }
</script>

<style>

</style>