<template>
    <div class="table-responsive">
        <table class="table">
            <thead>
                <tr>
                    <th>序号</th>
                    <th>物件名</th>
                    <th>物件图片</th>
                    <th>清洗单价</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in thingList" :key="(item,index)">
                    <td>{{(index+1)+(state-1)*6}}</td>
                    <td>{{item.thing_name}}</td>
                    <td>
                        <img style="width:50px;height:50px;border-radius:50%;" :src="item.thing_picture" />
                    </td>
                    <td>{{item.thing_price}}</td>
                    <td>
                        <button class="exit" @click="editorData(item)">编辑</button>
                        <button class="del" @click="cut(item.item_id)">删除</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- 修改清洗物件信息 -->
        <el-dialog v-model="dialogVisible" title="修改清洗物件信息" width="30%" draggable>
            <el-form>
                <el-form-item label="物件名称"><el-input v-model="thing_name" disabled/></el-form-item>
                <el-form-item label="清洗价格"><el-input v-model="price"/></el-form-item>
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
        name:'thingListComponent',
        props:["state"],
        data(){
            return{
                thingsAllList:'',
                thingList:'',

                //编辑用户属性
                dialogVisible:false,
                thing_name:'',
                price:'',
                thing_id:''
            }
        },
        watch:{
            state(){
                //变化现在显示的数据信息
                this.thingList=this.thingsAll.slice( (this.state-1)*6 , this.state*6 );
            }
            
        },
        mounted(){
            this.select_clean_things();
            
        },
        methods:{
            //清洗物件数据信息
            editorData(e){
                this.price=e.thing_price;
                this.thing_name=e.thing_name;
                this.thing_id=e.thing_id;
                this.dialogVisible=true;
            },
            //修改清洗物品信息
            editor(){
                axios.get("http://localhost:8080/admin/update_thing",{
                    params:{
                        thing_id:this.thing_id,
                        thing_price:this.price
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

            //查询清洗的物品
            select_clean_things(){
                axios.get('http://localhost:8080/admin/select_clean_things').then(res=>{
                    //先保存所有物件
                    this.thingsAll=res.data;
                    
                    //变化现在显示的数据信息
                    this.thingList=this.thingsAll.slice(0,6);


                    this.$emit("father",{
                        long:res.data.length
                    })
                });
            },
            //删除清洗物品
            cut(id){
                axios.get("http://localhost:8080/admin/delete_thing",{
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