/* 仪表板可视化显示数据 */
import React from 'react'
import {Card,Col, Row ,Statistic,List,Typography} from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import Bar from "../../components/echars/bar";
import Pie from "../../components/echars/pie";
import Pie4 from "../../components/echars/pie4";
import {getListInvitationsByVisitors} from "../../api/index";

const grid = 8;
// 水平样式
const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid,
    margin: `0 ${grid}px 0 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : '#ffffff',


    // styles we need to apply on draggables
    ...draggableStyle,
});
const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : '#ffffff',
    display: 'flex',
    padding: grid,
    margin: `0 ${grid}px`,
    overflow: 'auto',
    justifyContent: 'space-between',
});

class Dashboard extends React.Component{

    constructor(props){
        super(props);
        this.state={
            date: new Date().toLocaleString(),
            data: [], /* 帖子数据 */
            statisticList: [
                { id: '1', span: 4, title: '用户总数：75', value: '5', valueStyle: { color: '#3f8600' },prefix: <ArrowUpOutlined />},
                { id: '2', span: 4, title: '登陆用户：10', value: '1', valueStyle: { color: '#cf1322' },prefix: <ArrowDownOutlined />},
                { id: '3', span: 8, title: '当前时间', value: '5', valueStyle: { color: '#3f8600' }},
                { id: '4', span: 4, title: '帖子总数：105', value: '5', valueStyle: { color: '#cf1322' },prefix: <ArrowUpOutlined />},
                { id: '5', span: 4, title: '发帖数量：10', value: '11.28', valueStyle: { color: '#3f8600' },prefix: <ArrowUpOutlined />},
            ],
        }
    }

    componentDidMount() {
        getListInvitationsByVisitors(result => {
            this.setState({
                data:result
            })
        });
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

    reOrder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    onDragEnd = (result) => {
        console.log(result)
        if (!result.destination) {
            return;
        }

        const items = this.reOrder(
            this.state.statisticList,
            result.source.index,
            result.destination.index
        );

        this.setState({
            statisticList: items
        });
    };

    render(){
        const { statisticList } = this.state;
        return(
            <div className="site-card-wrapper">
                <DragDropContext onDragEnd={this.onDragEnd}>
                        <Droppable droppableId="droppable" direction="horizontal">
                            {
                                (provided, snapshot) => (
                                    <div ref={provided.innerRef} {...provided.droppableProps}
                                         style={getListStyle(snapshot.isDraggingOver)}
                                     >
                                        {
                                            statisticList.map((item, index) => (
                                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                                    {(provided2, snapshot2) => (
                                                        <div ref={provided2.innerRef}
                                                             {...provided2.draggableProps}
                                                             {...provided2.dragHandleProps}
                                                             style={getItemStyle(
                                                                 snapshot2.isDragging,
                                                                 provided2.draggableProps.style
                                                             )}
                                                        >
                                                            {
                                                                item.span === 4 ? (
                                                                    <Card>
                                                                        <Statistic
                                                                            title={item.title}
                                                                            value={item.value}
                                                                            precision={2}
                                                                            valueStyle={item.valueStyle}
                                                                            prefix={item.prefix}
                                                                            suffix="%"
                                                                        />
                                                                    </Card>
                                                                ) : (
                                                                    <Card>
                                                                        <h2 style={{textAlign: 'center',margin:'auto'}}>当前时间</h2>
                                                                        <p style={{textAlign: 'center',fontSize:'18px'}}>{this.state.date}</p>
                                                                    </Card>
                                                                )
                                                            }
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))
                                        }
                                        {provided.placeholder}
                                    </div>
                                )
                            }
                        </Droppable>
                </DragDropContext>
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
