<template>
    <div id="information">
        <el-form style="width:85%;margin:0 auto;padding:50px;">
            <el-form-item label="清洗物件">
                <el-input :value="thing_list.goods" disabled/>
            </el-form-item>
            <el-form-item label="清洗方式">
                <el-input :value="thing_list.ways" disabled/>
            </el-form-item>
            <el-form-item label="取件时间">
                <el-input :value="thing_list.delivery" disabled/>
            </el-form-item>
            <el-form-item label="取件地址">
                <el-input :value="thing_list.addr" disabled/>
            </el-form-item>
            <el-form-item label="手机号码">
                <el-input :value="thing_list.reservedPhone" disabled/>
            </el-form-item>
            <el-form-item label="备注信息">
                <el-input disabled type="textarea" :value="thing_list.desc"/>
            </el-form-item> 
            <el-button type="primary" @click="secondChild">下一步</el-button>
        </el-form>
    </div>
</template>

<script>
import {useRoute} from 'vue-router'
    export default {
        name:"GenerateComponent",
        data(){
            return{
                thing_list:'',//清洗的物件
            }
        },
        mounted(){
            this.thing_list=JSON.parse(useRoute().query.thing);
            sessionStorage.setItem("thing_name",this.thing_list.goods);
            sessionStorage.setItem("clean_ways",this.thing_list.ways);
        },
		methods:{
            secondChild(){
                this.$emit('parent');
            }
        }
       
    }
</script>

<style>

</style>