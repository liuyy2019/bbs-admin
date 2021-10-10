/**
 * 1、审核用户模块
 */
import React from 'react'
import {getListUsers, getCodeByType, getParamByCodeId, deleteUserById, updateUser} from "../../api";
import {Link} from "react-router-dom";
import {Button, Card, Col, Input, Row, Tooltip, Pagination,Breadcrumb, Form, Table, Tag, Select, Modal, message} from "antd";
import CheckUserRightShow from "./checkUserDrawer";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import util from "../../util/util";
import {emailSend} from "../../api/untils";
import moment from 'moment'


const {Option} = Select;
class CheckUserList extends React.Component {
    formRef = React.createRef();
    constructor(props){
        super(props);
        this.state = {
            dataList:[],
            pageNum: 1,
            pageSize: 100,
            isLoading:true,
            visible: false,
            type: 'detail',
            values: {},
            form: {
                formValue: {},
                selectLists: {
                    reportStatus: [],
                    sexList: [],
                },
            },
            email: {},/*参数信息*/
            reportNumber:0
        }
    }

    /* 初始化获取用户列表 */
    initValues = (number) => {
        this.setState({isLoading:true});
        const {pageNum ,pageSize } = this.state;
        getListUsers({user:{reportNumber:number},page:pageNum,size:pageSize},result => {
            this.setState({
                dataList: result,
                isLoading:false,
            })
        },error => {
            console.log("error "+error)
        });
    };

    componentWillMount(){
        const {form} = this.state;
        form.selectLists.checkStatus = [{
            codeName: 0,
            description:"注销",
        },{
            codeName: 1,
            description: "正常",
        },{
            codeName: 2,
            description: "停用",
        }];
        getCodeByType({codeType:"STATUS"},result => {
            form.selectLists.reportStatus = result || [
                {"id":15,"codeType":"STATUS","codeName":"0","description":"审核中","status":"1","createTime":"2020-05-26 10:19:08","createBy":"admin"},
                {"id":16,"codeType":"STATUS","codeName":"1","description":"正常","status":"1","createTime":"2020-05-26 10:19:23","createBy":"admin"},
                {"id":17,"codeType":"STATUS","codeName":"2","description":"屏蔽","status":"1","createTime":"2020-05-26 10:19:52","createBy":"admin"}
            ]
        });
        getCodeByType({codeType:"SEX"},result => {
            form.selectLists.sexList = result || [
                {"id":1,"codeType":"SEX","codeName":"M","description":"男","status":"1","createTime":"2020-05-22 15:40:24","createBy":"admin"},
                {"id":2,"codeType":"SEX","codeName":"F","description":"女","status":"1","createTime":"2020-05-22 15:42:36","createBy":"admin"},
                {"id":3,"codeType":"SEX","codeName":"N","description":"未知","status":"1","createTime":"2020-05-22 15:44:59","createBy":"admin"}
            ]
        });
        getParamByCodeId("REPORT_USER_NUMBER",result => {
            const num = result && parseInt(result.codeName);
            this.initValues(num || 15);
            this.setState({
                reportNumber: num || 15,
            })
        });
        getParamByCodeId("USER_CHECK_MESSAGE",result => {
            this.setState({
                email:  result || {"id":6,"codeId":"USER_CHECK_MESSAGE","codeName":"用户审核通知","description":"尊敬的用户您好！经审核，该账号存在违规操作，已被查封。如有疑问请联系管理人员！","status":"1","createTime":"2020-05-26","updateTime":"2020-05-27","createBy":"admin01"},
            })
        });
        this.setState({
            form
        })
    }


    // 更新审核用户信息
    updateCheckUser = () => {
        const {form,email} = this.state;
        const formValue = {
            ...(form.formValue),
            createtime: (form.formValue.createtime).format("YYYY-MM-DD")
        };
        updateUser(formValue,result => {
            if (formValue.status === 2) {
                let qq = formValue.email;
                let {codeName ,description}= email;
                emailSend({qq:qq,subject:codeName,content:description},res => {})
            }
            if (result.status === 200){
                message.success('用户审核信息修改成功！');
                this.initValues(15);
                this.onClose()
            }
        })
    };

    onFormChange = values => {
        const {form} = this.state;
        form.formValue = values;
        this.setState({
            form
        })
    };

    /* 搜索框表单提交 */
    onFinish = values => {
        values.reportNumber = 15;
        this.setState({
            values
        },() => {
            this.initValues(values.reportNumber)
        });
    };

    /* 显示右侧浮层 */
    showDrawer = (values,type) => {
        const {form} = this.state;
        form.formValue = {
            ...values,
            createtime: moment(values.createtime)
        };
        this.setState({
            visible: true,
            type,
            form
        });
    };

    /* 关闭右侧浮层 */
    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    /* 删除用户 */
    deleteCheckUser = (record)=>{
        Modal.confirm({
            icon: <ExclamationCircleOutlined />,
            title:`确认删除${record.name}`,
            onOk:  ()=>{
                deleteUserById(record.userId,result => {
                    if (result.status===200) {
                        message.success('删除成功');
                        this.getUserList();
                    }
                });
            }
        });
    };

    operatorRender = (value, record) => {
        return (
            <div>
                <Link onClick={() => this.showDrawer(record,'detail')} style={styles.removeBtn}>查看</Link>
                <Link onClick={() => this.showDrawer(record,'edit')} style={styles.removeBtn}>编辑</Link>
                <Link onClick={() => this.deleteCheckUser(record)} style={styles.removeBtn}>删除</Link>
            </div>
        );
    };

    statusRender = (text) => {
        if (text === 0) {
            return <Tag color="geekblue" key={text}>0 - 注销</Tag>
        } else if (text === 1) {
            return <Tag color="geekblue" key={text}>1 - 正常</Tag>
        } else if (text === 2) {
            return <Tag color="geekblue" key={text}>2 - 停用</Tag>
        }
    };

    render(){
        const {dataList,form,isLoading,type,visible,reportNumber,email,reportStatus} = this.state
        return(
            <div style={{background:'#f0f2f5',height:'100%'}}>
                <Card size="small" style={{height:'20%'}}>
                    <Breadcrumb >
                        <Breadcrumb.Item>审核中心</Breadcrumb.Item>
                        <Breadcrumb.Item>用户举报审核</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{marginTop:'10px'}}>
                        <Form ref={this.formRef} name="advanced_search"
                              className="ant-advanced-search-form" onFinish={this.onFinish}
                        >
                            <Row gutter={24}>
                                <Col span={6}>
                                    <Form.Item name="name" label="用户名">
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
                                    <Form.Item name="sex" label="性别">
                                        <Select placeholder="请选择状态">
                                            {
                                                form.selectLists.sexList.map(item => {
                                                    return <Option value={item.description} key={item.id}>{item.description}</Option>
                                                })
                                            }
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <div style={{float:'right'}}>
                                        <Button type="primary" style={{ marginRight: '8px' }} htmlType="submit">搜索</Button>
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
                    <Table rowKey="userId" loading={isLoading} dataSource={dataList}
                           pagination={false} scroll={{ y: 310}} size="middle"
                    >
                        <Table.Column title= '序号' width= {50} align= 'center' fixed= 'left' render={(text,record,index)=>`${index+1}`}/>
                        <Table.Column title= '用户名' width= {80} align= 'center' dataIndex= 'name' render={
                            (text,record)=>{
                                return <Link to={{ pathname : '/admin/user',query:{type:'查看',userId:record.userId}}}><Tag color="geekblue" key={text}>{text}</Tag></Link>
                            }
                        }/>
                        <Table.Column title= '发帖数量' width= {90} align= 'center' dataIndex= 'invitationNumber'/>
                        <Table.Column title= '举报次数' width= {90} align= 'center' dataIndex= 'reportNumber'/>
                        <Table.Column title= '性别' width= {80} align= 'center' dataIndex= 'sex' style={styles.style} render={(text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>}/>
                        <Table.Column title= '联系方式' width= {130} align= 'center' dataIndex= 'email' render={text => util.textTag(text)}/>
                        <Table.Column title= '状态' width= {80} align= 'center' dataIndex= 'status' render={this.statusRender}/>
                        <Table.Column title= '注册时间' width= {130} align= 'center' dataIndex= 'createtime' render={(text) => util.textTag(text)} />
                        <Table.Column title= '操作' width= {130} fixed= 'right' align= 'center' dataIndex= '' render={this.operatorRender}/>
                    </Table>
                    <CheckUserRightShow
                        form={form}
                        visible={visible}
                        type={type}
                        reportNumber={reportNumber}
                        reportStatus={reportStatus}
                        email={email}
                        updateCheckUser={this.updateCheckUser}
                        onClose={this.onClose}
                        onFormChange={this.onFormChange}
                    />
                    <div style={{position:"absolute",right:"10px",bottom:'20px'}}>
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

export default CheckUserList

const styles = {
    removeBtn: {
        marginLeft: 8,
    }
};