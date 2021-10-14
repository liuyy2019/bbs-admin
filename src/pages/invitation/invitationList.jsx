import React from 'react';
import {Table, Card, Breadcrumb, Tooltip, Form, Modal,Tag, Row, Col, Input, Button, Select, message} from 'antd';
import {
    getAllInvitations,
    getAllTypes,
    getListInvitations,
    deleteInvitationById,
} from '../../api/index'
import {Link} from "react-router-dom";
import InvitationRightShow from "./invitationRightShow";
import {ExclamationCircleOutlined} from "@ant-design/icons";


const {Option} = Select;
/* 帖子列表组件 */
class InvitationList extends React.Component{
    formRef = React.createRef();
    constructor(props){
        super(props);
        this.state = {
            data:[],
            isLoading: false,
            pageNum: 1,
            pageSize: 100,
            visible: false,
            type: '',
            values: {},
            typeList: [],/* 帖子类别信息 */
        }
    }

    /* 数据初始化 */
    initValues = () => {
        this.setState({isLoading:true});
        getAllInvitations((data)=>{
            this.setState({
                data: data,
                isLoading: false,
            })
        },error => {
            console.log("error "+error)
        });
    }

    componentWillMount(){
        this.initValues();
        getAllTypes(result => {
            this.setState({
                typeList: result
            })
        })
    }

    /* 显示右侧浮层 */
    showDrawer = (values,type) => {
        this.setState({
            visible: true,
            type: type,
            values: values
        });
    };

    /* 关闭右侧浮层 */
    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    /* 搜索框表单提交 */
    onFinish = values => {
        this.setState({values});
        console.log(values)
        const {pageNum,pageSize} = this.state
        getListInvitations({invitation:values,page:pageNum,size:pageSize},result => {
            console.log(result)
            this.setState({
                data: result
            })
        })
    };

    /* 删除帖子信息 */
    deleteInvitation = (record) => {
        let _this = this
        Modal.confirm({
            icon: <ExclamationCircleOutlined />,
            content: '确定删除当前帖子',
            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                deleteInvitationById(record.id,result => {
                    if (result === true){
                        message.success('帖子删除成功');
                        _this.initValues();
                    }
                })
            },
            onCancel() {
                console.log(record.id);
            },
        });


    }

    render(){
        /* 表格的列 */
        const columns = [
            {   title: '序号', width: 50, align: 'center',
                render:(text,record,index)=>`${index+1}`,
            },
            { title: '发布人', width: 80, dataIndex: 'name', key: 'name',align: "center",
                render: (text,record)=>{
                    return <Link to={{ pathname : '/admin/user',query:{type:'查看',userId:record.issuerId}}}><Tag color="geekblue" key={text}>{text}</Tag></Link>
                }
            },
            { title: '标题', width: 150, dataIndex: 'title', key: 'title',align:'center',
                onCell: () => {
                    return {
                        style: {
                            maxWidth: 15,
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow:'ellipsis',
                            cursor:'pointer'
                        }
                    }
                },
                render: (text,record) => {
                    return <Link to={{ pathname : '/admin/invitation',state:{id:record.id}}}><Tooltip placement="topLeft" title={text}>{text}</Tooltip></Link>;

                }
            },
            { title: '类别', width: 80, dataIndex: 'type', key: 'type',align:'center',
                render: (text) => {
                    return (
                        <Tag color="green" key={text}>{text}</Tag>
                    )
                }
            },
            { title: '访问量', width: 60, dataIndex: 'visitors', key: 'visitors',align:'center',
                render: (text) => {
                    return (
                        <Tag color="geekblue" key={text}>{text}</Tag>
                    )
                }
            },
            { title: '点赞次数', width: 80, dataIndex: 'clicks', key: 'clicks',align:'center',
                render: (text) => {
                    return (
                        <Tag color="geekblue" key={text}>{text}</Tag>
                    )
                }
            },
            { title: '被举报次数', width: 90, dataIndex: 'reports', key: 'reports',align:'center',
                render: (text) => {
                    return (
                        <Tag color="geekblue" key={text}>{text}</Tag>
                    )
                }
            },
            { title: '发布时间',width: 150,  dataIndex: 'date', key: 'date' ,align:'center'},
            { title: '操作', width: 150, dataIndex: '', key: 'x',align:'center',
                render: (value, record) => {
                    return (
                        <div>
                            <Button type={"link"} onClick={() => this.showDrawer(record,'search')} className="operation-sty">查看</Button>
                            <Button type={"link"} onClick={() => this.showDrawer(record,'edit')} className="operation-sty">编辑</Button>
                            <Button type={"link"} onClick={() => this.deleteInvitation(record)} className="operation-sty">删除</Button>
                        </div>
                    );
                },
            },
        ];
        return(
            <div style={{background:'#f0f2f5',height:'100%'}}>
                <Card size="small" style={{height:'20%'}}>
                    <Breadcrumb >
                        <Breadcrumb.Item>帖子管理</Breadcrumb.Item>
                        <Breadcrumb.Item>帖子信息列表</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{marginTop:'10px'}}>
                        <Form ref={this.formRef} name="advanced_search"
                              className="ant-advanced-search-form" onFinish={this.onFinish}
                        >
                            <Row gutter={24}>
                                <Col span={6}>
                                    <Form.Item name="name" label="发布人">
                                        <Input placeholder="发布人" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item name="title" label="标题">
                                        <Input placeholder="支持模糊查询" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item name="type" label="类别">
                                        <Select placeholder="请选择类别">
                                            {
                                                this.state.typeList.map((item,index) => {
                                                    return <Option value={item.type} key={index}>{item.type}</Option>
                                                })
                                            }
                                        </Select>
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
                        columns={columns}
                        loading={this.state.isLoading}
                        dataSource={this.state.data}
                        rowKey="id"
                        scroll={{ y: 230 }}
                        size="middle"
                        // pagination={false}
                    />
                    <InvitationRightShow
                        onClose={this.onClose}
                        visible={this.state.visible}
                        type={this.state.type}
                        values={this.state.values}
                        initValues={this.initValues}
                        typeList={this.state.typeList}
                    />
                </Card>
            </div>
        );
    }

}

export default InvitationList

