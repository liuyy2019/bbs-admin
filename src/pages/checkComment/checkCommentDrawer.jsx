/**
 * 1、审核举报评论模块右侧抽屉弹层
 */
import React from 'react'
import {Drawer, Form, Button, Col, Row, Input, Select, DatePicker} from 'antd';
import util from "../../util/util";

const FormItem = Form.Item
const { Option } = Select;

const CheckCommentRightShow = (props) => {

    const [form] = Form.useForm();

    // 表单提交方法，以及表单验证方式一:
    // https://ant-design.gitee.io/components/form-cn/#validateFields-%E8%BF%94%E5%9B%9E%E7%A4%BA%E4%BE%8B
    const onSubmit = ()=>{
        form.validateFields().then(
            (values, fieldsValue) => {
                if (fieldsValue) {
                    console.log({fieldsValue})
                    return;
                }
                props.updateComment()
            }
        )
    }

    // 表单验证方式二
    // https://ant-design.gitee.io/components/form-cn/#components-form-demo-validate-static
    /*const onSubmit = async () =>{
        try {
            const values = await form.validateFields();
            props.updateComment()
            console.log('Success:', values);
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    }*/


    const onValuesChange = (changedValues, allValues) => {
        props.formChange(allValues)
    }

    const {onClose,visible,disabledFlag,forms,title} = props
    // form.setFieldsValue(forms.formValue)
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
                        <Button onClick={onSubmit} type="primary">
                            确定
                        </Button>
                    </div>
                }
            >
                <Form layout="vertical" form={form} hideRequiredMark
                      initialValues={forms.formValue}
                      onValuesChange={onValuesChange}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <FormItem name="name" label="评论人"
                                       rules={[{ required: true, message: '请输入评论人' }]}
                            >
                                <Input placeholder="请输入评论人" disabled={disabledFlag}/>
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem name="createtime" label="评论时间"
                                       rules={[{ required: true, message: '请输入评论时间' }]}
                            >
                                <DatePicker placeholder="请输入评论时间" disabled={disabledFlag}
                                            style={{width: '100%'}} format={util.dateFormat}
                                />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <FormItem name="reports" label="评论举报次数"
                                       rules={[{ required: true, message: '请输入帖子标题' }]}
                            >
                                <Input placeholder="请输入帖子标题" disabled={disabledFlag}/>
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem name="status" label="评论状态"
                                       rules={[{ required: true, message: '请选择评论状态' }]}
                            >
                                <Select placeholder="请选择账户状态" disabled={disabledFlag}>
                                    {
                                        forms.selectLists.STATUS.map(item => {
                                            return <Option value={item.codeName} key={item.id}>{item.codeName} - {item.description}</Option>
                                        })
                                    }
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <FormItem name="amount" label="评论点赞数"
                                       rules={[{ required: true, message: '请输入帖子标题' }]}
                            >
                                <Input placeholder="请输入帖子标题" disabled={disabledFlag}/>
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem name="invitationTitle" label="帖子标题"
                                       rules={[{ required: true, message: '请输入帖子标题' }]}
                            >
                                <Input placeholder="请输入帖子标题" disabled={disabledFlag}/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <FormItem name="invitationName" label="帖子发布人"
                                       rules={[{ required: true, message: '请选择评论状态' }]}
                            >
                                <Input placeholder="请输入帖子标题" disabled={disabledFlag}/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <FormItem name="content" label="评论内容"
                                       rules={[
                                           {required: true,message: '请输入描述信息'},
                                       ]}
                            >
                                <Input.TextArea rows={4} style={{resize: 'none'}} disabled={disabledFlag}/>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </div>
    );

}

export default CheckCommentRightShow

/**
 * 总结：
 *      1、使用函数组件
 *      2、使用ant design 的form实例设置filedValue
 *      3、点击提交按钮时，表单时进行校验
 *          2.1、方式一
 *          2.2、方式二
 */




