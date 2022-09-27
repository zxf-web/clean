<template>
    <div id="statistic" style="margin-top:60px;padding:30px;display:flex;justify-content:space-around;flex-wrap:wrap;">
        <div ref="pieCharts" id="main1" style="width:500px;height:400px;box-shadow:1px 1px 5px 1px #eee;border-radius:15px;overflow:hidden;padding:10px;"></div>
        <div ref="histogram" id="main2" style="width:550px;height:400px;box-shadow:1px 1px 5px 1px #eee;border-radius:15px;overflow:hidden;padding:10px;"></div>
        <div ref="lineCharts" id="main3" style="width:1200px;height:400px;box-shadow:1px 1px 5px 1px #eee;border-radius:15px;overflow:hidden;padding:10px;"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
import axios from 'axios'
    export default {
        name:'StatisticComponent',
        data(){
            return{
                pieTheme:'null',
                
                
            }
        },
        mounted(){
            //会员统计 
            this.memberStatistic();
           
            //清洗物件类型统计
            this.thingStatistic();

            //订单销售额数据统计
            this.orderStatistic();
        },
        methods:{
            //会员统计数据
            memberStatistic(){
                axios.get('http://localhost:8080/statistic/member_statistic').then(res=>{
                    //console.log(Object.values(res.data[0]));
                    let len=Object.values(res.data[0]).length;
                    var member_statistic=[
                        { value: 0, name: '普通会员' },
                        { value: 0, name: '黄金会员' },
                        { value: 0, name: '白金会员' },
                        { value: 0, name: '紫金会员' }
                    ];
                    for(let i=0;i<len;i++){
                        member_statistic[i].value=Object.values(res.data[0])[i];
                    }
                    this.memberPie(member_statistic);
                })
            },
            //会员统计
            memberPie(nums){
                // 基于准备好的dom，初始化echarts实例
                const main=this.$refs.pieCharts;
                const myChart=echarts.init(main,this.pieTheme);

                // 指定图表的配置项和数据
                const option = {
                    title: {
                        text: '平台会员统计图',
                        subtext: 'Member Statistic',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left'
                    },
                    series: [
                        {
                        name: 'Access From',
                        type: 'pie',
                        radius: '50%',
                        data:nums,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                                
                            }
                        },
                        labelLine:{
                            show:true,
                        }
                        }
                    ]
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            },


            //清洗物件种类数据统计
            thingStatistic(){
                axios.get("http://localhost:8080/statistic/thing_statistic").then(res=>{
                    //console.log(Object.values(res.data[0]));
                    this.thingHistogram(Object.values(res.data[0]));
                })
            },
            //清洗物件价格区间统计
            thingHistogram(nums){
                // 基于准备好的dom，初始化echarts实例
                const main=this.$refs.histogram ;
                const myChart=echarts.init(main);

                // 指定图表的配置项和数据
                const option = {
                    title: {
                    text: '各类型物件数量'
                    },
                    tooltip: {},
                    legend: {
                    data: ['数量']
                    },
                    xAxis: {
                    data: ['衣物', '鞋靴', '家纺', '奢侈品']
                    },
                    yAxis: {},
                    series: [
                    {
                        name: '数量',
                        type: 'bar',
                        data: nums,
                        itemStyle:{
                            normal:{
                                label:{
                                    show:true, //自动显示数据 ，无需鼠标滑动才显示数据
                                }
                            }
                        }
                    }
                    ]
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            },


            //订单下单额数据
            orderStatistic(){
                axios.get("http://localhost:8080/statistic/order_statistic").then(res=>{
                    let arr=res.data;
                    for(let i=0;i<arr.length-1;i++){
                        for(let j=0;j<arr.length-i-1;j++){
                            let name=Object.keys(arr[j])[0];
                            let name2=Object.keys(arr[j+1])[0];
                            if(arr[j][name]<arr[j+1][name2]){
                                let temp=arr[j];
                                arr[j]=arr[j+1];
                                arr[j+1]=temp;
                            }

                        }
                    }
                    let ten=arr.slice(0,10);
                    let names=[];
                    let values=[];
                    for(let item of ten){
                        names.push(Object.keys(item)[0]);
                        values.push(Object.values(item)[0]);
                    }
                    this.orderLine(names,values);
                })
            },
            //订单下单额统计
            orderLine(names,values){
                // 基于准备好的dom，初始化echarts实例
                const main=this.$refs.lineCharts ;
                const myChart=echarts.init(main);

                // 指定图表的配置项和数据
                const option = {
                    title: {
                        text: '前十下单额排名'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {},
                    toolbox: {
                        show: true,
                        feature: {
                            dataView: { readOnly: false },
                            magicType: { type: [ 'bar','line'] },
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: names
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '数量',
                            type: 'line',
                            data: values,
                            markPoint: {
                                data: [
                                    { type: 'max', name: 'Max' },
                                    { type: 'min', name: 'Min' }
                                ]
                            },
                            markLine: {
                                data: [{ type: 'average', name: 'Avg' }]
                            },
                            itemStyle:{
                                normal:{
                                    label:{
                                        show:true, //自动显示数据 ，无需鼠标滑动才显示数据
                                    }
                                }
                            }
                        }
                        
                    ]
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>