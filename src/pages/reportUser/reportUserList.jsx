/**
 * 1、用户举报页面
 */
import React from 'react'
import {getListReportUsersById, getListReportUsers, updateReportUser} from "../../api";
import {Link} from "react-router-dom";
import {Button, Card, Col, Input, Row, Pagination,Breadcrumb, Form, Table, Select, Modal, message} from "antd";
import ReportUserDrawer from "./reportUserDrawer";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import util from "../../util/util";
import moment from 'moment'


const {Option} = Select;
class ReportUserList extends React.Component {
    formRef = React.createRef();
    constructor(props){
        super(props);
        this.state = {
            dataList:[],
            pageNum: 1,
            pageSize: 100,
            visible: false,
            isLoading:false,
            type: 'detail',
            form: {
                formValue: {},
                selectLists: {
                    STATUS: [
                        {codeName: '0',description: "注销"},
                        {codeName: '1',description: "正常"},
                        {codeName: '2',description: "停用"},
                    ],
                },
                timelineValues:[],/*时间轴数据*/
            }
        }
    }

    initValues = () => {
        const {pageNum,pageSize} = this.state;
        this.setState({isLoading:true});
        getListReportUsers({reportUser:{},page:pageNum,size:pageSize},result => {
            this.setState({
                dataList: result,
                isLoading:false,
            })
        })
    }
    componentWillMount(){
        this.initValues();
    }

    /* 搜索框表单提交 */
    onFinish = values => {
        const {pageNum,pageSize} = this.state
        getListReportUsers({reportUser:values,page:pageNum,size:pageSize},result => {
            this.setState({dataList: result})
        })
    };

    /* 显示右侧浮层 */
    showDrawer = (values,type) => {
        const {form} = this.state
        form.formValue = {
            ...values,
            createTime: moment(values.createTime,util.dateFormat)
        }
        getListReportUsersById({userId: values.userId},result => {
            form.timelineValues = result
            this.setState({visible: true, type, form})
        })
    };


    /* 关闭右侧浮层 */
    onClose = () => {
        this.setState({visible: false});
    };

    // 更新信息
    updateReportUser = () => {
        const formValue = this.state.form.formValue
        const param = {
            ...formValue,
            createTime: (formValue.createTime).format(util.dateFormat)
        }
        updateReportUser(param,(result)=>{
            if (result.status === 200){
                message.success('用户举报信息修改成功！');
                this.initValues();
                this.onClose()
            }
        })
    }

    deleteUser = () => {
        Modal.confirm({
            icon: <ExclamationCircleOutlined />,
            content: '确定删除用户举报信息',
            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                message.success('用户举报信息删除成功');
            },
        });
    };

    operatorRender = (value, record,index) => {
        return (
            <div>
                <a onClick={() => this.showDrawer(record,'detail')} style={styles.removeBtn}>查看</a>
                <a onClick={() => this.showDrawer(record,'edit')} style={styles.removeBtn}>编辑</a>
                <a onClick={() => this.deleteUser(record)} style={styles.removeBtn}>删除</a>
            </div>
        );
    };

    // 表单内容改变触发函数
    onFormChange = (values) => {
        const {form} = this.state
        form.formValue = {
            ...values
        }
        this.setState({form})
    }

    styleFont = () => {
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
        const {dataList,type,form,visible,isLoading} = this.state
        const title = [util.titlePrefix[type],'举报用户信息'].join('')
        return(
            <div style={{background:'#f0f2f5',height:'100%'}}>
                <Card size="small" style={{height:'20%'}}>
                    <Breadcrumb >
                        <Breadcrumb.Item>举报管理</Breadcrumb.Item>
                        <Breadcrumb.Item>用户举报记录</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{marginTop:'10px'}}>
                        <Form ref={this.formRef} name="advanced_search"
                              className="ant-advanced-search-form" onFinish={this.onFinish}
                        >
                            <Row gutter={24}>
                                <Col span={6}>
                                    <Form.Item name="userName" label="用户名">
                                        <Input placeholder="用户名" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item name="status" label="状态">
                                        <Select placeholder="请选择状态">
                                            <Option value={0}>0 - 注销</Option>
                                            <Option value={1}>1 - 正常</Option>
                                            <Option value={2}>2 - 停用</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item name="reportName" label="被举报人">
                                        <Input placeholder="被举报人" />
                                    </Form.Item>
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
                    <Table rowKey="id" loading={isLoading} size="middle" pagination={false}
                           dataSource={dataList} scroll={{ y: 310}} >
                        <Table.Column title= '序号' width= {50} align= 'center' fixed= 'left' render={(text,record,index)=>`${index+1}`}/>
                        <Table.Column title= '用户名' width= {100} align= 'center' dataIndex= 'userName' render={
                            (text,record,index)=>{
                                return <Link to={{ pathname : '/admin/user',query:{type:'查看',userId:record.userId}}}>{util.textTag(text,"geekblue")}</Link>
                            }
                        }/>
                        <Table.Column title= '举报原因' width= {150} align= 'center' dataIndex= 'reportReason' onCell={() => this.styleFont()} render={(text) => util.longContentHandle(text)} />
                        <Table.Column title= '被举报用户名' width= {100} align= 'center' dataIndex= 'reportName' render={
                            (text,record,index)=>{
                                return <Link to={{ pathname : '/admin/user',query:{type:'查看',userId:record.userId}}}>{util.textTag(text,"cyan")}</Link>
                            }
                        }/>
                        <Table.Column title= '状态' width= {100} align= 'center' dataIndex= 'status' render={text => util.textAndOptionsTag(text,form.selectLists.STATUS,"geekblue")}/>
                        <Table.Column title= '举报时间' width= {150} align= 'center' dataIndex= 'createTime'/>
                        <Table.Column title= '操作' width= {130} fixed= 'right' align= 'center' dataIndex= '' render={this.operatorRender}/>
                    </Table>
                    <ReportUserDrawer
                        visible={visible}
                        type={type}
                        form={form}
                        title={title}
                        updateReportUser={this.updateReportUser}
                        onClose={this.onClose}
                        onFormChange={this.onFormChange}
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

export default ReportUserList

const styles = {
    removeBtn: {
        marginLeft: 8,
    }
}