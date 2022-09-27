<template>
    <div class="table-responsive">
        <table class="table">
            <thead>
                <tr>
                    <th>序号</th>
                    <th>用户名</th>
                    <th>会员卡号</th>
                    <th>会员等级</th>
                    <th>会员积分</th>
                    <th>账户余额</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in memberList" :key="(item,index)">
                    <td>{{(index+1)+(state-1)*6}}</td>
                    <td>{{item.user_name}}</td>
                    <td>{{item.member_card_number}}</td>
                    <td>{{item.member_level}}</td>
                    <td>{{item.member_points}}</td>
                    <td>{{item.member_account}}</td>
                    <td>
                        <button class="exit" @click="editorData(item)">编辑</button>
                        <button class="del" @click="cut(item.member_id)">删除</button>
                    </td>
                </tr>
            </tbody>
        </table>


        <!-- 修改会员信息 -->
        <el-dialog v-model="dialogVisible" title="修改会员信息" width="30%" draggable>
            <el-form>
                <el-form-item label="用户名称"><el-input v-model="username" disabled/></el-form-item>
                <el-form-item label="会员等级"><el-input v-model="level"/></el-form-item>
                <el-form-item label="会员积分"><el-input v-model="points"/></el-form-item>
                <el-form-item label="账户余额"><el-input v-model="account"/></el-form-item>
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
        name:'MemberShipComponent',
        props:["state"],
        data(){
            return{
                //查询属性
                memberAllList:'',
                memberList:'',

                //编辑会员属性
                dialogVisible:false,
                level:'',
                points:'',
                account:'',
                username:'',
                member_id:''
            }
        },
        watch:{
            state(){
                //变化现在显示的数据信息
                this.memberList=this.memberAllList.slice( (this.state-1)*6 , this.state*6 );
            }
            
        },
        mounted(){
            this.select_member();
            
        },
        methods:{
            //编辑会员数据
            editorData(e){
                this.member_id=e.member_id;
                this.username=e.user_name;
                this.level=e.member_level;
                this.points=e.member_points;
                this.account=e.member_account;
                this.dialogVisible = true;
            },
            //修改会员信息
            editor(){
                axios.get("http://localhost:8080/admin/update_member",{
                    params:{
                        member_id:this.member_id,
                        level:this.level,
                        points:this.points,
                        account:this.account
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


            //查询会员
            select_member(){
                axios.get('http://localhost:8080/admin/select_member').then(res=>{
                    //先保存所有物件
                    this.memberAllList=res.data;
                    //console.log(res.data);
                    //变化现在显示的数据信息
                    this.memberList=this.memberAllList.slice(0,6);

                    this.$emit("father",{
                        long:res.data.length
                    })
                });
            },
            //删除会员
            cut(id){
                axios.get("http://localhost:8080/admin/delete_member",{
                    params:{
                        id:id
                    }
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