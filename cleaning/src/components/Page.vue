<template>
    <div id="page" v-show="flag">
        <ul style="display:flex;">
            <li @click="prePage">&lt;&lt;</li>
            <li :class="{pageActive:isActive[index-1]}" v-for="index in pages" :key="index" @click="pageNum(index)">{{index}}</li>
            <li @click="nextPage">&gt;&gt;</li>
        </ul>
    </div>
</template>
<script>

export default{
    name:'PageComponent',
    props:["pages","flag"],
    data(){
        return{
            see:'',
            isActive:[true]//定义数组，控制分页按钮高亮状态
        }
    },
    methods:{
        pageNum(index){
            this.isActive=[];
            this.isActive[index-1]=true;
            this.$emit("mychange",index);
        },

        prePage(){
            //获取当前页面
            //1.通过高亮得到，遍历数组，找到其中true所对应的下标
            var num=this.isActive.findIndex(function(item){
                return item===true;
            })
            this.isActive=[];
            if(num<1){
                num=1;
            }
            this.isActive[num-1]=true;
            
            this.$emit("mychange",num);
        },


        nextPage(){
            //获取当前页面
            //1.通过高亮得到，遍历数组，找到其中true所对应的下标
            var num=this.isActive.findIndex(function(item){
                return item===true;
            })
            //下一页
            num++;
            this.isActive=[];
            if(num>=this.pages){
                num=this.pages-1;
            }
            this.isActive[num]=true;
            
            this.$emit("mychange",num+1);
        }
    }
}
</script>
<style>
.pageActive{
    background:#6785FF !important;
}
div#page ul>li{
    width:40px;
    background-color:transparent;
    border:1px solid #eee;
}
</style>