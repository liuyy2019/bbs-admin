/* 1、评论列表管理的右侧抽屉页 */
import React from 'react'
import {Drawer, Form, Button, Col, Row, Input, Select,DatePicker} from 'antd';

import locale from 'antd/es/locale/zh_CN';
const { Option } = Select;
const dateFormat = 'YYYY-MM-DD HH:mm:ss'


class CommentRightShow extends React.Component {
    formRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            value: {},
            id: 0,
        };
    }

    onSubmit = ()=>{
        const {type,updateComment} = this.props
        // 1、通过该方式与表单进行交互，获取表单值
        const data =this.formRef.current.getFieldsValue();

        // 2、调用相应的接口方法
        if (type === 'edit'){
            updateComment()
        } else if (type === 'search') {
            console.log('search')
        }
        // 3、清空表单值
        this.formRef.current.resetFields();
        // 4、调用父组件的onClose方法
        this.props.onClose();
    }

    onValuesChange = (changedValues, allValues) => {
        console.log(changedValues, allValues)
        this.props.onFormChange(allValues)
    }
    render() {
        const {onClose,visible,type,form} = this.props
        const disabledFlag = type==="search"
        return (
            <div>
                <Drawer
                    title={`${disabledFlag?"查看":"编辑"}评论记录`}
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
                    <Form layout="vertical" ref={this.formRef} onFinish={this.onFinish}
                          onValuesChange={this.onValuesChange} initialValues={form.formValue}
                    >
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="name" label="评论人"
                                           rules={[{ required: true, message: '请输入评论人' }]}
                                >
                                    <Input placeholder="请输入评论人" disabled={disabledFlag}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="createtime" label="评论时间"
                                           rules={[{ required: true, message: '请输入评论时间' }]}
                                >
                                    {/*<Input placeholder="请输入评论时间" disabled={disabledFlag}/>*/}
                                    <DatePicker locale={locale} format={dateFormat} placeholder="请输入关注时间" style={{width:"100%"}} disabled={disabledFlag}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="reports" label="评论举报次数"
                                           rules={[{ required: true, message: '请输入帖子标题' }]}
                                >
                                    <Input placeholder="请输入帖子标题" disabled={disabledFlag}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="status" label="评论状态"
                                           rules={[{ required: true, message: '请选择评论状态' }]}
                                >
                                    <Select placeholder="请选择评论状态" disabled={disabledFlag}>
                                        {
                                            form.lists.STATUS.map(item => {
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
                                    <Input placeholder="请输入帖子标题" disabled={disabledFlag}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="invitationTitle" label="帖子标题"
                                           rules={[{ required: true, message: '请输入帖子标题' }]}
                                >
                                    <Input placeholder="请输入帖子标题" disabled={disabledFlag}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="invitationName" label="帖子发布人"
                                           rules={[{ required: true, message: '请选择评论状态' }]}
                                >
                                    <Input placeholder="请输入帖子标题" disabled={disabledFlag}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item name="content" label="评论内容"
                                           rules={[{required: true, message: '请输入描述信息',}]}
                                >
                                    <Input.TextArea rows={4} placeholder="请输入公告内容" style={{resize: "none"}} disabled={disabledFlag}/>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Drawer>
            </div>
        );
    }
}

export default CommentRightShow

/**
 * 1、style={{resize: "none"}} 可以固定高度：Input.TextArea
 *
 */

