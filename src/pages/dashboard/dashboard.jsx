/* 仪表板可视化显示数据 */
import React from 'react'
import {Card,Col, Row ,Statistic,List,Typography} from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import Bar from "../../components/echars/bar";
import Pie from "../../components/echars/pie";
import Pie4 from "../../components/echars/pie4";
import {getListInvitationsByVisitors} from "../../api/index";

class Dashboard extends React.Component{

    constructor(props){
        super(props);
        this.state={
            date: new Date().toLocaleString(),
            data: [], /* 帖子数据 */
        }
    }

    componentWillMount() {
        getListInvitationsByVisitors(result => {
            this.setState({
                data:result
            })
        })
    }

    componentDidMount() {
        this.timer = setInterval(()=>this.tick(),1000)
    //    参考链接：https://blog.csdn.net/MiemieWan/article/details/79413157
    //    https://reactjs.bootcss.com/docs/state-and-lifecycle.html
    }

    componentWillUnmount() {
        clearInterval(this.timer);

    }


    tick = () => {
        this.setState({
            date :  new Date().toLocaleString()
        })
    };
    render(){
        /*const data = [
            'Racing car sprays burning fuel into crowd.',
            'Japanese princess to wed commoner.',
            'Australian walks 100km after outback crash.',
            'Man charged over missing wedding girl.',
            'Los Angeles battles huge wildfires.',
            'Los Angeles battles huge wildfires.',
        ];*/
        return(
            <div style={{//padding:15,//backgroundImage:`url(${img})`
                }}
                 className="site-card-wrapper"
            >
                <Row gutter={[16,16]} style={{margin:'10px'}}>
                    <Col span={4}>
                        <Card>
                            <Statistic
                                title="用户总数：75"
                                value={5}
                                precision={2}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<ArrowUpOutlined />}
                                suffix="%"
                            />
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card>
                            <Statistic
                                title="登陆用户：10"
                                value={1}
                                precision={2}
                                valueStyle={{ color: '#cf1322' }}
                                prefix={<ArrowDownOutlined />}
                                suffix="%"
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <h2 style={{textAlign: 'center',margin:'auto'}}>当前时间</h2>
                            {/*<p style={{textAlign: 'center',fontSize:'18px'}}>{new Date().toLocaleString()}</p>*/}
                            <p style={{textAlign: 'center',fontSize:'18px'}}>{this.state.date}</p>
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card>
                            <Statistic
                                title="帖子总数：105"
                                value={5}
                                precision={2}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<ArrowUpOutlined />}
                                suffix="%"
                            />
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card>
                            <Statistic
                                title="发帖数量：10"
                                value={11.28}
                                precision={2}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<ArrowUpOutlined />}
                                suffix="%"
                            />
                        </Card>
                    </Col>
                </Row>
                <Row gutter={[16,16]} style={{margin:'10px'}}>
                    <Col span={12}>
                        <Card style={{background:"#00000000"}} >
                            <Bar />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card style={{background:"#00000000"}}>
                            <Pie/>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={[16,16]} style={{margin:'10px'}}>
                    <Col span={12}>
                        <Card >
                            <Pie4/>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <List
                            header={<div>今日热帖</div>}
                            bordered
                            dataSource={this.state.data}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                         description={<div><Typography.Text mark>[{item.type}]</Typography.Text> {item.title}</div>}
                                    />
                                    <div>{item.visitors}</div>
                                </List.Item>
                            )}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Dashboard
