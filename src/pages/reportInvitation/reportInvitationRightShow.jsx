/* 该组件是评论举报用的右侧浮层显示 */
import React from 'react'
import {Drawer, Form, Button, Col, Row, Input, Select, message} from 'antd';
import {updateReportInvitation} from '../../api/index'

const { Option } = Select;

class ReportInvitationRightShow extends React.Component {
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
        console.log(data)
        if (this.props.type === 'edit'){
            updateReportInvitation(data,(result)=>{
                if (result === true){
                    message.success('帖子举报信息修改成功！');
                    this.props.initValues();
                }
            })
        } else if (this.props.type === 'search') {
            console.log('search')
        }
        // 3、清空表单值
        this.formRef.current.resetFields();
        // 4、调用父组件的onClose方法
        this.props.onClose();
        /*this.props.history.replace('/admin/announcement');*/
    }
    render() {
        const {onClose,visible,type} = this.props
        return (
            <div>
                <Drawer
                    title={`${type==='edit'?'编辑':'查看'}帖子举报信息`}
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
                                <Form.Item name="reportName" label="举报人"
                                           rules={[{ required: true, message: '请输入举报人' }]}
                                >
                                    <Input placeholder="请输入类账户" disabled={true}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="issuer" label="发帖人"
                                           rules={[{ required: true, message: '请输入被举报人' }]}
                                >
                                    <Input placeholder="请输入密码" disabled={true}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="title" label="举报帖子标题"
                                           rules={[{ required: true, message: '请输入举报人' }]}
                                >
                                    <Input placeholder="请输入类账户" disabled={true}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="createTime" label="举报时间"
                                           rules={[{ required: true, message: '请输入被举报人' }]}
                                >
                                    <Input placeholder="请输入密码" disabled={true}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="status" label="状态"
                                           rules={[{ required: true, message: '请选择账户状态' }]}
                                >
                                    <Select placeholder="请选择账户状态" disabled={type==="search"?true:false}>
                                        <Option value="0">0 - 注销</Option>
                                        <Option value="1">1 - 正常</Option>
                                        <Option value="2">2 - 停用</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item name="reportReason" label="举报原因"
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入举报原因',
                                               },
                                           ]}
                                >
                                    <Input.TextArea rows={4} placeholder="请输入举报原因" disabled={type==="search"?true:false}/>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Drawer>
            </div>
        );
    }
}

export default ReportInvitationRightShow
