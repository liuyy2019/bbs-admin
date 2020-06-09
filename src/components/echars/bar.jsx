import React from 'react'
import ReactEcharts from 'echarts-for-react';

class Bar extends React.Component{

    GetDateStr= (AddDayCount) =>{
        let dd = new Date();
        dd.setDate(dd.getDate()-AddDayCount);//获取AddDayCount天后的日期
        // var y = dd.getFullYear();
        let m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0
        let d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0
        return m+"-"+d;
    };



    getDate = () => {
        let dateArray = [];
        for (let i = 0; i < 7; i++) {
            dateArray.unshift(this.GetDateStr(i));
        };
        return dateArray;
    }




    getOption = () => {
        return {
            title: {
                text: '用户数量',// 主标题文本，支持使用 \n 换行。
                textStyle: {
                    color: 'red', // 主标题文字的颜色。
                },
                left: 'left',
            },
            tooltip: {
                trigger: 'axis', // 触发类型：坐标轴触发，
            },
            legend: {
                left: 'right',
                data: ['注册用户', '新增用户', '注销用户',] //图例的数据数组
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                splitLine:{
                    lineStyle: {
                        color: ['#aaa', '#ddd'],
                        type : 'dotted',
                    }
                },

                // data: ['5-10', '5/11', '5/12', '5/13', '5/14', '5/15', this.GetDateStr(0)]
                data: this.getDate()
            },
            yAxis: {
                type: 'value',//数值轴，适用于连续数据。
                axisLine: {
                    show: false,//是否显示坐标轴轴线。
                },
                axisTick: {
                    show: false, //是否显示坐标轴刻度。
                },
                splitLine: { //是否显示分隔线。默认数值轴显示，类目轴不显示。
                    show: true,
                    lineStyle: {
                        type: 'dotted',// 分割线的样式
                        color: 'aqua',// 分割线的颜色
                    },
                }
            },
            series: [ //系列列表。每个系列通过 type 决定自己的图表类型
                {
                    name: '注册用户',// 系列名称，用于tooltip的显示，legend 的图例筛选
                    type: 'line', //
                    stack: '总量',
                    smooth: true,
                    data: [20, 22, 27, 42, 48, 45, 54]
                },
                {
                    name: '注销用户',
                    type: 'line',
                    stack: '总量',
                    smooth: true,
                    data: [3, 8, 5, 3, 9, 6, 1]
                },
                {
                    name: '新增用户',
                    type: 'line',
                    stack: '总量',
                    smooth: true,
                    data: [5, 15, 20, 15, 19, 3, 10]
                }
            ]
        };
    }
    render(){
        return(
            <ReactEcharts option={this.getOption()} />
        )
    }
}

export default Bar