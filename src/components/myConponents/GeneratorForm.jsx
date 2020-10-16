/**
 *  基于ant design表单封装组件
 */
import React from 'react'
import {Input,Select,DatePicker,Form,Row,Col} from 'antd'
import PropTypes from "prop-types"


const {Option} = Select
const FormItem = Form.Item
class GeneratorForm extends React.Component{
    formRef = React.createRef();

    static propTypes = {
        values: PropTypes.object,
        forms: PropTypes.array,
        disabled: PropTypes.bool,
        onFormChange: PropTypes.func
    }

    static defaultProps = {
        forms: [], /* 表单项默认空数组*/
        values: {}, /* 表单值默认为空对象*/
        disabled: false,
        onFormChange: (value) => {}
    }


    // 校验数据合法性,将当前表单的校验结果，返回去由具体的表单实例处理
    validateAll = () => {
        /*this.formRef.current.validateFields().then(
            (values, fieldsValue) => {
                if (fieldsValue) {
                    console.log("error",fieldsValue)
                    return fieldsValue;
                }
                console.log("success",values)
            }
        )*/
        return this.formRef.current.validateFields()
    }

    // 生成具体的表单项
    getFormItem = (formItem) => {
        const {type,disabled,placeholder,options,...rest} = formItem
        let node

        switch (type) {
            case 'input':
                node = (
                    <Input disabled={disabled} placeholder={placeholder} {...rest}/>
                );
                break;
            case 'select':
                node = (
                    <Select disabled={disabled} placeholder={placeholder} {...rest}>
                        {
                            options.map(item => {
                                return (
                                    <Option key={item.codeName} value={item.codeName}>{[item.codeName, item.description].join(' - ')}</Option>
                                )
                            })
                        }
                    </Select>
                );
                break;
            case 'date':
                node = (
                    <DatePicker disabled={disabled} placeholder={placeholder}{...rest} style={{width: '100%'}}/>
                );
                break;
            case 'textarea':
                node = (
                    <Input.TextArea rows={4} disabled={disabled}
                        placeholder={placeholder} {...rest}
                    />
                );
                break;
        }

        return (
            <FormItem label={formItem.label} name={formItem.name}
                      rules={formItem.rules}
            >
                {node}
            </FormItem>
        )
    };


    // 生成Form表单实例
    getFormInstance = (values,forms) => {
        return (
            <Form layout="vertical" hideRequiredMark ref={this.formRef}
                  initialValues={values} onValuesChange={this.onValuesChange}
            >
                <Row gutter={[16, 16]}>
                    {
                        forms.map(formItem => {
                            return (
                                <Col span={formItem.type === 'textarea'? 24: 12}>
                                    {this.getFormItem(formItem)}
                                </Col>
                            )
                        })
                    }
                </Row>
            </Form>
        )
    }

    // 表单值改变触发事件
    onValuesChange = (changeValue,allValues) => {
        this.props.onFormChange(allValues)
    };

    render () {
        const {forms,values} = this.props
        return (
            <div >
                {this.getFormInstance(values,forms)}
            </div>
        )
    }

}

export default GeneratorForm

/**
 * 总结：
 *      1、剩余参数...的使用
 *
 */
