/* 该组件是举报用的右侧浮层显示 */
import React from 'react'
import {Drawer, Form, Button, Col, Row, Input, Select, message} from 'antd';
import {updateUser} from '../../api/index'
import {sendEmail,emailSend} from "../../api/untils";

const { Option } = Select;

class CheckUserRightShow extends React.Component {
    formRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            value: {},
            id: 0,
            isSendEmail: false,/* 是否发送邮件标识*/
        };
    }
    componentWillReceiveProps(props,nextProps){
        this.setState({
            value: props.values,
            id:props.values.id
        })
    }

    onSubmit = ()=>{
        // 1、通过该方式与表单进行交互，获取表单值
        const data =this.formRef.current.getFieldsValue();
        data.userId = this.props.values.userId;
        if (this.props.type === 'edit'){
            updateUser(data,result => {
                console.log(result)
                if (result.status === 200){
                    message.success('用户审核信息修改成功！');
                    this.props.initValues(this.props.reportNumber);
                }
            })
            if (this.state.isSendEmail){
                let qq = this.props.values.email;
                let {codeName ,description}= this.props.email;
                emailSend({qq:qq,subject:codeName,content:description},result => {})
            }
        } else if (this.props.type === 'search') {
            console.log('search')
        }
        // 3、清空表单值
        this.formRef.current.resetFields();
        // 4、调用父组件的onClose方法
        this.props.onClose();
        /*this.props.history.replace('/admin/announcement');*/
    };

    onChangeHandle = (value) => {
        if (value === 2 ) {
            this.setState({
                isSendEmail: true
            })
        }
    }

    render() {
        const {onClose,visible,type} = this.props
        return (
            <div>
                <Drawer
                    title="添加管理员"
                    placement="right"
                    width={520}
                    // closable={false}
                    destroyOnClose={"true"}
                    onClose={onClose}
                    visible={visible}
                    footer={
                        <div style={{textAlign: 'right',}}>
                            <Button onClick={onClose} style={{ marginRight: 8 }}>
                                取消
                            </Button>
                            <Button onClick={this.onSubmit} htmlType="submit" type="primary">
                                确定
                            </Button>
                        </div>
                    }
                >
                    <Form layout="vertical" hideRequiredMark ref={this.formRef} onFinish={this.onFinish} initialValues={this.state.value}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="name" label="用户名"
                                           rules={[{ required: true, message: '请输入用户名' }]}
                                >
                                    <Input placeholder="请输入用户名" disabled={true}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="sex" label="性别"
                                           rules={[{ required: true, message: '请输入用户性别' }]}
                                >
                                    <Input placeholder="请输入用户性别" disabled={true}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="status" label="状态"
                                           rules={[{ required: true, message: '请选择账户状态' }]}
                                >
                                    <Select placeholder="请选择账户状态" disabled={type==="search"?true:false}
                                            onChange={value => this.onChangeHandle(value)}
                                    >
                                        <Option value={0}>0 - 注销</Option>
                                        <Option value={1}>1 - 正常</Option>
                                        <Option value={2}>2 - 停用</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="createtime" label="注册时间"
                                           rules={[{ required: true, message: '请输入注册时间' }]}
                                >
                                    <Input placeholder="请输入注册时间" disabled={true}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="phone" label="手机号"
                                           rules={[{ required: true, message: '请输入用户手机号' }]}
                                >
                                    <Input placeholder="请输入用户手机号" disabled={true}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="email" label="邮箱"
                                           rules={[{ required: true, message: '请输入用户邮箱' }]}
                                >
                                    <Input placeholder="请输入用户邮箱" disabled={true}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="invitationNumber" label="发帖数量"
                                           rules={[{ required: true, message: '请输入用户手机号' }]}
                                >
                                    <Input placeholder="请输入用户手机号" disabled={true}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="reportNumber" label="举报次数"
                                           rules={[{ required: true, message: '请输入用户邮箱' }]}
                                >
                                    <Input placeholder="请输入用户邮箱" disabled={true}/>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Drawer>
            </div>
        );
    }
}

export default CheckUserRightShow
