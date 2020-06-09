import React from 'react'
import {getListTypes, deleteInvitationType, getCodeByType,getAllTypes} from "../../api";
import {Button, Card, Col, Input, Row, Modal, Tooltip, Breadcrumb, Form, Table, Tag, message, Select} from "antd";
import TypeRightShow from './typeRightShow'
import {ExclamationCircleOutlined} from "@ant-design/icons";


const {Option} = Select;
class InvitationTypeList extends React.Component {
    formRef = React.createRef();
    constructor(props){
        super(props);
        this.state = {
            data:[],
            pageNum: 1,
            pageSize: 100,
            visible: false,/* 新建右测栏 */
            isLoading:false,
            type: 'add',
            values:{},
            invitationTypeStatus: [],
            typeList: [],/* 帖子类别列表*/
        }
    }

    /* 数据初始化加载 */
    initValues = () => {
        const {pageNum,pageSize} = this.state;
        this.setState({isLoading:true});
        getListTypes({invitationtype:{},page:pageNum,size:pageSize},result => {
            console.log(result)
            this.setState({
                data: result,
                isLoading:false,
            })
        })
    }
    /* 组件将挂载是完成数据的初始化 */
    componentWillMount(){
        this.initValues();
        getCodeByType({codeType:"INVITATION_TYPE_STATUS"},result => {
            this.setState({
                invitationTypeStatus: result
            })
        })
        getAllTypes(result => {
            this.setState({
                typeList: result
            })
        })
    }

    /* 搜索框表单提交 */
    onFinish = values => {
        this.setState({values});
        console.log(values)
        const {pageNum,pageSize} = this.state
        getListTypes({invitationtype:values,page:pageNum,size:pageSize},result => {
            console.log(result)
            this.setState({
                data: result
            })
        })
    };

    /* 显示右侧遮罩层 */
    showDrawer = (values,type) => {
        this.setState({
            visible: true,
            type: type,
            values: values
        });
    };

    /* 关闭右侧遮罩层 */
    onClose = () => {
        this.setState({
            visible: false,
            type: '',
            values: {}
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

    operatorRender = (value, record) => {
        return (
            <div>
                <a onClick={() => this.showDrawer(record,'search')} style={styles.removeBtn}>查看</a>
                <a onClick={() => this.showDrawer(record,'edit')} style={styles.removeBtn}>编辑</a>
                <a onClick={() => this.deleteInvitationType(record)} style={styles.removeBtn}>删除</a>
            </div>
        );
    }

    typeRender = (text) => {
        return <Tag color="geekblue" key={text}>{text}</Tag>
    }
    statusRender = (text) => {
        if (text === "0"){
            return <Tag color="geekblue" key={text}>0 - 屏蔽</Tag>
        } else if (text === "1") {
            return <Tag color="geekblue" key={text}>1 - 正常</Tag>
        }
    };

    onChangeHandle = (value) => {
        // alert(value)
    };
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
                                                this.state.typeList.map((item,index) => {
                                                    return <Option value={item.type} key={index}>{item.type}</Option>
                                                })
                                            }
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item name="status" label="状态">
                                        <Select placeholder="请选择状态" onChange={(value)=>this.onChangeHandle(value)}>
                                            {
                                                this.state.invitationTypeStatus.map((item,index) => {
                                                    return <Option value={item.codeName} key={index}>{item.codeName} - {item.description}</Option>
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
                <Card title="帖子种类列表" extra={<Button type="primary" onClick={() => this.showDrawer({},'add')}>新建</Button>} size="small" style={{marginTop:'15px',height:'76%'}}>
                    <Table rowKey="id" loading={this.state.isLoading}
                           dataSource={this.state.data} scroll={{ y: 230,x: 1000  }} size="middle" pagination={true}>
                        <Table.Column title= '序号' width= {50} align= 'center'fixed= 'left' render={(text,record,index)=>`${index+1}`}/>
                        <Table.Column title= '类别' width= {100} align= 'center' dataIndex= 'type' ellipsis={true} render={this.typeRender}/>
                        <Table.Column title= '描述' width= {150} align= 'center' dataIndex= 'description'  onCell={this.contentCell} render={(text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>}/>
                        <Table.Column title= '创建时间' width= {140} align= 'center' dataIndex= 'createTime' />
                        <Table.Column title= '状态' width= {100} align= 'center' dataIndex= 'status' render={this.statusRender}/>
                        <Table.Column title= '创建人' width= {100} align= 'center' dataIndex= 'createBy' />
                        <Table.Column title= '更新时间' width= {140} align= 'center' dataIndex= 'updateTime'/>
                        <Table.Column title= '操作' width= {150} fixed= 'right' align= 'center' dataIndex= '' render={this.operatorRender}/>
                    </Table>
                    <TypeRightShow
                        onClose={this.onClose}
                        visible={this.state.visible}
                        type={this.state.type}
                        values={this.state.values}
                        initValues={this.initValues}
                        invitationTypeStatus={this.state.invitationTypeStatus}
                    />
                    {/*<div style={{position:"absolute",right:"10px",bottom:'20px'}}>
                        <Pagination
                            showSizeChanger
                            defaultCurrent={3}
                            total={500}
                        />
                    </div>*/}
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