import React from 'react'
import ReactEcharts from 'echarts-for-react';

class Pie extends React.Component{

    getOption = () => {
        return {
            title: {
                text: '用户年龄段',
                // subtext: '纯属虚构',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['20以下', '20-30', '30-40', '40-50', '50以上']
            },
            series: [
                {
                    name: '年龄段',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [
                        {value: 20, name: '20以下'},
                        {value: 35, name: '20-30'},
                        {value: 13, name: '30-40'},
                        {value: 20, name: '40-50'},
                        {value: 5, name: '50以上'}
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
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

export default Pie