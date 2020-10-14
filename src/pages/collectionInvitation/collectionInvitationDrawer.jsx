/**
 * 1、帖子收藏页面抽屉弹层
 */
import React,{useEffect} from 'react'
import {Drawer, Form, Button, Col, Row, Input, Select, DatePicker} from 'antd';
import locale from 'antd/es/locale/zh_CN';
import util from "../../util/util";

const { Option } = Select;
const FormItem = Form.Item

const CollectInvitationDrawer = (props) => {
    const [form] = Form.useForm();

    // 提交数据并校验
    const onSubmit = async ()=>{
        const {type} = props
        try {
            const values = await form.validateFields();
            console.log('success:',values)
            if (type === 'edit') {
                props.updateCollection()
            }
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }

    }

    const onValuesChange = (changeValue,allValues) => {
        props.onFormChange(allValues)
    }

    const {onClose,visible,type,value,title} = props
    const disabledFlag = type === 'detail'

    // 组件再次加载时更新数据
    form.setFieldsValue(value.formValue)

    return (
        <div>
            <Drawer
                title={title}
                placement="right"
                width={520}
                maskClosable={false}
                destroyOnClose={"true"}
                onClose={onClose}
                visible={visible}
                footer={
                    <div style={{ textAlign: 'right',}}>
                        <Button onClick={onClose} style={{ marginRight: 8 }}>
                            取消
                        </Button>
                        <Button onClick={onSubmit} type="primary">
                            确定
                        </Button>
                    </div>
                }
            >
                <Form layout="vertical" hideRequiredMark form={form}
                      initialValues={value.formValue} onValuesChange={onValuesChange}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <FormItem name="collector" label="收藏者"
                                      rules={[{ required: true, message: '请输入收藏者' }]}
                            >
                                <Input placeholder="请输入类别名" disabled={disabledFlag}/>
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem name="title" label="收藏帖子标题"
                                      rules={[{ required: true, message: '请输入帖子标题' }]}
                            >
                                <Input placeholder="请输入帖子标题" disabled={disabledFlag}/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <FormItem name="issuer" label="帖子发布者"
                                      rules={[{ required: true, message: '请输入帖子发布者' }]}
                            >
                                <Input placeholder="请输入帖子发布者" disabled={disabledFlag}/>
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem name="createtime" label="发布时间"
                                      rules={[{ required: true, message: '请输入帖子发布时间' }]}
                            >
                                <DatePicker locale={locale} disabled={disabledFlag} format={util.dateFormat} style={{width: '100%'}}/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <FormItem name="type" label="类型"
                                      rules={[{ required: true, message: '请选择帖子类别' }]}
                            >
                                <Input placeholder="请选择帖子类别" disabled={disabledFlag}/>
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem name="status" label="状态"
                                      rules={[{ required: true, message: '请选择类别状态' }]}
                            >
                                <Select placeholder="请选择类别状态" disabled={disabledFlag}>
                                    <Option value="0">0 - 取消收藏</Option>
                                    <Option value="1">1 - 正常收藏</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </div>
    )
}

/**
 *  总结：
 *      1、使用函数组件时：form.setFieldsValue(value.formValue)
 *         要注意date格式的时机（注意：datePicker接收的是moment对象）
 */

/*class CollectInvitationDrawer extends React.Component {
    formRef = React.createRef();


    onSubmit = ()=>{
        const {type} = this.props
        // 1、通过该方式与表单进行交互，获取表单值
        const data =this.formRef.current.getFieldsValue();

        // 根据type的值进行不同的操作
        if (type === 'edit') {
            this.props.updateCollection()
        }


    }

    onValuesChange = (changeValue,allValues) => {
        this.props.onFormChange(allValues)
    }

    render() {
        const {onClose,visible,type,value,title} = this.props
        const disabledFlag = type === 'detail'
        return (
            <div>
                <Drawer
                    title={title}
                    placement="right"
                    width={520}
                    maskClosable={false}
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
                    <Form layout="vertical" hideRequiredMark ref={this.formRef}
                          initialValues={value.formValue} onValuesChange={this.onValuesChange}
                    >
                        <Row gutter={16}>
                            <Col span={12}>
                                <FormItem name="collector" label="收藏者"
                                           rules={[{ required: true, message: '请输入收藏者' }]}
                                >
                                    <Input placeholder="请输入类别名" disabled={disabledFlag}/>
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem name="title" label="收藏帖子标题"
                                    rules={[{ required: true, message: '请输入帖子标题' }]}
                                >
                                    <Input placeholder="请输入帖子标题" disabled={disabledFlag}/>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <FormItem name="issuer" label="帖子发布者"
                                           rules={[{ required: true, message: '请输入帖子发布者' }]}
                                >
                                    <Input placeholder="请输入帖子发布者" disabled={disabledFlag}/>
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem name="createtime" label="发布时间"
                                           rules={[{ required: true, message: '请输入帖子发布时间' }]}
                                >
                                    <DatePicker locale={locale} disabled={disabledFlag} format={util.dateFormat} style={{width: '100%'}}/>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <FormItem name="type" label="类型"
                                           rules={[{ required: true, message: '请选择帖子类别' }]}
                                >
                                    <Input placeholder="请选择帖子类别" disabled={disabledFlag}/>
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem name="status" label="状态"
                                           rules={[{ required: true, message: '请选择类别状态' }]}
                                >
                                    <Select placeholder="请选择类别状态" disabled={disabledFlag}>
                                        <Option value="0">0 - 取消收藏</Option>
                                        <Option value="1">1 - 正常收藏</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </Drawer>
            </div>
        );
    }
}*/

export default CollectInvitationDrawer