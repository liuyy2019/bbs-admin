/**
 * 1、公告管理模块 - 右侧弹层页面
 */
import React from 'react'
import { Drawer, Button } from 'antd';
import  GeneratorForm from '../../components/myConponents/GeneratorForm'

class RightShow extends React.Component {


    onSubmit = ()=>{
        const type = this.props.type
        this.refs.announcementDrawer.validateAll().then(
            (values, fieldsValue) => {
                if (fieldsValue) {
                    console.log("error",fieldsValue)
                    return;
                }
                console.log("success",values)
                // 根据type的值进行不同的操作
                if (type === 'create') {
                    this.props.addAnnouncement()
                } else if (this.props.type === 'edit') {
                    this.props.updateAnnouncement()
                } else {
                    this.props.onClose();
                }
            }
        )
    };

    render() {
        const {values,onClose,visible,type,title} = this.props
        const disabledFlag = type === 'detail'
        const forms = [{
            name: "title",
            label: "标题",
            type: 'input',
            placeholder: '请输入',
            disabled: disabledFlag,
            rules: [{ required: true, message: '请输入类别状态' }]
        },{
            name:"status",
            label: "状态",
            rules: [{ required: true, message: '请选择类别状态' }],
            type: 'select',
            placeholder: '请选择类别状态',
            disabled: disabledFlag,
            options: values.selectLists.announcementStatus,
            allowClear: true
        },{
            name: "content",
            label: "公告内容",
            rules: [{required: true,message: '请输入公告内容'}],
            type: 'textarea',
            placeholder: '请输入公告内容',
            disabled: disabledFlag
        }]
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
                    <GeneratorForm
                        ref={"announcementDrawer"}
                        forms={forms}
                        values={values.formValue}
                        onFormChange={this.props.onFormChange}
                    />
                </Drawer>
            </div>
        );
    }
}
export default RightShow

/**
 * 1、使用自封装组件GeneratorForm生成form
 * 2、调用GeneratorForm组件的校验方法validateAll
 * 3、React的ref的使用
 */

/*class RightShow extends React.Component {
    formRef = React.createRef();


    onSubmit = ()=>{
        // 1、通过该方式与表单进行交互，获取表单值
        const data =this.formRef.current.getFieldsValue();
        const type = this.props.type
        // 根据type的值进行不同的操作
        if (type === 'create') {
            this.props.addAnnouncement()
        } else if (this.props.type === 'edit') {
            this.props.updateAnnouncement()
        } else {
            this.props.onClose();
        }
        // 4、清空表单值
        // this.formRef.current.resetFields();
    }

    onValuesChange = (changeValue,allValues) => {
        this.props.onFormChange(allValues)
    }

    render() {
        const {values,onClose,visible,type,title} = this.props
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
                          initialValues={values.formValue} onValuesChange={this.onValuesChange}
                    >
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="title" label="标题"
                                    rules={[{ required: true, message: '请输入类别名' }]}
                                >
                                    <Input placeholder="请输入类别名" disabled={disabledFlag}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="status" label="状态"
                                    rules={[{ required: true, message: '请选择类别状态' }]}
                                >
                                    <Select placeholder="请选择类别状态" disabled={disabledFlag} allowClear>
                                        {
                                            values.selectLists.announcementStatus.map(item => {
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
                                        {required: true,message: '请输入公告内容'},
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
}*/
