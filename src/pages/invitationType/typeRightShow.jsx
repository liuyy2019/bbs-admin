/* 帖子类别修改，添加等抽屉组件 */
import React from 'react'
import { Drawer, Form, Button, Col, Row, Input, Select,message, DatePicker} from 'antd';
import {addInvitationType,updateInvitationType} from '../../api/index'
import {getToken} from "../../util/userLoginUtil";

const { Option } = Select;

class TypeRightShow extends React.Component {
    formRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            value: {},
            id: 0,
        };
    }

    componentWillReceiveProps(props,nextProps){
        console.log(props);
        this.setState({
            value: props.values,
            id:props.values.id
        })
    };

    onSubmit = ()=>{
        // 1、通过该方式与表单进行交互，获取表单值
        const data =this.formRef.current.getFieldsValue();
        data.id = this.state.id;
        data.createBy=getToken().name;

        // 2、根据type的值进行不同的操作
        if (this.props.type === 'add') {
            // 2.1、将表单值插入到数据库中
            addInvitationType(data,(result)=>{
                if (result === true){
                    message.success('帖子种类新建成功');
                    this.props.initValues();
                }
            })
        } else if (this.props.type === 'edit') {
            updateInvitationType(data,(result)=>{
                if (result === true){
                    message.success('帖子种类更新成功');
                    this.props.initValues();
                }
            })
        }

        // 3、清空表单值
        this.formRef.current.resetFields();
        // 4、调用父组件的onClose方法
        this.props.onClose();
    };

    render() {
        const {onClose,visible,type,invitationTypeStatus} = this.props
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
                                <Form.Item name="type" label="类别"
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
                                            invitationTypeStatus.map(item => {
                                                return <Option value={item.codeName} key={item.codeName}>{item.codeName} - {item.description}</Option> ;
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="createBy" label="创建者"
                                           rules={[{ required: true, message: '请输入创建者' }]}
                                >
                                    <Input placeholder="请输入创建者" disabled={type==="search"?true:false}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="createTime" label="创建时间"
                                           rules={[{  message: '请输入创建时间' }]}
                                >
                                    <Input placeholder="请输入创建时间" disabled={type==="search"?true:false}/>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item name="description" label="描述"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入描述信息',
                                        },
                                    ]}
                                >
                                    <Input.TextArea rows={4} placeholder="please enter url description" disabled={type==="search"?true:false} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Drawer>
            </div>
        );
    }
}

export default TypeRightShow