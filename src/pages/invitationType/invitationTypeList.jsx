/**
 * 1、帖子类别页面
 */
import React from 'react'
import {
    getListTypes,
    deleteInvitationType,
    getCodeByType,
    getAllTypes,
    addInvitationType,
    updateInvitationType
} from "../../api";
import {Button, Card, Col, Input, Row, Modal, Breadcrumb,Pagination, Form, Table, message, Select} from "antd";
import InvitationTypeDrawer from './invitationTypeDrawer'
import {ExclamationCircleOutlined} from "@ant-design/icons";
import util from "../../util/util";
import {getToken} from "../../util/userLoginUtil";
import moment from 'moment'


const {Option} = Select;
class InvitationTypeList extends React.Component {
    formRef = React.createRef();
    constructor(props){
        super(props);
        this.state = {
            dataList:[],
            pageNum: 1,
            pageSize: 100,
            visible: false,/* 新建右测栏 */
            isLoading:false,
            type: 'create',
            form:{
                fromValue: {},
                selectLists: {
                    typeList: [],/* 帖子类别列表*/
                    invitationTypeStatus: []
                }
            }
        }
    }

    /* 数据初始化加载 */
    initValues = () => {
        const {pageNum,pageSize} = this.state;
        this.setState({isLoading:true});
        getListTypes({invitationtype:{},page:pageNum,size:pageSize},result => {
            this.setState({
                dataList: result,
                isLoading:false,
            })
        })
    }
    /* 组件将挂载是完成数据的初始化 */
    componentWillMount(){
        this.initValues();
        const form = this.state.form
        getCodeByType({codeType:"INVITATION_TYPE_STATUS"},result => {
            form.selectLists.invitationTypeStatus = result
            getAllTypes(result => {
                form.selectLists.typeList = result
                this.setState({
                    form
                })
            })
        })
    }

    /* 搜索框表单提交 */
    onFinish = values => {
        const {pageNum,pageSize} = this.state
        getListTypes({invitationtype:values,page:pageNum,size:pageSize},result => {
            this.setState({
                dataList: result
            })
        })
    };

    /* 显示右侧遮罩层 */
    showDrawer = (values,type) => {
        const {form} = this.state
        form.formValue = {
            ...values,
            createTime: moment(values.createTime,util.dateFormat)
        }
        this.setState({
            visible: true,
            type,form
        });
    };

    /* 关闭右侧遮罩层 */
    onClose = () => {
        this.setState({
            visible: false
        });
    };

    /* 删除帖子类别信息 */
    deleteInvitationType = record => {
        let _this = this
        Modal.confirm({
            icon: <ExclamationCircleOutlined />,
            content: '确定删除帖子类别？',
            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                deleteInvitationType(record.id,result => {
                    if (result === true){
                        message.success('帖子类别删除成功！');
                        _this.initValues();
                    }
                })
            },
            onCancel() {
                console.log(record.id);
            },
        });
    };

    // 新增帖子类型
    addInvitationType = () => {
        const {formValue} = this.state.form;
        const param = {
            ...formValue,
            createBy: getToken().name,
            createTime: formValue.createTime.format(util.dateFormat)
        }
        addInvitationType(param,(result)=>{
            if (result === true){
                message.success('帖子种类新建成功');
                this.initValues();
                this.onClose()
            }
        })
    };

    // 更新帖子信息
    updateInvitationType = () => {
        const {formValue} = this.state.form;
        const param = {
            ...formValue,
            createTime: formValue.createTime.format(util.dateFormat)
        }
        updateInvitationType(param,(result)=>{
            if (result === true){
                message.success('帖子种类更新成功');
                this.initValues();
                this.onClose()
            }
        })
    }

    onFormChange = values => {
        const form = this.state.form
        form.formValue = {
            ...values,
        }
        this.setState({form})
    }

    operatorRender = (value, record) => {
        return (
            <div>
                <a onClick={() => this.showDrawer(record,'detail')} style={styles.removeBtn}>查看</a>
                <a onClick={() => this.showDrawer(record,'edit')} style={styles.removeBtn}>编辑</a>
                <a onClick={() => this.deleteInvitationType(record)} style={styles.removeBtn}>删除</a>
            </div>
        );
    };


    render(){
        const {dataList,isLoading,form,visible,type} = this.state;
        const title = [util.titlePrefix[type],'帖子类别信息'].join('');
        return(
            <div style={{background:'#f0f2f5',height:'100%'}}>
                <Card size="small" style={{height:'20%'}}>
                    <Breadcrumb >
                        <Breadcrumb.Item>帖子管理</Breadcrumb.Item>
                        <Breadcrumb.Item>帖子种类列表</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{marginTop:'10px'}}>
                        <Form ref={this.formRef} name="advanced_search"
                              className="ant-advanced-search-form" onFinish={this.onFinish}
                        >
                            <Row gutter={24}>
                                <Col span={6}>
                                    <Form.Item name="createBy" label="创建者">
                                        <Input placeholder="创建者" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item name="type" label="类别">
                                        <Select placeholder="请选择类别">
                                            {
                                                form.selectLists.typeList.map((item,index) => {
                                                    return <Option value={item.type} key={index}>{item.type}</Option>
                                                })
                                            }
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item name="status" label="状态">
                                        <Select placeholder="请选择状态" >
                                            {
                                                form.selectLists.invitationTypeStatus.map((item,index) => {
                                                    return <Option value={item.codeName} key={index}>{item.codeName} - {item.description}</Option>
                                                })
                                            }
                                        </Select>
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
                <Card title="帖子种类列表" size="small" style={{marginTop:'15px',height:'76%'}}
                      extra={<Button type="primary" onClick={() => this.showDrawer({},'create')}>新建</Button>}
                >
                    <Table rowKey="id" loading={isLoading}  size="middle" pagination={false} dataSource={dataList} scroll={{ y: 260}}>
                        <Table.Column title= '序号' width= {50} align= 'center'fixed= 'left' render={(text,record,index)=>`${index+1}`}/>
                        <Table.Column title= '类别' width= {100} align= 'center' dataIndex= 'type' render={text => util.textTag(text,"blue")}/>
                        <Table.Column title= '描述' width= {150} align= 'center' dataIndex= 'description' render={(text) => util.longContentHandle(text,10)}/>
                        <Table.Column title= '创建时间' width= {140} align= 'center' dataIndex= 'createTime' />
                        <Table.Column title= '状态' width= {100} align= 'center' dataIndex= 'status' render={text => util.textAndOptionsTag(text,form.selectLists.invitationTypeStatus)}/>
                        <Table.Column title= '创建人' width= {100} align= 'center' dataIndex= 'createBy' />
                        <Table.Column title= '更新时间' width= {140} align= 'center' dataIndex= 'updateTime'/>
                        <Table.Column title= '操作' width= {150} fixed= 'right' align= 'center' dataIndex= '' render={this.operatorRender}/>
                    </Table>
                    <InvitationTypeDrawer
                        visible={visible}
                        type={type}
                        form={form}
                        title={title}
                        onClose={this.onClose}
                        addInvitationType={this.addInvitationType}
                        updateInvitationType={this.updateInvitationType}
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

export default InvitationTypeList

const styles = {
    removeBtn: {
        marginLeft: 8,
    },
}