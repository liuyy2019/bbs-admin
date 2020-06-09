/* 用户关注信息组件 */
import React from 'react';
import {Table, Card, Breadcrumb, Form, Tooltip, Row, Col, Input, Button, Tag, Modal, message, Select,} from 'antd';
import {deleteAttentionById, getAllAttentions, getCodeByType, getListAdmins, getListAttentions} from "../../api";
import {Link} from "react-router-dom";
import AttentionRightShow from "./attentionRightShow";
import AttentionTimeline from "./attentionTimeline";


class AttentionList extends React.Component{
    formRef = React.createRef();
    constructor(props){
        super(props);
        this.state = {
            data:[],
            pageNum: 1,
            pageSize: 100,
            visible: false,/* 新建右测栏 */
            type: 'add',
            values:{},
            attentionStatus: [],/*关注用户状态*/
            visibleTimeline: false,
        }
    }

    initValues =() => {
        getAllAttentions((data)=>{
            this.setState({
                data: data,
            })
        },error => {
            console.log("error "+error)
        });
    };
    componentWillMount(){
        this.initValues();
        getCodeByType({codeType:"ATTENTION_STATUS"},result => {
            this.setState({
                attentionStatus: result
            })
        })
    }

    showDrawer = (values,type) => {
        this.setState({
            visible: true,
            type: type,
            values: values
        });
        console.log(this.state)
    };

    showTimeline = (values) => {
        this.setState({
            values: values,
            visibleTimeline: true
        })
    }
    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    onCloseTimeline = () => {
        this.setState({
            visibleTimeline: false,
        });
    }

    /* 删除管理员*/
    deleteAttention = (record) => {
        Modal.confirm({
            title:`确认删除`,
            onOk:  ()=>{
                deleteAttentionById(record.id,result => {
                    if (result.status === 200) {
                        message.success('删除成功');
                        this.initValues();
                    }
                });
            }
        });
    }

    onFinish = values => {
        this.setState({values});
        const {pageNum,pageSize} = this.state
        console.log(values)
        getListAttentions({attention:values,page:pageNum,size:pageSize},result => {
            console.log(result)
            this.setState({
                data: result
            })
        })
    };

    render(){

        const columns = [
            {   title: '序号',
                width: 50,
                align: 'center',
                render:(text,record,index)=>`${index+1}`,
            },
            { title: '用户名',width:80, dataIndex: 'username', key: 'username',align: "center",
                render:(text,record,index)=>{
                    return (
                        <Link to={{ pathname : '/admin/user',query:{type:'查看',userId:record.userId}}}>
                            <Tag color="geekblue" key={text}>{text}</Tag>
                        </Link>
                    )
                }
            },
            { title: '关注用户', width:80, dataIndex: 'noticer', key: 'noticer',align:'center',
                render:(text,record)=>{
                    return (
                        <Link to={{ pathname : '/admin/user',query:{type:'查看',userId:record.noticerId}}}>
                            <Tag color="geekblue" key={text}>{text}</Tag>
                        </Link>
                    )
                }
            },
            { title: '关注用户性别', width: 120,dataIndex: 'sex', key: 'usersex' ,align:'center',// 文本溢出...显示
                onCell: () => {
                    return {
                        style: {
                            maxWidth: 15,
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow:'ellipsis',
                            cursor:'pointer',
                        }
                    }
                },
                render: (text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
            },
            { title: '关注用户手机号', width:150, dataIndex: 'phone', key: 'phone',align:'center' },
            { title: '关注时间',width:130,  dataIndex: 'createtime', key: 'createtime',align:'center',
                render: (text,record) => {
                    return <a onClick={() => this.showTimeline(record)}>{text}</a>
                }
            },
            { title: '状态', width:100, dataIndex: 'status', key: 'status',align:'center',
                render: (text) => {
                    if (text === "1"){
                        return <Tag color="geekblue" key={text}>1 - 正常关注</Tag>
                    } else if (text === "0") {
                        return <Tag color="geekblue" key={text}>0 - 取消关注</Tag>
                    }
                }
            },
            {
                title: '操作', width:150, dataIndex: '', key: 'x',align:'center',
                render: (value, record) => {
                    return (
                        <div>
                            {/*<Link style={styles.removeBtn} to={{ pathname : '/admin/user',query:{type:'查看',record:record}}}>查看</Link>
                    <Link style={styles.removeBtn} to={{ pathname : '/admin/user',query:{type:'编辑',record:record}}}>编辑</Link>*/}
                            <a onClick={() => this.showDrawer(record,'search')} style={styles.removeBtn}>查看</a>
                            <a onClick={() => this.showDrawer(record,'edit')} style={styles.removeBtn}>编辑</a>
                            <a onClick={() => this.deleteAttention(record)} style={styles.removeBtn}>删除</a>
                        </div>
                    );
                },
            },
        ];

        return(
            <div style={{background:'#f0f2f5',height:'100%'}}>
                <Card size="small" style={{height:'20%'}}>
                    <Breadcrumb >
                        <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                        <Breadcrumb.Item>关注信息列表</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{marginTop:'10px'}}>
                        <Form ref={this.formRef} name="advanced_search"
                              className="ant-advanced-search-form" onFinish={this.onFinish}
                        >
                            <Row gutter={24}>
                                <Col span={6}>
                                    <Form.Item name="username" label="用户名">
                                        <Input placeholder="用户名" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item name="noticer" label="关注用户">
                                        <Input placeholder="请输入被关注用户名" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item name="status" label="状态">
                                        <Select placeholder="请选择账号状态">
                                            {
                                                this.state.attentionStatus.map(item => {
                                                    return <option value={item.codeName}>{item.codeName} - {item.description}</option>
                                                })
                                            }
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <div style={{float:'right'}}>
                                        <Button type="primary" style={{ marginRight: '8px' }} htmlType="submit">Search</Button>
                                        <Button type={"primary"} onClick={() => {this.formRef.current.resetFields();}}>
                                            Clear
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Card>
                <Card size="small" style={{marginTop:'15px',height:'76%'}}>
                    <Table
                        columns={columns}
                        dataSource={this.state.data}
                        scroll={{ y: 230 }}
                        size="middle"
                    />
                    <AttentionRightShow
                        onClose={this.onClose}
                        visible={this.state.visible}
                        type={this.state.type}
                        values={this.state.values}
                        initValues={this.initValues}
                        attentionStatus={this.state.attentionStatus}
                    />
                    <AttentionTimeline
                        values={this.state.values}
                        visibleTimeline={this.state.visibleTimeline}
                        onCloseTimeline={this.onCloseTimeline}
                    />
                </Card>
            </div>
        );
    }

}

export default AttentionList

const styles = {
    removeBtn: {
        marginLeft: 8,
    },
}