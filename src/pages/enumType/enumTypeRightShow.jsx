/* 公告的新增、修改、查看组件 */
import React from 'react'
import { Drawer, Form, Button, Col, Row, Input, Select,message, DatePicker} from 'antd';
import {addEnumCode, getAllEnumType, updateEnumCode} from '../../api/index'
import {getToken} from "../../util/userLoginUtil";

const { Option } = Select;

class EnumTypeRightShow extends React.Component {
    formRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            value: {},
            id: 0,
            EnumCodeType: [],
        };
    }

    componentWillMount(){
        getAllEnumType(result => {
            console.log(result);
            this.setState({
                EnumCodeType: result
            })
        })
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
        data.createBy=getToken().name;
        data.id = this.state.id;
        // 根据type的值进行不同的操作
        if (this.props.type === 'add') {
            // 1、将表单值插入到数据库中
            addEnumCode(data,(result)=>{
                if (result === true){
                    message.success('参数码新建成功');
                    this.props.initValues();
                }
            })
        } else if (this.props.type === 'edit') {
            updateEnumCode(data,(result)=>{
                if (result === true){
                    message.success('参数码更新成功');
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
                    title={`${type==='edit'?'编辑':'查看'}枚举类型信息`}
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
                                <Form.Item name="codeType" label="枚举参数类型"
                                           rules={[{ required: true, message: '请输入枚举参数类型' }]}
                                >
                                    <Select placeholder="请输入枚举参数类型" disabled={true}>
                                        {
                                            this.state.EnumCodeType.map((item,index)=>{
                                                return <Option key={index} value={item.codeName}>{item.codeName}</Option>
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="status" label="状态"
                                           rules={[{ required: true, message: '请选择类别状态' }]}
                                >
                                    <Select placeholder="请选择类别状态" disabled={type==="search"?true:false}>
                                        <Select.Option value="0">0 - 失效</Select.Option>
                                        <Select.Option value="1">1 - 有效</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        {
                            type==="add"?null:
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item name="createBy" label="创建者"
                                                   rules={[{ required: true, message: '请输入创建者' }]}
                                        >
                                            <Input placeholder="请输入创建者" disabled={true}/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item name="createTime" label="创建时间"
                                                   rules={[{ required: true, message: '请输入创建时间' }]}
                                        >
                                            <Input placeholder="请输入创建时间" disabled={true}/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                        }
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="codeName" label="枚举参数码"
                                           rules={[{ required: true, message: '请输入枚举参数类型' }]}
                                >
                                    <Input placeholder="请输入枚举参数类型" disabled={type==="add"?false:true}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item name="description" label="参数描述"
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

export default EnumTypeRightShow