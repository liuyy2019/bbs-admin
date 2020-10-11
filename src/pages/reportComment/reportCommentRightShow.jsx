/* 该组件是评论举报用的右侧浮层显示 */
import React from 'react'
import {Drawer, Form, Button, Col, Row, Input, Select, message, DatePicker} from 'antd';
import {updateReportComment} from '../../api/index'
import locale from "antd/es/locale/zh_CN";

const { Option } = Select;
const dateFormat = 'YYYY-MM-DD HH:mm:ss'

class ReportCommentRightShow extends React.Component {
    formRef = React.createRef();


    onSubmit = ()=>{
        const {type,form} = this.props
        // 1、通过该方式与表单进行交互，获取表单值
        const formValue =this.formRef.current.getFieldsValue();
        const data = {
            ...formValue,
            id: form.formValue.id,
            createTime: formValue.createTime.format(dateFormat)
        }
        if (type === 'edit'){
            updateReportComment(data,(result)=>{
                if (result != null){
                    message.success('评论举报信息修改成功！');
                    this.props.initValues();
                }
            })
        } else if (type === 'search') {
            console.log('search')
        }
        // 3、清空表单值
        this.formRef.current.resetFields();
        // 4、调用父组件的onClose方法
        this.props.onClose();
        /*this.props.history.replace('/admin/announcement');*/
    }



    render() {
        const {onClose,visible,type,form} = this.props
        const disabledFlag = type==="search"

        const detailButton = (
            <div style={{ textAlign: 'right',}}>
                <Button onClick={onClose} style={{ marginRight: 8 }}>
                    关闭
                </Button>
            </div>
        )

        const editButton = (
            <div style={{textAlign: 'right',}}>
                <Button onClick={onClose} style={{ marginRight: 8 }}>
                    取消
                </Button>
                <Button onClick={this.onSubmit} htmlType="submit" type="primary">
                    确定
                </Button>
            </div>
        )


        return (
            <div>
                <Drawer
                    title="添加管理员"
                    placement="right"
                    width={520}
                    // closable={false}
                    destroyOnClose={"true"}
                    onClose={onClose}
                    visible={visible}
                    footer={
                        disabledFlag? detailButton : editButton
                    }
                >
                    <Form layout="vertical" hideRequiredMark ref={this.formRef} onFinish={this.onFinish} initialValues={form.formValue}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="commentName" label="评论人"
                                           rules={[{ required: true, message: '请输入举报人' }]}
                                >
                                    <Input placeholder="请输入类账户" disabled={disabledFlag}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="reportName" label="举报人"
                                           rules={[{ required: true, message: '请输入被举报人' }]}
                                >
                                    <Input placeholder="请输入密码" disabled={disabledFlag}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="status" label="状态"
                                           rules={[{ required: true, message: '请选择状态' }]}
                                >
                                    <Select placeholder="请选择状态" disabled={disabledFlag}>
                                        {
                                            form.selectLists.STATUS.map(item => {
                                                return <Option key={item.codeName} value={item.codeName}>{item.codeName} - {item.description}</Option>
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="createTime" label="举报时间"
                                           rules={[{ required: true, message: '请输入举报时间' }]}
                                >
                                    {/*<Input placeholder="请输入举报时间" disabled={disabledFlag}/>*/}
                                    <DatePicker locale={locale} format={dateFormat} placeholder="请输入关注时间" style={{width:"100%"}} disabled={disabledFlag}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item name="reportReason" label="举报原因"
                                           rules={[{required: true,message: '请输入举报原因',}]}
                                >
                                    <Input.TextArea rows={4} placeholder="请输入举报原因" disabled={disabledFlag} style={{resize: "none"}}/>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Drawer>
            </div>
        );
    }
}

export default ReportCommentRightShow
