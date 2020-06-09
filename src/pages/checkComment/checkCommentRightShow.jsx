/* 评论列表管理的右侧抽屉页 */
import React from 'react'
import { Drawer, Form, Button, Col, Row, Input, Select, Divider} from 'antd';
import {addAdmin,updateComment} from '../../api/index'

const { Option } = Select;

class CheckCommentRightShow extends React.Component {
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
            updateComment(data,(result)=>{
                console.log(result)
            })
        } else if (this.props.type === 'search') {
            console.log('search')
        }
        // 3、清空表单值
        this.formRef.current.resetFields();
        // 4、调用父组件的onClose方法
        this.props.onClose();
    }
    render() {
        const {onClose,visible,type,status} = this.props
        return (
            <div>
                <Drawer
                    title="评论操作"
                    placement="right"
                    width={520}
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
                                <Form.Item name="name" label="评论人"
                                           rules={[{ required: true, message: '请输入评论人' }]}
                                >
                                    <Input placeholder="请输入评论人" disabled={true}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="createtime" label="评论时间"
                                           rules={[{ required: true, message: '请输入评论时间' }]}
                                >
                                    <Input placeholder="请输入评论时间" disabled={true}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="reports" label="评论举报次数"
                                           rules={[{ required: true, message: '请输入帖子标题' }]}
                                >
                                    <Input placeholder="请输入帖子标题" disabled={true}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="status" label="评论状态"
                                           rules={[{ required: true, message: '请选择评论状态' }]}
                                >
                                    <Select placeholder="请选择账户状态" disabled={type==="search"?true:false}>
                                        {
                                            status.map(item => {
                                                return <Option value={item.codeName} key={item.id}>{item.codeName} - {item.description}</Option>
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="amount" label="评论点赞数"
                                           rules={[{ required: true, message: '请输入帖子标题' }]}
                                >
                                    <Input placeholder="请输入帖子标题" disabled={true}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="invitationTitle" label="帖子标题"
                                           rules={[{ required: true, message: '请输入帖子标题' }]}
                                >
                                    <Input placeholder="请输入帖子标题" disabled={true}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="invitationName" label="帖子发布人"
                                           rules={[{ required: true, message: '请选择评论状态' }]}
                                >
                                    <Input placeholder="请输入帖子标题" disabled={true}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item name="content" label="评论内容"
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入描述信息',
                                               },
                                           ]}
                                >
                                    <Input.TextArea rows={4} placeholder="请输入公告内容" disabled={true}/>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Drawer>
            </div>
        );
    }
}

export default CheckCommentRightShow
