<template>
    <TopNav></TopNav>
    <div id="member">
        <div>
            <div class="member_title">
				<h1>VIP</h1>
                <p @click="dialogVisible = true" style="background-color:#FFD700;border-radius:5px;box-shadow:1px 1px 2px 1px #eee;">成为会员</p>
                <p>Member Center</p>
            </div>
        </div>
        <Growth></Growth>
        <Privileges></Privileges>
        <Unscramble></Unscramble>
        <Notice></Notice>
    </div>

    <el-dialog v-model="dialogVisible" title="申请成为会员" width="30%" draggable>
        <el-form>
            <el-form-item label="用户名称">
                <el-input :value="username" disabled />
            </el-form-item>
            <el-form-item label="手机号码">
                <el-input :value="number" disabled />
            </el-form-item>
        </el-form>
        <template #footer>
        <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="registerMember">申请</el-button>
        </span>
        </template>
    </el-dialog>
</template>

<script>
import TopNav from '../TopNav.vue'
import Growth from './Growth.vue'
import Unscramble from './Unscramble.vue'
import Privileges from './Privileges.vue'
import Notice from './Notice.vue'
import axios from 'axios'
    export default {
        name:'MemberPage',
        data(){
            return{
                dialogVisible:false,
                username:'',
                number:''
            }
        },
        mounted(){
            let user_name=sessionStorage.user_name;
            this.username=user_name;
            axios.get("http://localhost:8080/user/member_register_select",{
                params:{user_name}
            }).then(res=>{
                this.number=res.data[0].user_phone;
            })
        },
        methods:{
            registerMember(){
                axios.post("http://localhost:8080/user/member_register",`username=${this.username}&number=${this.number}`).then(res=>{
                    if(res.data){
                        alert("注册成功");
                        this.dialogVisible=false;
                    }else{
                        alert("你已是会员");
                        this.dialogVisible=false;
                    }
                })
                
            }
        },
        components:{
            TopNav,
            Growth,
            Privileges,
            Unscramble,
            Notice
        }
    }
</script>

<style>
    div#member>div:first-child{
        width:100%;
        height:400px;
		background-image:url('../../../public/image/member/banner.jpg');
		background-size: 100% 100%;
		background-repeat:no-repeat;
        display:flex;
        justify-content:space-around;
        color:white;
        font-size:30px;
        margin-top:60px;
		align-items: center;
        animation:bounceIn 1s;
    }
    div#member div h1{
        font-size:5em;
        font-family:'宋体';
        font-weight:bolder;
    }
</style>