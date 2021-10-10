/**
 * 自定义表单组件
 *    1、使用ant design等组件库的input、select等表单项组件
 *    2、使用ant design的FormItem 作为表单项组件的容器
 *    3、自定义校验
 */
import React from 'react'
import {Col, Form, Input, Row} from 'antd'

const FormItem = Form.Item


/**
 * 表单项：标签和表单框的默认布局
 */
const formItemLayoutDefault = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};


const checkItem = {

}

export default class BasicForm extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      formValue: {},
      checkResult: {},
    }
  }


  /**
   * 校验当前表单项输入是否合法
   */
  checkFormItem = (formItem) => {
    const {config} = formItem;
    const {formValue} = this.state;


  };

  /**
   * 处理表单项change
   */
  onChangeHandle = (formItem) => {

    return (event,dateStr) => {
      let value = '';
      switch (formItem.type) {
        case 'data':
          value = dateStr;
          break;
        case 'select':
        default:
          value = event;
      }
      const {formValue: propsFormValue} = this.props;
      const formValue = {
        ...propsFormValue,
        [formItem.label]: value
      };

      this.setState({
        formValue
      },() => {
        this.checkFormItem(formItem);
      });
      this.props.formChange(formItem.label, formValue);
    };
  };

  /**
   * Input
   */
  getInputNode = (formItem) => {
    const {
      placeholder,
      label,
      disabled,
      ...otherConfig
    } = formItem;
    const formValue = this.props.formValue;

    return (
      <Input
        placeholder={placeholder}
        disabled={disabled}
        {...otherConfig}
        value={formValue[label]}
        onChange={this.onChangeHandle(formItem)}
      />
    )
  };

  /**
   * select
   */
  getSelectNode = (formItem) => {

  };

  getDateNode = (formItem) => {

  };

  getRadioNode = (formItem) => {

  };

  getCheckBoxNode = (formItem) => {

  };

  /**
   * 生成具体类型的表单项（input、select等）
   */
  getFormItemType = (formItem) => {
    const {type} = formItem;

    switch (type) {
      case 'select':
        this.getSelectNode(formItem);
        break;
      case 'checkbox':
        this.getCheckBoxNode(formItem);
        break;
      case 'date':
        this.getDateNode(formItem);
        break;
      case 'radio':
        this.getRadioNode(formItem);
        break;
      default:
        this.getInputNode(formItem);
    }

  };

  /**
   * 生成具体的表单组件
   *    1、设置每个表单项的校验样式
   */
  getFormItemNode = (formItem) => {

    const {
      label,
      formItemLayout=formItemLayoutDefault
    } = formItem;
    const {checkResult} = this.state;

    const formItemCheckResult = checkResult[label] || {};
    const validateStatus = formItemCheckResult.status ? '': 'error';
    const validateMessage = formItemCheckResult.status ? '': formItemCheckResult.message;

    return (
      <FormItem
        label={label}
        help={validateMessage}
        validateStatus={validateStatus}
        {...formItemLayout}
      >
        {this.getFormItemType(formItem)}
      </FormItem>
    )
  };

  /**
   *  根据表单配置，生成表单
   */
  getFormNode = (formNodes) => {

    return (
      <div>
        <Row wrap>
          {
            formNodes.map((formItem) => {
              return <Col span={12} key={formItem.label+'_col'}>
                {this.getFormItemNode(formItem)}
              </Col>
            })
          }
        </Row>
      </div>
    )
  };


  render() {

    const {formNodes} = this.props;

    return (
      <div style={this.props.style}>
        {this.getFormNode(formNodes)}
      </div>
    )
  }


}
