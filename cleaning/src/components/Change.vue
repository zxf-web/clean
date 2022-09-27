<template>
    <div id="info" style="width:90%;margin:90px auto;">
        <el-form style="">
            <el-form-item label="旧用户名">
                <el-input type="text" placeholder="请输入旧的用户名" v-model="o_user_name"/>
            </el-form-item>
            <el-form-item label="新用户名">
                <el-input placeholder="请输入新的用户名" v-model="n_user_name"/>
            </el-form-item>
            <el-form-item label="旧的密码">
                <el-input placeholder="请输入旧密码" v-model="o_user_password"/>
            </el-form-item>
            <el-form-item label="新的密码">
                <el-input placeholder="请输入新密码" v-model="n_user_password"/>
            </el-form-item>
            <el-button-form>
                <el-button type="reset">取消</el-button>
                <el-button type="primary" @click="update">保存</el-button>
            </el-button-form>
        </el-form>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        name:'InfoComponent',
        data(){
            return{
                o_user_password:'',
                o_user_name:'',
                n_user_name:'',
                n_user_password:''
            }
        },
        methods:{
            update(){
                axios.get('http://localhost:8080/person/update',{
                    params:{
                        o_user_name:this.o_user_name,
                        n_user_name:this.n_user_name,
                        n_user_password:this.n_user_password
                    }
                }).then(res=>{
                    if(res.data){
                        alert("修改成功");
                        this.$router.push("/person/info");
                    }else{
                        alert("修改失败");
                    }
                });
            }
        }
    }
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 80px;
  height: 80px;
  text-align: center;
}
</style>