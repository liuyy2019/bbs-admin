/**
 * 管理员信息模块
 */
import React from 'react'
import {deleteAdmin, getListAdmins, getCodeByType, addAdmin, updateAdmin} from "../../api";
import {
    Button,
    Card,
    Col,
    Input,
    Pagination,
    Row,
    Breadcrumb,
    Form,
    Table,
    Modal,
    message,
    Select
} from "antd";
import AdminDrawer from './adminDrawer'
import util from "../../util/util";

const FormItem = Form.Item;
const {Option} = Select;
class AdminList extends React.Component {
    formRef = React.createRef();
    constructor(props){
        super(props);
        this.state = {
            dataList:[],/* 数据列表信息 */
            pageNum: 1,
            pageSize: 5,
            visible: false,/* 新建右测栏 */
            isLoading: false,
            type: 'create',
            form: {
                formValues: {},
                list: {
                    adminLevel: [],/*管理员级别*/
                    adminStatus: [],/*账户状态*/
                }
            },
            values: {},/* 搜索内容封装的对象*/
        }
    }

    initValues = () => {
        const {pageNum,pageSize} = this.state;
        this.setState({isLoading:true});
        getListAdmins({admin:{},page:pageNum,size:pageSize},result => {
            this.setState({
                dataList: result,
                isLoading: false,
            })
        })
    };
    componentDidMount(){
        const {list} = this.state.form;
        this.initValues();
        getCodeByType({codeType:"ADMIN_LEVEL"},result => {
            list.adminLevel = result || [
                {"id":6,"codeType":"ADMIN_LEVEL","codeName":"0","description":"管理员","status":"1","createTime":"2020-05-25 07:53:39","createBy":"admin"},
                {"id":7,"codeType":"ADMIN_LEVEL","codeName":"1","description":"超级管理员","status":"1","createTime":"2020-05-25 07:53:55","createBy":"admin"},
                {"id":8,"codeType":"ADMIN_LEVEL","codeName":"2","description":"临时超管","status":"1","createTime":"2020-05-25 08:14:53","createBy":"admin"}
            ];
            getCodeByType({codeType:"ADMIN_STATUS"},res => {
                list.adminStatus = res || [
                    {"id":9,"codeType":"ADMIN_STATUS","codeName":"1","description":"正常","status":"0","createTime":"2020-05-24 00:25:24","createBy":"admin"},
                    {"id":10,"codeType":"ADMIN_STATUS","codeName":"2","description":"停用","status":"1","createTime":"2020-05-25 08:32:48","createBy":"admin"}
                ];
                this.setState({
                    form: {
                        list
                    }
                })
            })
        })
    }

    /* 搜索框表单提交 */
    onFinish = values => {
        this.setState({values});
        const {pageNum,pageSize} = this.state;
        getListAdmins({admin:values,page:pageNum,size:pageSize},result => {
            this.setState({
                dataList: result
            })
        })
    };

    showDrawer = (values,type) => {
        const {form} = this.state;
        form.formValues = values;
        this.setState({
            visible: true,
            type, form
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    onFormChange = (values) => {
        const {form} = this.state;
        form.formValues = values;
        this.setState({
            form
        })
    };

    updateAdmin = (values) => {
        updateAdmin(values,(result)=>{
            if (result === true){
                message.success('管理员信息修改成功');
                this.initValues();
            }
        })
    };

    addAdmin = (values) => {
        addAdmin(values,(result)=>{
            if (result === true){
                message.success('管理员新建成功');
                this.initValues();
            }
        })
    };

    // 表单提交
    submitHandle = () => {
        const {type,form} = this.state;
        switch (type) {
            case 'create': {
                this.addAdmin(form.formValues);
                break;
            }
            case 'edit': {
                this.updateAdmin(form.formValues);
                break;
            }
            default: {
                console.log(type)
            }
        }
        this.onClose();
    };
    /* 删除管理员*/
    deleteAdmin = (record) => {
        Modal.confirm({
            title:`确认删除${record.name}`,
            onOk:  ()=>{
                deleteAdmin(record.adminId,result => {
                    if (result === true) {
                        message.success('删除成功');
                        getListAdmins({admin:{},page:1,size:100},res => {
                            this.setState({
                                dataList: res
                            })
                        })
                    }
                });
            }
        });
    };

    operatorRender = (value, record) => {
        return (
            <div>
                <Button type="link" onClick={() => this.showDrawer(record,'detail')} style={styles.removeBtn}>查看</Button>
                <Button type="link" onClick={() => this.showDrawer(record,'edit')} style={styles.removeBtn}>编辑</Button>
                <Button type="link" onClick={() => this.deleteAdmin(record)} style={styles.removeBtn}>删除</Button>
            </div>
        );
    };


    render(){
        const {form,isLoading,dataList,type,visible} = this.state;
        const title = [util.titlePrefix[type],'管理员信息'].join('');
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
                                    <FormItem name="name" label="账号">
                                        <Input placeholder="账号" />
                                    </FormItem>
                                </Col>
                                <Col span={6}>
                                    <FormItem name="status" label="状态">
                                        <Select placeholder="请选择账号状态">
                                            {
                                                form.list.adminStatus.map(item => {
                                                    return <Option value={item.codeName} key={item.codeName}>{item.codeName} - {item.description}</Option>
                                                })
                                            }
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span={6}>
                                    <FormItem name="level" label="级别">
                                        <Select placeholder="请选择管理员级别">
                                            {
                                                form.list.adminLevel.map(item => {
                                                    return <Option value={item.codeName} key={item.codeName}>{item.codeName} - {item.description}</Option>
                                                })
                                            }
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span={6}>
                                    <div style={{float:'right'}}>
                                        <Button type="primary" style={{ marginRight: '8px' }} htmlType="submit">查询</Button>
                                        <Button type={"primary"} onClick={() => {this.formRef.current.resetFields()}}>清除</Button>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Card>
                <Card title="管理员列表" extra={<Button type="primary" onClick={() => this.showDrawer({},'create')}>新建</Button>} size="small" style={{marginTop:'15px',height:'76%'}}>
                    <Table rowKey="adminId" loading={isLoading} size="middle" pagination={false}
                           dataSource={dataList} scroll={{ y: 230 }} >
                        <Table.Column title= '序号' width= {50} align= 'center' fixed= 'left' render={(text,record,index)=>`${index+1}`}/>
                        <Table.Column title= '账号' width= {100} align= 'center' dataIndex= 'name' ellipsis={true}/>
                        <Table.Column title= '密码' width= {150} align= 'center' dataIndex= 'password' style={styles.titleStyles}/>
                        <Table.Column title= '账号状态' width= {100} align= 'center' dataIndex= 'status' render={text => util.textAndOptionsTag(text,form.list.adminStatus,'geekblue')}/>
                        <Table.Column title= '级别' width= {150} align= 'center' dataIndex= 'level' render={text => util.textAndOptionsTag(text,form.list.adminLevel)}/>
                        <Table.Column title= '操作' width= {200} align= 'center' dataIndex= '' render={this.operatorRender}/>
                    </Table>
                    <AdminDrawer
                        onClose={this.onClose}
                        visible={visible}
                        type={type}
                        title={title}
                        onFormChange={this.onFormChange}
                        submitHandle={this.submitHandle}
                        form={form}
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

export default AdminList

const styles = {
    removeBtn: {
        marginLeft: 8,
    },
};