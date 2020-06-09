import React, { Component } from 'react'
import {Form,Input,Select,Button,Card,message,Modal} from 'antd'
import {addUser, getListUsers,updateUser} from "../../api";

const Item = Form.Item;
const Option = Select.Option;
/* 添加/修改用户的form组件 */
class User extends Component {
    formRef = React.createRef();
    constructor(props){
        super(props);
        this.state = {
            type:props.location.query.type,
            user:props.location.query.record,
            name:props.location.query.name,
            userId:props.location.query.userId,
            disabled:false,
            visible: false
        }
    }

    componentWillMount(){
        if (this.state.userId) {
            const user = {
                userId:this.state.userId
            }
            getListUsers({user:user,page:1,size:5},result => {
                /*initialValues设置默认值，初始有效，赋值使用下面的方式*/
                this.formRef.current.setFieldsValue(result[0]);
            })
        }
    }
     onFinish = values => {
        const type = this.state.type;
        if (type === 'add') {
            addUser(values,(result)=>{
                if(result.status === 200){
                    message.success('用户添加成功');
                }
            })
        }else  if (type === 'edit'){
            values.userId=this.state.user.userId;
            updateUser(values,result => {
                if(result.status === 200){
                    message.success('用户更新成功');
                }
            })
         }

         this.props.history.push('/admin/userList')
     };
    onReset = () => {
        this.formRef.current.resetFields();
    };

    onClose = () => {
        this.setState({
            visible:true
        });
        window.history.back(-1);
    };

    handleOk = () => {
        setTimeout(() => {
            this.setState({
                visible: false,
            });
        }, 2000);
        this.formRef.current.resetFields();
        this.props.history.replace({pathname:'/admin/userList'});
        // this.props.history.push({ pathname: "/about", state: { id } });
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };
    render() {
        const formItemLayout = {
            labelCol: {span:4},
            wrapperCol: {span:15},
        };
        const tailLayout = {
            wrapperCol: {
                offset: 8,
                span: 16,
            },
        };
        const {type,user} = this.state;
        return (
            <Card title={type+"用户"} extra={<span onClick={this.onClose}>X</span>}>
                <Form {...formItemLayout} ref={this.formRef}
                      initialValues={user}
                      onFinish={this.onFinish}
                >
                    <Item
                        label="用户名称"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input placeholder='请输入用户名称' disabled={type==="查看"?true:false}/>
                    </Item>
                    <Item
                        label='密码'
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input placeholder='请输入密码' disabled={type==="查看"?true:false}></Input>
                    </Item>
                    <Item label="出生日期" name="birthday">
                        <Input placeholder='请输入密码' disabled={type==="查看"?true:false}></Input>
                        {/*<DatePicker format='YYYY-MM-DD'/>*/}
                    </Item>
                    <Item
                        label='手机号'
                        name="phone"
                        rules={[{ required: true, message: 'Please input your phone!' }]}
                    >
                        <Input placeholder='请输入手机号' disabled={type==="查看"?true:false}></Input>
                    </Item>
                    <Item
                        label='邮箱'
                        name="email"
                    >
                        <Input placeholder='请输入邮箱' disabled={type==="查看"?true:false}></Input>
                    </Item>
                    <Item
                        label='性别'
                        name="sex"
                        rules={[{ required: true, message: 'Please select your sex!' }]}
                    >
                        <Select placeholder='请选择用户性别' disabled={type==="查看"?true:false}>
                            <Option key="1" value="男">男</Option>
                            <Option key="2" value="女">女</Option>
                        </Select>
                    </Item>
                    <Item
                        label='状态'
                        name="status"
                        rules={[{ required: true, message: 'Please Select your status!' }]}
                    >
                        <Select placeholder='请选择用户状态' disabled={type==="查看"?true:false}>
                            <Option key="1" value={0}>0 - 待激活</Option>
                            <Option key="2" value={1}>1 - 已激活</Option>
                            <Option key="3" value={2}>2 - 已封号</Option>
                            <Option key="4" value={3}>3 - 已注销</Option>
                        </Select>
                    </Item>
                    <Item {...tailLayout}>
                        <Button type="primary" style={{marginRight:15}} htmlType="submit">
                            提交
                        </Button>
                        <Button type="primary" style={{marginRight:15}} onClick={this.onReset}>
                            重置
                        </Button>
                        <Button type="primary" onClick={this.onClose}>
                            关闭
                        </Button>
                        <Modal
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                        >
                            <p>确认取消</p>
                        </Modal>
                    </Item>
                </Form>
            </Card>

        );
    }
}
export default User;