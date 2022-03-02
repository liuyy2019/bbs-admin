import React from 'react';
import {Link} from 'react-router-dom'
import {Table, Card, Row, Col, Breadcrumb, Form, Input, Pagination, Modal, message, Button, Select} from 'antd';
import {deleteUserById,getListUsers} from '../../api/index'

const {Option} = Select
class UserList extends React.Component{
    formRef = React.createRef();
    constructor(props){
        super(props);
        this.state = {
            data:[],
            isShow:false,
            isLoading:false,
            pageNum: 1,
            pageSize: 100,
            values: {},
            reports: 0,
        }
    }
    componentDidMount(){
        this.getUserList();
    }
    columns = [
        {   title: '序号', width: 50, align: 'center',
            render:(text,record,index)=>`${index+1}`,
        },
        { title: '姓名', dataIndex: 'name', key: 'name',align: "center",width:70 },
        { title: '密码', dataIndex: 'password', key: 'password',align: "center",width:80 },
        { title: '出生年月', dataIndex: 'birthday', key: 'birthday' ,align:'center',width:100},
        { title: '邮箱', dataIndex: 'email', key: 'email',align:'center' ,width:160},
        { title: '性别', dataIndex: 'sex', key: 'sex',align:'center' ,width:80},
        { title: '手机号码', dataIndex: 'phone', key: 'phone',align:'center',width:130 },
        { title: '发帖数量', dataIndex: 'invitationNumber', key: 'invitationNumber',align:'center' ,width:80},
        { title: '举报次数', dataIndex: 'reportNumber', key: 'reportNumber',align:'center' ,width:80},
        { title: '操作', dataIndex: '', key: 'x',align:'center',width:  130,
            render: (value, record) => {
                return (
                    <div>
                        <Link style={styles.removeBtn} to={{ pathname : '/admin/user',state:{type:'detail',record:record}}}>查看</Link>
                        <Link style={styles.removeBtn} to={{ pathname : '/admin/user',state:{type:'edit',record:record}}}>编辑</Link>
                        <Button type={"link"} onClick={() => this.deleteUser(record)} className={"operation-sty"}>删除</Button>
                    </div>
                );
            },
        },
    ];

    /* 删除用户 */
    deleteUser = (record)=>{
        Modal.confirm({
            title:`确认删除${record.name}`,
            onOk:  ()=>{
                deleteUserById(record.userId,result => {
                    console.log(record);
                    if (result.status===200) {
                        message.success('删除用户成功');
                        this.getUserList();
                    }
                });
            }
        });
    };
    /* 获取用户列表 */
    getUserList =  () =>{
        const {pageNum ,pageSize } = this.state;
        this.setState({isLoading:true});
        getListUsers({user:{reportNumber:0},page:pageNum,size:pageSize},result => {
            this.setState({
                data: result,
                isLoading:false,
            })
        },error => {
            console.log("error "+error)
        });
    };
    onFinish = values => {
        this.setState({values});
        const {pageNum,pageSize} = this.state
        getListUsers({user:values,page:pageNum,size:pageSize},result => {
            this.setState({
                data: result
            })
        })
    };

    onChangeHandle = (current, pageSize)=> {
        this.setState({
            pageNum: current,
            pageSize: pageSize
        })
        getListUsers({user:this.state.values,page:current,size:pageSize},result => {
            this.setState({
                data: result
            })
        })
    }
    render(){
        const extraBtn = (
            <Button type="primary" >
                <Link to={{ pathname : '/admin/user',state:{type:'create'}}}>添加用户</Link>
            </Button>
        )
        return(
            <div style={{background:'#f0f2f5',height:'100%'}}>
                <Card size="small">
                    <Breadcrumb >
                        <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                        <Breadcrumb.Item>用户信息列表</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{marginTop:'10px'}}>
                        <Form ref={this.formRef} name="advanced_search"
                            className="ant-advanced-search-form" onFinish={this.onFinish}
                        >
                            <Row gutter={24}>
                                <Col span={6}>
                                    <Form.Item name="name" label="姓名">
                                        <Input placeholder="支持模糊查询" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item name="sex" label="性别">
                                        <Select placeholder='请选择用户性别'>
                                            <Option key="1" value="男">男</Option>
                                            <Option key="2" value="女">女</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item name="reportNumber" label="举报次数">
                                        <Input placeholder="举报次数" />
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
                <Card title="用户列表信息" size="small" extra={extraBtn} style={{marginTop:'10px',height:'75%'}}>
                    <Table
                        columns={this.columns}
                        loading={this.state.isLoading}
                        dataSource={this.state.data}
                        rowKey='userId'
                        scroll={{ y: 230 }}
                        size="middle"
                        pagination={false}
                    />
                    <div style={{position:"absolute",right:"10px",bottom:'10px'}}>
                        <Pagination
                            showSizeChanger
                            onChange={this.onChangeHandle}
                            defaultCurrent={1}
                            total={50}
                            pageSize={5}
                        />
                    </div>
                </Card>
            </div>
        );
    }

}

export default UserList

const styles = {
    removeBtn: {
        marginLeft: 8,
    },
}
