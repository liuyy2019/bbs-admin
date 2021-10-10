/**
 * 1、管理员详情信息右侧抽屉弹层
 * 2、使用自封转组件Drawer和Form
 */
import React from 'react'
import GeneratorForm from "../../components/myConponents/GeneratorForm";
import Forms from './adminData'
import GeneratorDrawer from "../../components/myConponents/GeneratorDrawer";

class adminRightShow extends React.Component {
    formRef = React.createRef();

    onSubmit = ()=>{
        this.formRef.current.validateAll().then(
            (values,errors) => {
                if (!errors) {
                    this.props.submitHandle()
                }
            }
        )
    };

    render() {
        const {onClose,visible,form,type,title} = this.props;
        const disabledFlag = type === 'detail';
        const myForms = Forms.getAdminForms.call(this,disabledFlag);
        return (
            <div>
                <GeneratorDrawer
                    title={title}
                    visible={visible}
                    type={type}
                    onClose={onClose}
                    onSubmit={this.onSubmit}
                >
                    <GeneratorForm
                        ref={this.formRef}
                        forms={myForms}
                        values={form.formValues}
                        onFormChange={this.props.onFormChange}
                    />
                </GeneratorDrawer>
            </div>
        );
    }
}

export default adminRightShow