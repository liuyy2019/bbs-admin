/**
 * 1、帖子举报组件页面
 */
import React from 'react'
import {
    getListReportInvitations,
    getListReportInvitationsById,
    updateReportInvitation
} from "../../api";
import {Link} from "react-router-dom";
import {Button, Card, Col, Input, Row, Breadcrumb, Form, Pagination,Table, Tag, Modal, message} from "antd";
import ReportInvitationRightShow from "./reportInvitationRightShow";
import ReportInvitationTimeline from "./reportInvitationTimeline";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import util from "../../util/util";
import moment from 'moment'

const FormItem = Form.Item

class ReportInvitationList extends React.Component {
    formRef = React.createRef();
    constructor(props){
        super(props);
        this.state = {
            dataList:[],
            pageNum: 1,
            pageSize: 100,
            visible: false,
            isLoading:false,
            visibleTimeline: false,/*默认不显示时间轴*/
            type: 'detail',
            searchValues: {},
            form: {
                formValue: {},
                selectLists: {
                    STATUS: [
                        {codeName: "0" ,description: "注销"},
                        {codeName: "1" ,description: "正常"},
                        {codeName: "2" ,description: "停用"},
                    ]
                },
            },
            TimelineValues:[],/*时间轴数据*/
        }
    }

    /* 数据初始化*/
    initValues = () => {
        this.setState({isLoading:true});
        const {pageNum,pageSize} = this.state;
        getListReportInvitations({reportInvitation:{},page:pageNum,size:pageSize},result => {
            this.setState({
                dataList: result,
                isLoading:false,
            })
        })
    };

    componentDidMount(){
        this.initValues();
    }

    /* 搜索框表单提交 */
    onFinish = values => {
        this.setState({searchValues:values,isLoading:true});
        const {pageNum,pageSize} = this.state
        getListReportInvitations({reportInvitation:values,page:pageNum,size:pageSize},result => {
            this.setState({
                dataList: result,
                isLoading:false,
            })
        })
    };

    /* 显示右侧浮层 */
    showDrawer = (values,type) => {
        const {form} = this.state
        form.formValue = {
            ...values,
            createTime: moment(values.createTime,util.dateFormat)
        }
        this.setState({
            visible: true,
            type,
            form
        });
    };

    onFormChange = (values) => {
        const {form} = this.state
        form.formValue = {
            ...values,
        }
        this.setState({
            form
        })
    }

    showTimeline =(record)=>{
        getListReportInvitationsById({invitationId: record.invitationId},result => {
            this.setState({
                visibleTimeline: true,
                TimelineValues: result
            })
        })
    };

    /* 关闭右侧浮层 */
    onClose = (type) => {
        type === 'timeLine' ? this.setState({visibleTimeline: false}) :
            this.setState({visible: false})
    };

    // 更新信息
    updateReportInvitation = () => {
        const {formValue} = this.state.form
        const param = {
            ...formValue,
            createTime: formValue.createTime.format(util.dateFormat)
        }
        updateReportInvitation(param,(result)=>{
            if (result){
                message.success('帖子举报信息修改成功！');
                this.initValues();
                this.onClose()
            }
        })

    }

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
                <a onClick={() => this.showDrawer(record,'detail')} style={styles.removeBtn}>查看</a>
                <a onClick={() => this.showDrawer(record,'edit')} style={styles.removeBtn}>编辑</a>
                <a onClick={() => this.deleteUser(record)} style={styles.removeBtn}>删除</a>
            </div>
        );
    }

    render(){
        const {dataList,isLoading,type,visible,form} = this.state;
        const title = [util.titlePrefix[type],'帖子举报信息'].join('')
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
                                    <FormItem name="collector" label="用户名">
                                        <Input placeholder="用户名" />
                                    </FormItem>
                                </Col>
                                <Col span={6}>
                                    <FormItem name="title" label="帖子标题">
                                        <Input placeholder="帖子标题" />
                                    </FormItem>
                                </Col>
                                <Col span={6}>
                                    <FormItem name="type" label="发帖人">
                                        <Input placeholder="发帖人" />
                                    </FormItem>
                                </Col>
                                <Col span={6}>
                                    <div style={{float:'right'}}>
                                        <Button type="primary" style={{ marginRight: '8px' }} htmlType="submit">查询</Button>
                                        <Button type={"primary"} onClick={() => {this.formRef.current.resetFields();}}>清除</Button>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Card>
                <Card size="small" style={{marginTop:'15px',height:'76%'}}>
                    <Table rowKey="id" loading={isLoading}  size="middle" pagination={false}
                           dataSource={dataList} scroll={{ y: 310  }}>
                        <Table.Column title= '序号' width= {50} align= 'center'fixed= 'left' render={(text,record,index)=>`${index+1}`}/>
                        <Table.Column title= '用户名' width= {100} align= 'center' dataIndex= 'reportName' ellipsis={true} render={
                            (text,record)=>{
                                return <Link to={{ pathname : '/admin/user',query:{type:'查看',userId:record.reportId}}}>{util.textTag(text,"geekblue")}</Link>
                            }
                        }/>
                        <Table.Column title= '举报帖子' width= {150} align= 'center' dataIndex= 'title' render={(text) => util.longContentHandle(text,15)}/>
                        <Table.Column title= '举报原因' width= {150} align= 'center' dataIndex= 'reportReason' render={(text) => util.longContentHandle(text,15)}/>
                        <Table.Column title= '举报时间' width= {150} align= 'center' dataIndex= 'createTime' />
                        <Table.Column title= '发帖人' width= {100} align= 'center' dataIndex= 'issuer' render={
                            (text,record)=>{
                                return <Link to={{ pathname : '/admin/user',query:{type:'查看',userId:record.issuerId}}}>{util.textTag(text,"geekblue")}</Link>
                            }
                        }/>
                        <Table.Column title= '时间轴' width= {100} align= 'center' dataIndex= 'updateTime'
                              render={
                                  (text,record) => <a onClick={() => this.showTimeline(record)}>时间轴</a>
                              }
                        />
                        <Table.Column title= '状态' width= {100} align= 'center' dataIndex= 'status' render={text => util.textAndOptionsTag(text,form.selectLists.STATUS)}/>
                        <Table.Column title= '操作' width= {150} fixed= 'right' align= 'center' dataIndex= '' render={this.operatorRender}/>
                    </Table>
                    <ReportInvitationRightShow
                        onClose={this.onClose}
                        visible={visible}
                        type={type}
                        form={form}
                        title={title}
                        onFormChange={this.onFormChange}
                        updateReportInvitation={this.updateReportInvitation}
                    />
                    <ReportInvitationTimeline
                        onClose={this.onClose}
                        visibleTimeline={this.state.visibleTimeline}
                        TimelineValues={this.state.TimelineValues}
                    />
                    <div style={{position:"absolute",right:"10px",bottom:'15px'}}>
                        <Pagination
                            showSizeChanger
                            defaultCurrent={3}
                            total={500}
                        />
                    </div>
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