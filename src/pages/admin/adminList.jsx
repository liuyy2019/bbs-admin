import React from 'react'
import {deleteAdmin, getListAdmins,getCodeByType} from "../../api";
import {
    Button,
    Card,
    Col,
    Input,
    Pagination,
    Row,
    Tooltip,
    Breadcrumb,
    Form,
    Table,
    Tag,
    Modal,
    message,
    Select
} from "antd";
import AdminRightShow from './adminRightShow'



class AdminList extends React.Component {
    formRef = React.createRef();
    constructor(props){
        super(props);
        this.state = {
            data:[],
            pageNum: 1,
            pageSize: 5,
            visible: false,/* 新建右测栏 */
            isLoading: false,
            type: 'add',
            values:{},
            adminLevel: [],/*管理员级别*/
            adminStatus: [],/*账户状态*/
        }
    }

    initValues = () => {
        const {pageNum,pageSize} = this.state;
        this.setState({isLoading:true});
        getListAdmins({admin:{},page:pageNum,size:pageSize},result => {
            this.setState({
                data: result,
                isLoading: false,
            })
        })
    }
    componentWillMount(){
        this.initValues();
        getCodeByType({codeType:"ADMIN_LEVEL"},result => {
            this.setState({
                adminLevel: result
            })
        })
        getCodeByType({codeType:"ADMIN_STATUS"},result => {
            this.setState({
                adminStatus: result
            })
        })
    }

    /* 搜索框表单提交 */
    onFinish = values => {
        this.setState({values});
        console.log(values)
        const {pageNum,pageSize} = this.state
        getListAdmins({admin:values,page:pageNum,size:pageSize},result => {
            this.setState({
                data: result
            })
        })
    };
    showDrawer = (values,type) => {
        this.setState({
            visible: true,
            type: type,
            values: values
        });
        console.log(this.state)
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
        getListAdmins({admin:{},page:1,size:100},result => {
            this.setState({
                data: result
            })
        })
    };

    /* 删除管理员*/
    deleteAdmin = (record) => {
        Modal.confirm({
            title:`确认删除${record.name}`,
            onOk:  ()=>{
                deleteAdmin(record.adminId,result => {
                    if (result === true) {
                        message.success('删除成功');
                        getListAdmins({admin:{},page:1,size:100},result => {
                            this.setState({
                                data: result
                            })
                        })
                    }
                });
            }
        });
    }

    operatorRender = (value, record,index) => {
        return (
            <div>
                <a onClick={() => this.showDrawer(record,'search')} style={styles.removeBtn}>查看</a>
                <a onClick={() => this.showDrawer(record,'edit')} style={styles.removeBtn}>编辑</a>
                <a onClick={() => this.deleteAdmin(record)} style={styles.removeBtn}>删除</a>
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
        } else if (text === "2") {
            return <Tag color="geekblue" key={text}>2 - 临时超管</Tag>
        }
    }

    render(){
        return(
            <div style={{background:'#f0f2f5',height:'100%'}}>
                <Card size="small" style={{height:'20%'}}>
                    <Breadcrumb >
                        <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                        <Breadcrumb.Item>管理员列表</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{marginTop:'10px'}}>
                        <Form ref={this.formRef} name="advanced_search"
                              className="ant-advanced-search-form" onFinish={this.onFinish}
                        >
                            <Row gutter={24}>
                                <Col span={6}>
                                    <Form.Item name="name" label="账号">
                                        <Input placeholder="账号" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item name="status" label="状态">
                                        <Select placeholder="请选择账号状态">
                                            {
                                                this.state.adminStatus.map(item => {
                                                    return <option value={item.codeName}>{item.codeName} - {item.description}</option>
                                                })
                                            }
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item name="level" label="级别">
                                        <Select placeholder="请选择管理员级别">
                                            {
                                                this.state.adminLevel.map(item => {
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
                <Card title="管理员列表" extra={<Button type="primary" onClick={() => this.showDrawer({},'add')}>新建</Button>}size="small" style={{marginTop:'15px',height:'76%'}}>
                    <Table rowKey="adminId" loading={this.state.isLoading}
                           dataSource={this.state.data} scroll={{ y: 230 }} size="middle" pagination={false}>
                        <Table.Column title= '序号' width= {50} align= 'center'fixed= 'left' render={(text,record,index)=>`${index+1}`}/>
                        <Table.Column title= '账号' width= {100} align= 'center' dataIndex= 'name' ellipsis={true}/>
                        <Table.Column title= '密码' width= {150} align= 'center' dataIndex= 'password' style={styles.titleStyles} render={(text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>}/>
                        <Table.Column title= '账号状态' width= {100} align= 'center' dataIndex= 'status' render={this.statusRender}/>
                        <Table.Column title= '级别' width= {150} align= 'center' dataIndex= 'level'render={this.levelRender}/>
                        <Table.Column title= '操作' width= {200} align= 'center' dataIndex= '' render={this.operatorRender}/>
                    </Table>
                    <AdminRightShow
                        onClose={this.onClose}
                        visible={this.state.visible}
                        type={this.state.type}
                        values={this.state.values}
                        initValues={this.initValues}
                        adminLevel={this.state.adminLevel}
                        adminStatus={this.state.adminStatus}
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

export default AdminList

const styles = {
    removeBtn: {
        marginLeft: 8,
    },
}