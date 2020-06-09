/* 帖子举报列表组件 */
import React from 'react'
import {
    deleteEnumType,
    getListReportInvitations,
    getListReportInvitationsById,
    getListReportUsersById
} from "../../api";
import {Link} from "react-router-dom";
import {Button, Card, Col, Input, Row, Tooltip, Breadcrumb, Form, Table, Tag, Modal, message} from "antd";
import ReportInvitationRightShow from "./reportInvitationRightShow";
import ReportInvitationTimeline from "./reportInvitationTimeline";
import ReportUserTimeline from "../reportUser/reportUserTimeline";
import {ExclamationCircleOutlined} from "@ant-design/icons";



class ReportInvitationList extends React.Component {
    formRef = React.createRef();
    constructor(props){
        super(props);
        this.state = {
            data:[],
            pageNum: 1,
            pageSize: 100,
            visible: false,
            isLoading:false,
            type: '',
            values: {},
            visibleTimeline: false,/*默认不显示时间轴*/
            TimelineValues:[],/*时间轴数据*/
        }
    }

    /* 数据初始化*/
    initValues = () => {
        const {pageNum,pageSize} = this.state;
        this.setState({isLoading:true});
        getListReportInvitations({reportInvitation:{},page:pageNum,size:pageSize},result => {
            console.log(result)
            this.setState({
                data: result,
                isLoading:false,
            })
        })
    };

    componentWillMount(){
        this.initValues();
    }

    /* 搜索框表单提交 */
    onFinish = values => {
        this.setState({values});
        console.log(values)
        const {pageNum,pageSize} = this.state
        getListReportInvitations({reportInvitation:values,page:pageNum,size:pageSize},result => {
            console.log(result)
            this.setState({
                data: result
            })
        })
    };

    /* 显示右侧浮层 */
    showDrawer = (values,type) => {
        this.setState({
            visible: true,
            type: type,
            values: values
        });
        console.log(this.state)
    };

    showTimeline =(record)=>{
        this.setState({
            visibleTimeline: true,
        });
        getListReportInvitationsById({invitationId: record.invitationId},result => {
            this.setState({
                TimelineValues: result
            })
        })
    };

    /* 关闭右侧浮层 */
    onClose = () => {
        this.setState({
            visible: false,
        });
        this.initValues();
    };

    onCloseTimeline = () => {
        this.setState({
            visibleTimeline: false,
        });
    };
    deleteUser = () => {
        Modal.confirm({
            icon: <ExclamationCircleOutlined />,
            content: '确定删除帖子举报信息',
            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                message.success('帖子举报信息删除成功');
            },
        });
    }

    operatorRender = (value, record) => {
        return (
            <div>
                {/*<Link style={styles.removeBtn} to={{ pathname : '/admin/user',query:{type:'查看',record:record}}}>查看</Link>
                <Link style={styles.removeBtn} to={{ pathname : '/admin/user',query:{type:'编辑',record:record}}}>编辑</Link>*/}
                <a onClick={() => this.showDrawer(record,'search')} style={styles.removeBtn}>查看</a>
                <a onClick={() => this.showDrawer(record,'edit')} style={styles.removeBtn}>编辑</a>
                <a onClick={() => this.deleteUser(record)} style={styles.removeBtn}>删除</a>
            </div>
        );
    }
    statusRender = (text) => {
        if (text === "0") {
            return <Tag color="geekblue" key={text}>0 - 注销</Tag>
        } else if (text === "1") {
            return <Tag color="geekblue" key={text}>1 - 正常</Tag>
        } else if (text === "2") {
            return <Tag color="geekblue" key={text}>2 - 停用</Tag>
        }
    }
    levelRender = (text) => {
        if (text === "0") {
            return <Tag color="geekblue" key={text}>0 - 管理员</Tag>
        } else if (text === "1") {
            return <Tag color="geekblue" key={text}>1 - 超级管理员</Tag>
        }
    }

    render(){
        return(
            <div style={{background:'#f0f2f5',height:'100%'}}>
                <Card size="small" style={{height:'20%'}}>
                    <Breadcrumb >
                        <Breadcrumb.Item>举报管理</Breadcrumb.Item>
                        <Breadcrumb.Item>帖子举报记录列表</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{marginTop:'10px'}}>
                        <Form ref={this.formRef} name="advanced_search"
                              className="ant-advanced-search-form" onFinish={this.onFinish}
                        >
                            <Row gutter={24}>
                                <Col span={6}>
                                    <Form.Item name="collector" label="用户名">
                                        <Input placeholder="用户名" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item name="title" label="帖子标题">
                                        <Input placeholder="帖子标题" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item name="type" label="发帖人">
                                        <Input placeholder="发帖人" />
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
                    <Table rowKey="id" loading={this.state.isLoading}
                           dataSource={this.state.data} scroll={{ y: 249,x: 1000  }} size="middle" pagination={true}>
                        <Table.Column title= '序号' width= {50} align= 'center'fixed= 'left' render={(text,record,index)=>`${index+1}`}/>
                        <Table.Column title= '用户名' width= {100} align= 'center' dataIndex= 'reportName' ellipsis={true} render={
                            (text,record)=>{
                                return <Link to={{ pathname : '/admin/user',query:{type:'查看',userId:record.reportId}}}><Tag color="geekblue" key={text}>{text}</Tag></Link>
                            }
                        }/>
                        <Table.Column title= '举报帖子' width= {150} align= 'center' dataIndex= 'title'/>
                        <Table.Column title= '举报原因' width= {150} align= 'center' dataIndex= 'reportReason'render={(text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>} />
                        <Table.Column title= '举报时间' width= {150} align= 'center' dataIndex= 'createTime' style={styles.titleStyles} render={(text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>}/>
                        <Table.Column title= '发帖人' width= {100} align= 'center' dataIndex= 'issuer' render={
                            (text,record)=>{
                                return <Link to={{ pathname : '/admin/user',query:{type:'查看',userId:record.issuerId}}}><Tag color="geekblue" key={text}>{text}</Tag></Link>
                            }
                        }/>
                        <Table.Column title= '时间轴' width= {100} align= 'center' dataIndex= 'updateTime'
                              render={
                                  (text,record) => <a onClick={() => this.showTimeline(record)}>时间轴</a>
                              }
                        />
                        <Table.Column title= '状态' width= {100} align= 'center' dataIndex= 'status' render={this.statusRender}/>
                        <Table.Column title= '操作' width= {150} fixed= 'right' align= 'center' dataIndex= '' render={this.operatorRender}/>
                    </Table>
                    <ReportInvitationRightShow
                        onClose={this.onClose}
                        visible={this.state.visible}
                        type={this.state.type}
                        values={this.state.values}
                        initValues={this.initValues}
                    />
                    <ReportInvitationTimeline
                        onCloseTimeline={this.onCloseTimeline}
                        visibleTimeline={this.state.visibleTimeline}
                        TimelineValues={this.state.TimelineValues}
                    />
                    {/*<div style={{position:"absolute",right:"10px",bottom:'20px'}}>
                        <Pagination
                            showSizeChanger
                            defaultCurrent={1}
                            total={1}
                        />
                    </div>*/}
                </Card>
            </div>
        );
    }
}

export default ReportInvitationList

const styles = {
    removeBtn: {
        marginLeft: 8,
    },
}