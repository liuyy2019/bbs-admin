import React from 'react'
import { Form, Input, Button, Checkbox,message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.css'
import {adminLogin} from '../../api/index'
import {setToken} from "../../util/userLoginUtil";
import nameJpg from './images/name.jpg'
import passJpg from './images/password.png'

/**
 * 登录注册组件
 */
class Login extends React.Component {

    onFinish = async (values) => {
        console.log(values)
        const {username, password} = values;
        const data = await adminLogin(username,password);
        if(data.data !== "" && data.status === 200){
            setToken(data.data);
            // 在可能会出现死循环的地方使用replace来跳转：　　
            this.props.history.replace('/admin/dashboard');
        } else {
            message.error("请核对用户名和密码！");
        }


    };

    render(){
        return (
            <div id="particles-js">
                <div className="login">
                    <div className="login-top" style={{textAlign:'center'}}>
                        登录
                    </div>
                    <Form onFinish={this.onFinish} >
                        <div className="login-center">
                            <div className="login-center-img"><img src={nameJpg}/></div>
                            <div className="login-center-input">
                                <Form.Item name="username"
                                           rules={[
                                               { required: true, message: 'Please input your Username!',},
                                           ]}
                                           className="login-center-input"
                                >
                                    <div className="login-center-input">
                                        <input type="text" placeholder="请输入您的用户名"/>
                                        <div className="login-center-input-text">用户名</div>
                                    </div>
                                    {/*<Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />*/}
                                </Form.Item>
                            </div>
                        </div>
                        <div className="login-center clearfix">
                            <div className="login-center-img"><img src={passJpg}/></div>
                            <div className="login-center-input">
                                <Form.Item name="password"
                                           rules={[
                                               {required: true, message: 'Please input your Password!',},
                                           ]}
                                           className="login-center-input"
                                >
                                    <div className="login-center-input">
                                        <input type="password" placeholder="请输入您的密码" />
                                        <div className="login-center-input-text">密码</div>
                                    </div>
                                </Form.Item>
                            </div>
                        </div>
                        <div className="login-center clearfix">
                            <Form.Item >
                                <Button type="primary" htmlType="submit" className="login-button">
                                    登录
                                </Button>
                            </Form.Item>
                        </div>

                    </Form>
                </div>

            </div>
        )

    }
    /*render(){
        return (
            <div id="particles-js">
                <div className="login">
                    <div className="login-top">
                        登录
                    </div>
                    <div className="login-center clearfix">
                        <div className="login-center-img"><img src="images/name.jpg"/></div>
                        <div className="login-center-input">
                            <input type="text" name="" value="" placeholder="请输入您的用户名" onFocus="this.placeholder=''"
                                   onBlur="this.placeholder='请输入您的用户名'"/>
                            <div className="login-center-input-text">用户名</div>
                        </div>
                    </div>
                    <div className="login-center clearfix">
                        <div className="login-center-img"><img src="images/password.png"/></div>
                        <div className="login-center-input">
                            <input type="password" name="" value="" placeholder="请输入您的密码" onFocus="this.placeholder=''"
                                   onBlur="this.placeholder='请输入您的密码'"/>
                            <div className="login-center-input-text">密码</div>
                        </div>
                    </div>
                    <div className="login-button">
                        登录
                    </div>
                </div>
                <div className="sk-rotating-plane"></div>
            </div>
        );
    }*/
}

export default Login

/*
*
* 1、前台表单验证
*
* 2、收集表单数据，后台表单验证
* */

{/*<div id="components-form-demo-normal-login">
                <Form onFinish={this.onFinish} >
                    <Form.Item name="username"
                        rules={[
                            { required: true, message: 'Please input your Username!',},
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item name="password"
                        rules={[
                            {required: true, message: 'Please input your Password!',},
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>


                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>*/}

