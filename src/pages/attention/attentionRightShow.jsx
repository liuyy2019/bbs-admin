/**
 * 1、关注用户模块右侧抽屉弹层
 */
import React from 'react'
import {Drawer, Form, Button, Col, Row, Input, Select,DatePicker} from 'antd';
import moment from 'moment'
import 'moment/locale/zh-cn';
import locale from 'antd/es/locale/zh_CN';

const { Option } = Select;
const dateFormat = 'YYYY-MM-DD HH:mm:ss'
class AttentionRightShow extends React.Component {
    formRef = React.createRef();



    onSubmit = ()=>{
        if (this.props.type === 'edit'){
            this.props.updateAttention()
        }
        // 、调用父组件的onClose方法
        this.props.onClose();
        /*this.props.history.replace('/admin/announcement');*/
    }

    onValuesChange = (changedValues, allValues) =>{
        // 注意点：
        const obj = {
            ...allValues,
            createtime: (allValues.createtime)? moment(allValues.createtime).format('YYYY-MM-DD HH:mm:ss'):null
        }

        this.props.onFormChange(obj)
    }

    render() {
        const {onClose,visible,type,forms} = this.props
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
                            <Button onClick={this.props.onClose} style={{ marginRight: 8 }}>
                                取消
                            </Button>
                            <Button onClick={this.onSubmit} htmlType="submit" type="primary">
                                确定
                            </Button>
                        </div>
                    }
                >
                    <Form layout="vertical" hideRequiredMark ref={this.formRef}
                          onValuesChange={this.onValuesChange} initialValues={forms.formValue}
                    >
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
                                <Form.Item
                                    name="createtime"
                                    label="关注时间"
                                    rules={[{ required: true, message: '请输入关注时间' }]}
                                >
                                    {/*<Input placeholder="请输入关注时间" disabled={type==="search"?true:false}/>*/}
                                    {/*<DatePicker locale={locale} showTime format={dateFormat} defaultValue={value.createtime ? moment(value.createtime,dateFormat) : undefined} placeholder="请输入关注时间" style={{width:"100%"}} disabled={type==="search"?true:false}/>*/}
                                    <DatePicker locale={locale} format={dateFormat} placeholder="请输入关注时间" style={{width:"100%"}} disabled={type==="search"?true:false}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="status" label="关注状态"
                                           rules={[{ required: true, message: '请选择关注状态' }]}
                                >
                                    <Select placeholder="请选择关注状态" disabled={type==="search"?true:false}>
                                        {
                                            forms.list.attentionStatus.map((item,index) => {
                                                return <Option key={index} value={item.codeName}>{item.codeName} - {item.description}</Option>
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