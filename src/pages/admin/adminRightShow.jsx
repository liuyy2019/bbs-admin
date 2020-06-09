/* 公告的新增、修改、查看组件 */
import React from 'react'
import {Drawer, Form, Button, Col, Row, Input, Select, DatePicker, message} from 'antd';
import {addAdmin,updateAdmin} from '../../api/index'

const { Option } = Select;

class adminRightShow extends React.Component {
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
        data.adminId = this.props.values.adminId;
        console.log(data)
        if (this.props.type === 'edit'){
            updateAdmin(data,(result)=>{
                console.log(result)
                if (result === true){
                    message.success('管理员信息修改成功');
                    this.props.initValues();
                }
            })
        } else if (this.props.type === 'search') {
            console.log('search')
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
        const {onClose,visible,adminLevel,adminStatus,type} = this.props
        return (
            <div>
                <Drawer
                    title={`${type==='edit'?'编辑':'查看'}管理员信息`}
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
                                <Form.Item name="name" label="账户"
                                           rules={[{ required: true, message: '请输入类账户' }]}
                                >
                                    <Input placeholder="请输入类账户" disabled={type==="search"?true:false}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="password" label="密码"
                                    rules={[{ required: true, message: '请输入密码' }]}
                                >
                                    <Input placeholder="请输入密码" disabled={type==="search"?true:false}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="status" label="状态"
                                           rules={[{ required: true, message: '请选择账户状态' }]}
                                >
                                    <Select placeholder="请选择账户状态" disabled={type==="search"?true:false}>
                                        {
                                            adminStatus.map(item => {
                                                return <option value={item.codeName}>{item.codeName} - {item.description}</option>
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="level" label="类别"
                                    rules={[{ required: true, message: '请选择管理类别' }]}
                                >
                                    <Select placeholder="请选择管理类别" disabled={type==="search"?true:false}>
                                        {
                                            adminLevel.map(item => {
                                                return <option value={item.codeName}>{item.codeName} - {item.description}</option>
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

export default adminRightShow