import React from 'react';
import {Table, Card, Form, Breadcrumb, Tooltip, Row, Col, Input, Button, Tag,} from 'antd';
import {getAllAnswers,getListAnswers} from "../../api";
import {Link} from "react-router-dom";


/*
const columns = [
    {   title: '序号',
        width: 50,
        align: 'center',
        render:(text,record,index)=>`${index+1}`,
    },
    { title: '发布人', dataIndex: 'name', key: 'name',align: "center" },
    { title: '问题内容', dataIndex: 'content', key: 'content' ,align:'center',// 文本溢出...显示
        onCell: () => {
            return {
              style: {
                maxWidth: 150,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow:'ellipsis',
                cursor:'pointer'
              }
            }
        },
        render: (text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
    },
    { title: '发布时间', dataIndex: 'createdate', key: 'createdate',align:'center' },
    { title: '最新回复时间', dataIndex: 'updatetime', key: 'updatetime',align:'center' },
    { title: '状态', dataIndex: 'status', key: 'status',align:'center' },
    { title: '回复人数', dataIndex: 'reply', key: 'reply',align:'center' },
    {
        title: '操作', dataIndex: '', key: 'x',align:'center',
        render: (value, record) => {
            return (
                <div>
                    <Link style={styles.removeBtn} to={{ pathname : '/admin/user',query:{type:'查看',record:record}}}>查看</Link>
                    <Link style={styles.removeBtn} to={{ pathname : '/admin/user',query:{type:'编辑',record:record}}}>编辑</Link>
                    <a onClick={() => this.deleteUser(record)} style={styles.removeBtn}>删除</a>
                </div>
            );
        },
    },
];
*/


class AnswerList extends React.Component{
    formRef = React.createRef();
    constructor(props){
        super(props);
        this.state = {
            data:[],
            pageNum: 1,
            pageSize: 5,
        }
    }

    componentWillMount(){
        getAllAnswers((data)=>{
            console.log(data);
            this.setState({
                data: data,
            })
        },error => {
            console.log("error "+error)
        });

    }
    /* 搜索框表单提交 */
    onFinish = values => {
        this.setState({values});
        console.log(values)
        const {pageNum,pageSize} = this.state
        getListAnswers({answer:values,page:pageNum,size:pageSize},result => {
            console.log(result)
            this.setState({
                data: result
            })
        })
    };
    operatorRender = (value,record,index) => {
        return (
            <div>
                <Link style={styles.removeBtn} to={{ pathname : '/admin/user',query:{type:'查看',record:record}}}>查看</Link>
                <Link style={styles.removeBtn} to={{ pathname : '/admin/user',query:{type:'编辑',record:record}}}>编辑</Link>
                <Button type={"link"} onClick={() => this.deleteUser(record)} style={styles.removeBtn}>删除</Button>
            </div>
        );
    }
    statusRender = (text) => {
        if (text === 0){
            return <Tag color="geekblue" key={text}>0 - 屏蔽</Tag>
        } else if (text === 1) {
            return <Tag color="geekblue" key={text}>1 - 正常</Tag>
        }
    }
    contentCell = () => {
        return {
            style: {
                maxWidth: 150,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow:'ellipsis',
                cursor:'pointer'
            }
        }
    }

    render(){
        return(
            <div style={{background:'#f0f2f5',height:'100%'}}>
                <Card size="small" style={{height:'20%'}}>
                    <Breadcrumb >
                        <Breadcrumb.Item>帖子管理</Breadcrumb.Item>
                        <Breadcrumb.Item>问答信息列表</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{marginTop:'10px'}}>
                        <Form ref={this.formRef} name="advanced_search"
                              className="ant-advanced-search-form" onFinish={this.onFinish}
                        >
                            <Row gutter={24}>
                                <Col span={6}>
                                    <Form.Item name="name" label="姓名">
                                        <Input placeholder="placeholder" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item name="sex" label="性别">
                                        <Input placeholder="placeholder" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item name="test" label="年龄">
                                        <Input placeholder="placeholder" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <div style={{float:'right'}}>
                                        <Button type="primary" style={{ marginRight: '8px' }} htmlType="submit">查询</Button>
                                        <Button type={"primary"} onClick={() => {this.formRef.current.resetFields();}}>
                                            清除
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Card>
                <Card size="small" style={{marginTop:'15px',height:'76%'}}>
                    <Table
                        dataSource={this.state.data}
                        scroll={{ y: 230 }}
                        size="middle"
                        rowKey="id"
                        pagination={false}
                    >
                        <Table.Column title= '序号' width= {50} align= 'center'fixed= 'left' render={(text,record,index)=>`${index+1}`}/>
                        <Table.Column title= '用户名' width= {100} align= 'center' dataIndex= 'name' ellipsis={true}/>
                        <Table.Column title= '内容' width= {150} align= 'center' dataIndex= 'content' onCell={this.contentCell} render={(text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>}/>
                        <Table.Column title= '创建时间' width= {150} align= 'center' dataIndex= 'createdate'/>
                        <Table.Column title= '更新时间' width= {150} align= 'center' dataIndex= 'updatetime'/>
                        <Table.Column title= '状态' width= {100} align= 'center' dataIndex= 'status'render={this.statusRender}/>
                        <Table.Column title= '回复数' width= {70} align= 'center' dataIndex= 'reply'/>
                        <Table.Column title= '操作' width= {200} align= 'center' dataIndex= '' render={this.operatorRender}/>
                    </Table>
                </Card>
            </div>
        );
    }

}

export default AnswerList

const styles = {
    removeBtn: {
        marginLeft: 8,
    },
}
