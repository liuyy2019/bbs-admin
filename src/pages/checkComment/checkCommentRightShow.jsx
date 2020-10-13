/* 评论列表管理的右侧抽屉页 */
import React from 'react'
import { Drawer, Form, Button, Col, Row, Input, Select} from 'antd';


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
    form.setFieldsValue(forms.formValue)
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
                <Form layout="vertical" form={form}
                      // initialValues={form.formValue}
                      onValuesChange={onValuesChange} hideRequiredMark
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
                                <Input placeholder="请输入评论时间" disabled={disabledFlag}/>
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
                                <Select placeholder="请选择账户状态" disabled={disabledFlag}>
                                    {
                                        forms.selectLists.STATUS.map(item => {
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
                                       rules={[
                                           {required: true,message: '请输入描述信息'},
                                       ]}
                            >
                                <Input.TextArea rows={4} style={{resize: 'none'}} disabled={disabledFlag}/>
                            </Form.Item>
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


/*class CheckCommentRightShow extends React.Component {
    formRef = React.createRef();


    onSubmit = ()=>{
        const type = this.props.type

        if (type === 'edit'){
            this.props.updateComment()
        } else if (type === 'search') {
            console.log('search')
        }
        // 4、调用父组件的onClose方法
        this.props.onClose();
    }


    onValuesChange = (changedValues, allValues) => {
        this.props.formChange(allValues)
    }

    render() {
        const {onClose,visible,type,form} = this.props
        return (
            <div>
                <Drawer
                    title="评论操作"
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
                    <Form layout="vertical" initialValues={form.formValue}
                          onValuesChange={this.onValuesChange} hideRequiredMark
                    >
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="name" label="评论人"
                                           rules={[{ required: true, message: '请输入评论人' }]}
                                >
                                    <Input placeholder="请输入评论人" disabled={true}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="createtime" label="评论时间"
                                           rules={[{ required: true, message: '请输入评论时间' }]}
                                >
                                    <Input placeholder="请输入评论时间" disabled={true}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="reports" label="评论举报次数"
                                           rules={[{ required: true, message: '请输入帖子标题' }]}
                                >
                                    <Input placeholder="请输入帖子标题" disabled={true}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="status" label="评论状态"
                                           rules={[{ required: true, message: '请选择评论状态' }]}
                                >
                                    <Select placeholder="请选择账户状态" disabled={type==="search"?true:false}>
                                        {
                                            form.selectLists.STATUS.map(item => {
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
                                    <Input placeholder="请输入帖子标题" disabled={true}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="invitationTitle" label="帖子标题"
                                           rules={[{ required: true, message: '请输入帖子标题' }]}
                                >
                                    <Input placeholder="请输入帖子标题" disabled={true}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="invitationName" label="帖子发布人"
                                           rules={[{ required: true, message: '请选择评论状态' }]}
                                >
                                    <Input placeholder="请输入帖子标题" disabled={true}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item name="content" label="评论内容"
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入描述信息',
                                               },
                                           ]}
                                >
                                    <Input.TextArea rows={4} placeholder="请输入公告内容" disabled={true}/>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Drawer>
            </div>
        );
    }
}*/


