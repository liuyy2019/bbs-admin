import React from 'react'
import {Menu,Modal,Form,Input,Switch,message} from "antd";
import {removeToken,getToken} from "../../util/util";
import { withRouter } from 'react-router-dom'
import {updateAdmin} from'../../api/index'

class MyMenu extends React.Component{
    formRef = React.createRef();

    constructor(props){
        super(props);
        this.state = {
            visible: false,
            user: getToken(),
            disabled: true
        }
    }

    clickHandler = () => {
        /* 1、清除本地存储 */
        removeToken("user");
        /* 2、跳转到登录页面 */
        this.props.history.replace('/login');
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        const data =this.formRef.current.getFieldsValue();
        data.adminId = this.state.user.adminId;
        console.log(data);
        updateAdmin(data,result => {
            console.log(result)
            if (result === true){
                message.success('信息修改成功');
                this.clickHandler();
            }
        });
        this.setState({
            visible: false,
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    onChange =(checked) => {
        console.log(`switch to ${checked}`);
        let {disabled} = this.state;
        this.setState({
            disabled: !disabled,
        });
    }



    render(){
        let disabled = this.state.disabled;
        return (
            <div>
                <Menu>
                    <Menu.Item>
                        <span onClick={this.showModal} >个人中心</span>
                    </Menu.Item>
                    <Menu.Item>
                        <span onClick={this.clickHandler}>退出</span>
                    </Menu.Item>
                </Menu>
                <Modal
                    title={<Switch checkedChildren="开启" unCheckedChildren="关闭" onChange={this.onChange} />}
                    visible={this.state.visible}
                    destroyOnClose={true}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form name="basic" initialValues={this.state.user} ref={this.formRef}>
                        <Form.Item label="账号" name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input disabled={disabled}/>
                        </Form.Item>
                        <Form.Item label="密码" name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password disabled={disabled}/>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default withRouter(MyMenu)
// export default MyMenu
// 参考：https://blog.csdn.net/u010856177/article/details/103402011