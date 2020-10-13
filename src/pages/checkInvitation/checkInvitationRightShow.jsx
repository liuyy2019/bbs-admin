/**
 * 1、审核帖子模块右侧抽屉弹层
 */
import React from 'react'
import {Drawer, Form, Button, Col, Row, Input, Select} from 'antd';


const { Option } = Select;
const FormItem = Form.Item

class CheckInvitationRightShow extends React.Component {
    formRef = React.createRef();

    onSubmit = ()=>{
        const type = this.props.type
        // 1、this.formRef.current 指代所指表单的实例；同函数组件的form
        this.formRef.current.validateFields().then(
            (values, fieldsValue) => {
                if (fieldsValue) {
                    console.log({fieldsValue})
                    return;
                }
                if (type === 'edit') {
                    this.props.updateInvitation()
                } else if (type === 'search') {
                    console.log('search')
                }
            }
        )
    };



    onValuesChange = (changedValues, allValues) => {
        this.props.onFormChange(allValues)
    }

    render() {
        const {onClose,visible,type,title,value} = this.props
        const disabledFlag = type === 'detail'
        return (
            <div>
                <Drawer
                    title={title}
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
                    <Form layout="vertical" onValuesChange={this.onValuesChange}
                          initialValues={value.formValue} ref={this.formRef}
                    >
                        <Row gutter={16}>
                            <Col span={12}>
                                <FormItem name="name" label="发布人"
                                           rules={[{ required: true, message: '请输入发布人' }]}
                                >
                                    <Input placeholder="请输入发布人" disabled={true}/>
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem name="title" label="帖子标题"
                                           rules={[{ required: true, message: '请输入帖子标题' }]}
                                >
                                    <Input placeholder="请输入帖子标题" disabled={disabledFlag}/>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <FormItem name="date" label="发帖时间"
                                           rules={[{ required: true, message: '请输入发帖时间' }]}
                                >
                                    <Input placeholder="请输入发帖时间" disabled={disabledFlag}/>
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem name="type" label="帖子类别"
                                           rules={[{ required: true, message: '请输入帖子类别' }]}
                                >
                                    <Select placeholder="请选择类别" disabled={disabledFlag}>
                                        {
                                            value.selectLists.InvitationType.map((item,index) => {
                                                return <Option value={item.type} key={index}>{item.type}</Option>
                                            })
                                        }
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <FormItem name="visitors" label="访问量"
                                           rules={[{ required: true, message: '请输入访问量' }]}
                                >
                                    <Input placeholder="请输入访问量" disabled={disabledFlag}/>
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem name="clicks" label="点赞次数"
                                           rules={[{ required: true, message: '请输入点赞次数' }]}
                                >
                                    <Input placeholder="请输入点赞次数" disabled={disabledFlag}/>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <FormItem name="reports" label="被举报次数"
                                           rules={[{ required: true, message: '请输入被举报次数' }]}
                                >
                                    <Input placeholder="请输入被举报次数" disabled={disabledFlag}/>
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem name="status" label="状态"
                                           rules={[{ required: true, message: '请选择账户状态' }]}
                                >
                                    <Select placeholder="请选择类别状态" disabled={disabledFlag}
                                    >
                                        {
                                            value.selectLists.checkStatus.map((item,index) => {
                                                return <Option value={item.codeName} key={index}>{item.codeName} - {item.description}</Option>
                                            })
                                        }
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>

                    </Form>
                </Drawer>
            </div>
        );
    }
}

export default CheckInvitationRightShow

/**
 * 总结：
 *      1、使用React的React.createRef();指向ant design的form组件
 *         this.formRef.current 指代所指表单的实例；
 *      2、使用其校验效果同函数组件的form
 */