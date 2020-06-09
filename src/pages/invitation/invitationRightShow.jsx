/* 该组件是评论举报用的右侧浮层显示 */
import React from 'react'
import {Drawer, Form, Button, Col, Row, Input, Select, message} from 'antd';
import {updateInvitation} from '../../api/index'

const { Option } = Select;

class InvitationRightShow extends React.Component {
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
            updateInvitation(data,(result)=>{
                if (result === true){
                    message.success('帖子信息修改成功！');
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
        const {onClose,visible,type,typeList} = this.props
        return (
            <div>
                <Drawer
                    title={`${type==='edit'?'编辑':'查看'}帖子信息`}
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
                                <Form.Item name="name" label="发布人"
                                           rules={[{ required: true, message: '请输入发布人' }]}
                                >
                                    <Input placeholder="请输入发布人" disabled={true}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="title" label="帖子标题"
                                           rules={[{ required: true, message: '请输入帖子标题' }]}
                                >
                                    <Input placeholder="请输入帖子标题" disabled={true}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="date" label="发帖时间"
                                           rules={[{ required: true, message: '请输入发帖时间' }]}
                                >
                                    <Input placeholder="请输入发帖时间" disabled={true}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="type" label="帖子类别"
                                           rules={[{ required: true, message: '请输入帖子类别' }]}
                                >
                                    <Select placeholder="请选择类别" disabled={type==="search"?true:false}>
                                        {
                                            typeList.map((item,index) => {
                                                return <Option value={item.type} key={index}>{item.type}</Option>
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="visitors" label="访问量"
                                           rules={[{ required: true, message: '请输入访问量' }]}
                                >
                                    <Input placeholder="请输入访问量" disabled={true}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="clicks" label="点赞次数"
                                           rules={[{ required: true, message: '请输入点赞次数' }]}
                                >
                                    <Input placeholder="请输入点赞次数" disabled={true}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="clicks" label="被举报次数"
                                           rules={[{ required: true, message: '请输入被举报次数' }]}
                                >
                                    <Input placeholder="请输入被举报次数" disabled={true}/>
                                </Form.Item>
                            </Col>
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

                    </Form>
                </Drawer>
            </div>
        );
    }
}

export default InvitationRightShow
