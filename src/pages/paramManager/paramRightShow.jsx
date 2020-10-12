/* 1、参数信息的新增、修改、查看组件 */
import React from 'react'
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker} from 'antd';
import locale from "antd/es/locale/zh_CN";
import moment from "moment";
import util from "../../util/util";

const { Option } = Select;

class ParamRightShow extends React.Component {
    formRef = React.createRef();


    onSubmit = (e)=>{
        e.preventDefault();
        const {type} = this.props
        // 1、通过该方式与表单进行交互，获取表单值
        const data =this.formRef.current.getFieldsValue();

        // 根据type的值进行不同的操作
        if (type === 'create') {
            this.props.addParam()
        } else if (type === 'edit') {
            this.props.updateParam()
        }
        // 3、调用父组件的onClose方法
        this.props.onClose();
        // 4、清空表单值
        // this.formRef.current.resetFields();
    }

    onValuesChange = (changedValues, allValues) => {
        // 注意点：
        const obj = {
            ...allValues,
            createTime: (allValues.createTime) &&  moment(allValues.createTime).format('YYYY-MM-DD'),
            updateTime: (allValues.updateTime) && moment(allValues.updateTime).format('YYYY-MM-DD')
        }

        this.props.onFormChange(obj)
    }


    // 设置可用日期的开始（开始日期小于等于结束日期）
    disabledDateStart = (startTime) => {
        const {updateTime} = this.props.form.formValue
        let endTime = updateTime && moment(updateTime).format('YYYY-MM-DD')

        if (!updateTime) {
            return false
        }

        // 之前isBefore；之前或相等isSameOrBefore(参数可以是String、moment)
        // return moment(endTime).isBefore(startTime)
        return moment(endTime).isBefore(startTime.format('YYYY-MM-DD'))
        // return moment(endTime).isSameOrBefore(startTime)


    }
    // 设置可用日期的结束（结束日期大于等于开始日期）
    disabledDateEnd = (endTime) => {
        const {createTime} = this.props.form.formValue
        let startTime = createTime && moment(createTime).format('YYYY-MM-DD')

        if (!createTime) {
            return false
        }

        // 之后isBefore；之后或相等isSameOrBefore
        // return moment(startTime).isSameOrAfter(endTime.format('YYYY-MM-DD'))
        return moment(startTime).isAfter(endTime.format('YYYY-MM-DD'))
    }


    render() {
        const {onClose,visible,type,title,form,disabledFlag} = this.props

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
                    <Form layout="vertical" ref={this.formRef} onFinish={this.onFinish}
                          onValuesChange={this.onValuesChange} initialValues={form.formValue}
                    >
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="codeId" label="参数码"
                                           rules={[{ required: true, message: '请输入参数码' }]}
                                >
                                    <Input placeholder="请输入参数码" disabled={disabledFlag}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="createBy" label="创建者"
                                           rules={[{ required: true, message: '请输入创建者' }]}
                                >
                                    <Input placeholder="请输入创建者" disabled={true}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        {
                            type==="create"?null:
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item name="createTime" label="创建时间"
                                                   rules={[{ required: true, message: '请输入创建时间' }]}
                                        >
                                            <DatePicker style={{width:"100%"}} disabled={disabledFlag}
                                                        dateRender={util.dateRender}
                                                        disabledDate={this.disabledDateStart} locale={locale}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item name="updateTime" label="更新时间"
                                                   rules={[{ required: true, message: '请选择更新时间' }]}
                                        >
                                            <DatePicker disabled={disabledFlag} style={{width:"100%"}}
                                                        dateRender={util.dateRender}
                                                        disabledDate={this.disabledDateEnd} locale={locale}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                        }
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="codeName" label="参数值"
                                           rules={[{ required: true, message: '请输入参数值' }]}
                                >
                                    <Input placeholder="请输入参数值" disabled={disabledFlag}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="status" label="状态"
                                           rules={[{ required: true, message: '请选择类别状态' }]}
                                >
                                    <Select placeholder="请选择类别状态" disabled={disabledFlag}>
                                        <Option value="0" >0 - 无效</Option>
                                        <Option value="1" >1 - 有效</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item name="description" label="参数描述"
                                           rules={[
                                               {required: true,message: '请输入描述信息'},
                                           ]}
                                >
                                    <Input.TextArea rows={4} placeholder="请输入公告内容" disabled={disabledFlag} style={{resize: "none"}}/>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Drawer>
            </div>
        );
    }
}

export default ParamRightShow

/**
 * 1、ant design组件DatePicker 不可选日期：disabledDate的使用
 *
 * 2、moment对象的基本方法：https://www.cnblogs.com/boonook/p/9242867.html
 *      2.1、获取今天0时0分0秒：moment().startOf('day')   ；
 *           23时59分59秒：moment().endOf(String)
 *      2.2、本周第一天(周日)0时0分0秒：moment().startOf('week')  ；
 *           本周最后一天(周六)23时59分59秒 ：moment().endOf('week')
 *      2.3、本周周一0时0分0秒：moment().startOf('isoWeek')
 *           本周周日23时59分59秒：moment().endOf('isoWeek')
 *      2.4、当前月第一天0时0分0秒：moment().startOf('month')
 *           当前月最后一天23时59分59秒：moment().endOf('month')
 *
 */
