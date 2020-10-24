/**
 * 1、审核帖子模块右侧抽屉弹层
 */
import React from 'react'
import GeneratorForm from "../../components/myConponents/GeneratorForm";
import Data from './data'
import GeneratorDrawer from "../../components/myConponents/GeneratorDrawer";


class CheckInvitationRightShow extends React.Component {
    formRef = React.createRef();

    onSubmit = ()=>{
        const type = this.props.type
        // 1、this.formRef.current 指代所指表单的实例；同函数组件的form
        this.formRef.current.validateAll().then(
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


    render() {
        const {onClose,visible,type,title,value} = this.props
        const disabledFlag = type === 'detail'
        const forms = Data.getCheckInvitationForms.call(this,disabledFlag)
        return (
            <div>
                <GeneratorDrawer
                    title={title}
                    type={type}
                    onClose={onClose}
                    onSubmit={this.onSubmit}
                    visible={visible}
                >
                    <GeneratorForm
                        ref={this.formRef}
                        values={value.formValue}
                        forms={forms}
                        onFormChange={this.props.onFormChange}
                    />
                </GeneratorDrawer>
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