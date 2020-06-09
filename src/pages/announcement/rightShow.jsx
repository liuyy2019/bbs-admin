/* 公告的新增、修改、查看组件 */
import React from 'react'
import { Drawer, Form, Button, Col, Row, Input, Select,message, DatePicker} from 'antd';
import {addAnnouncement,updateAnnouncement} from '../../api/index'
import {getToken} from "../../util/util";

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
        if (this.props.type === 'add') {
            // 1、将表单值插入到数据库中
            addAnnouncement(data,(result)=>{
                if (result === true){
                    message.success('公告新建成功');
                    this.props.initValues();
                }
            })
        } else if (this.props.type === 'edit') {
            updateAnnouncement(data,(result)=>{
                if (result === true){
                    message.success('公告更新成功');
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
        const {onClose,visible,type,announcementStatus} = this.props
        return (
            <div>
                <Drawer
                    title="新建公告"
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
                                <Form.Item name="title" label="标题"
                                    rules={[{ required: true, message: '请输入类别名' }]}
                                >
                                    <Input placeholder="请输入类别名" disabled={type==="search"?true:false}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="status" label="状态"
                                    rules={[{ required: true, message: '请选择类别状态' }]}
                                >
                                    <Select placeholder="请选择类别状态" disabled={type==="search"?true:false}>
                                        {
                                            announcementStatus.map(item => {
                                                return <Option value={item.codeName}>{item.codeName} - {item.description}</Option>
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item name="content" label="公告内容"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入描述信息',
                                        },
                                    ]}
                                >
                                    <Input.TextArea rows={4} placeholder="请输入公告内容" disabled={type==="search"?true:false}/>
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