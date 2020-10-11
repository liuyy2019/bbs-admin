/* 公告的新增、修改、查看组件 */
import React from 'react'
import {Drawer, Form, Button, Col, Row, Input, Select, message, DatePicker, Tag} from 'antd';
import {updateCollection} from '../../api/index'
import {getToken} from "../../util/userLoginUtil";

const { Option } = Select;

class RightShow extends React.Component {
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
        data.issuer=getToken().name;
        data.id = this.state.id;
        // 根据type的值进行不同的操作
        if (this.props.type === 'edit') {
            // 1、将表单值插入到数据库中
            updateCollection(data,(result)=>{
                if (result === true){
                    message.success('收藏信息更新成功');
                    this.props.initValues();
                }
            })
        }


        // 3、调用父组件的onClose方法
        this.props.onClose();
        console.log(this.props)
        // 4、清空表单值
        this.formRef.current.resetFields();

    }
    render() {
        const {onClose,visible,type} = this.props
        return (
            <div>
                <Drawer
                    title={`${type==='edit'?'编辑':'查看'}收藏记录`}
                    placement="right"
                    width={520}
                    destroyOnClose={"true"}
                    onClose={onClose}
                    visible={visible}
                    footer={
                        <div style={{ textAlign: 'right',}}>
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
                                <Form.Item name="collector" label="收藏者"
                                           rules={[{ required: true, message: '请输入收藏者' }]}
                                >
                                    <Input placeholder="请输入类别名" disabled={type==="search"?true:false}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="title" label="收藏帖子标题"
                                    rules={[{ required: true, message: '请输入帖子标题' }]}
                                >
                                    <Input placeholder="请输入帖子标题" disabled={type==="search"?true:false}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="issuer" label="帖子发布者"
                                           rules={[{ required: true, message: '请输入帖子发布者' }]}
                                >
                                    <Input placeholder="请输入帖子发布者" disabled={type==="search"?true:false}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="createtime" label="发布时间"
                                           rules={[{ required: true, message: '请输入帖子发布时间' }]}
                                >
                                    <Input placeholder="请输入帖子发布时间" disabled={type==="search"?true:false}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="type" label="类型"
                                           rules={[{ required: true, message: '请选择帖子类别' }]}
                                >
                                    <Input placeholder="请选择帖子类别" disabled={type==="search"?true:false}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="status" label="状态"
                                           rules={[{ required: true, message: '请选择类别状态' }]}
                                >
                                    <Select placeholder="请选择类别状态" disabled={type==="search"?true:false}>
                                        <Option value="0">0 - 取消收藏</Option>
                                        <Option value="1">1 - 正常收藏</Option>
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

export default RightShow