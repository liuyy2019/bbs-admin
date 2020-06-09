import React from 'react'
import ReactEcharts from 'echarts-for-react';

class Pie4 extends React.Component{

    getOption = () => {
        return {
            title: {
                text: '帖子类别数占比',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            // legend: {
            //     // left: 'center',
            //     // top: 'bottom',
            //     orient: 'vertical',
            //     left: 'left',
            //     data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
            // },
            toolbox: {
                show: true,
                feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: false},
                    magicType: {
                        show: true,
                        type: ['pie', 'funnel']
                    },
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            series: [
                {
                    name: '面积模式',
                    type: 'pie',
                    radius: [30, 110],
                    // center: ['25%', '50%'],
                    center: ['50%', '50%'],
                    roseType: 'area',
                    data: [
                        {value: 10, name: '娱乐'},
                        {value: 5, name: '生活'},
                        {value: 15, name: '技术'},
                        {value: 25, name: '编程'},
                        {value: 18, name: '小技巧'},
                        {value: 25, name: '电影'},
                        {value: 30, name: '音乐'},
                        {value: 20, name: '科技'}
                    ]
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

export default Pie4