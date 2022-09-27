<template>
    <div class="table-responsive">
        <table class="table">
            <thead>
                <tr>
                    <th>序号</th>
                    <th>用户名</th>
                    <th>手机号码</th>
                    <th>邮箱地址</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in userList" :key="(item,index)">
                    <td>{{(index+1)+(state-1)*6}}</td>
                    <td>{{item.user_name}}</td>
                    <td>{{item.user_phone}}</td>
                    <td>{{item.user_email}}</td>
                    <td>
                        <button class="exit" @click="editorData(item)">编辑</button>
                        <button class="del" @click="cut(item.user_id)">删除</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- 修改用户信息 -->
        <el-dialog v-model="dialogVisible" title="修改用户信息" width="30%" draggable>
            <el-form>
                <el-form-item label="用户名称"><el-input v-model="user_name" disabled/></el-form-item>
                <el-form-item label="手机号码"><el-input v-model="phone"/></el-form-item>
                <el-form-item label="邮箱地址"><el-input v-model="email"/></el-form-item>
            </el-form>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="editor">修改</el-button>
            </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        name:'UserComponent',
        props:["state"],
        data(){
            return{
                userAllList:'',
                userList:'',

                //编辑用户属性
                dialogVisible:false,
                email:'',
                phone:'',
                user_name:'',
                user_id:''
            }
        },
        watch:{
            state(){
                //变化现在显示的数据信息
                this.userList=this.userAllList.slice( (this.state-1)*6 , this.state*6 );
            }
            
        },
        mounted(){
            this.select_user();
            
        },
        methods:{
            //用户数据信息
            editorData(e){
                this.email=e.user_email;
                this.phone=e.user_phone;
                this.user_id=e.user_id;
                this.user_name=e.user_name;
                this.dialogVisible=true;
            },
            //修改用户信息
            editor(){
                axios.get("http://localhost:8080/admin/update_user",{
                    params:{
                        user_id:this.user_id,
                        user_phone:this.phone,
                        user_email:this.email
                    }
                }).then(res=>{
                    if(res.data){
                        alert("修改成功");
                        this.dialogVisible=false;
                        this.$router.push("/reload");
                    }else{
                        alert("修改失败");
                    }
                })
            },

            //查询用户信息
            select_user(){
                axios.get('http://localhost:8080/admin/select_user').then(res=>{
                    //先保存所有物件
                    this.userAllList=res.data;
                    //console.log(res.data);
                    //变化现在显示的数据信息
                    this.userList=this.userAllList.slice(0,6);


                    this.$emit("father",{
                        long:res.data.length
                    })
                });
            },
            //删除用户信息
            cut(id){
                axios.get("http://localhost:8080/admin/delete_user",{
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

<style lang="scss" scoped>

</style>