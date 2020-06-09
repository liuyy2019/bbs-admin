/* 公告的新增、修改、查看组件 */
import React from 'react'
import {Drawer, Form, Button, Col, Row, Input, Select, message} from 'antd';
import {addAdmin,updateAttention} from '../../api/index'

const { Option } = Select;

class AttentionRightShow extends React.Component {
    formRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            value: {},
            id: 0,
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
        data.id = this.props.values.id;
        if (this.props.type === 'edit'){
            updateAttention(data,(result)=>{
                if (result.status === 200){
                    message.success('关注信息修改成功');
                    this.props.initValues();
                }
            })
        } else if (this.props.type === 'search') {

        } else if (this.props.type === 'add') {
            // 将表单值插入到数据库中
            addAdmin(data,(result)=>{
                console.log(result)
                if (result === true){
                    message.success('管理员新建成功');
                    this.props.initValues();
                }
            })
        }
        // 3、清空表单值
        this.formRef.current.resetFields();
        // 4、调用父组件的onClose方法
        this.props.onClose();
        /*this.props.history.replace('/admin/announcement');*/
    }
    render() {
        const {onClose,visible,attentionStatus,type} = this.props
        return (
            <div>
                <Drawer
                    title={`${type==='edit'? '编辑':'查看'}关注信息`}
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
                                <Form.Item name="username" label="用户名"
                                           rules={[{ required: true, message: '请输入用户名' }]}
                                >
                                    <Input placeholder="请输入用户名" disabled={type==="search"?true:false}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="usersex" label="性别"
                                           rules={[{ required: true, message: '请输入用户性别' }]}
                                >
                                    <Input placeholder="请输入用户性别" disabled={true}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="userphone" label="用户手机号"
                                           rules={[{ required: true, message: '请输入用户手机号' }]}
                                >
                                    <Input placeholder="请输入用户手机号" disabled={true}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="noticer" label="关注用户"
                                           rules={[{ required: true, message: '请输入关注用户' }]}
                                >
                                    <Input placeholder="请输入关注用户" disabled={type==="search"?true:false}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="sex" label="被关注用户性别"
                                           rules={[{ required: true, message: '被关注用户性别' }]}
                                >
                                    <Input placeholder="被关注用户性别" disabled={true}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="phone" label="关注用户手机号"
                                           rules={[{ required: true, message: '请输入关注用户手机号' }]}
                                >
                                    <Input placeholder="请输入关注用户手机号" disabled={true}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="createtime" label="关注时间"
                                           rules={[{ required: true, message: '请输入关注时间' }]}
                                >
                                    <Input placeholder="请输入关注时间" disabled={true}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="status" label="关注状态"
                                           rules={[{ required: true, message: '请选择关注状态' }]}
                                >
                                    <Select placeholder="请选择关注状态" disabled={type==="search"?true:false}>
                                        {
                                            attentionStatus.map(item => {
                                                return <Option value={item.codeName}>{item.codeName} - {item.description}</Option>
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Drawer>
            </div>
        );
    }
}

export default AttentionRightShow