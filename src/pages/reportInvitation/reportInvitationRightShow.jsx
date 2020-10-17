/**
 * 1、评论举报页面右侧抽屉弹层
 * 2、第一个将表单项抽离抽离出来的组件
 */
import React from 'react'
import {Drawer, Button} from 'antd';
import GeneratorForm from "../../components/myConponents/GeneratorForm";
import Forms from './forms'


class ReportInvitationRightShow extends React.Component {
    formRef = React.createRef();

    onSubmit = ()=>{
        const type = this.props.type
        console.log("ref",this.formRef.current)
        // this.formRef.current  = this.refs.checkUserDrawer 代表所指对象的实例
        this.formRef.current.validateAll().then(
            (values, fieldsValue) => {
                if (fieldsValue) {
                    console.log("error",fieldsValue)
                    return;
                }
                console.log("success",values)
                // 根据type的值进行不同的操作
                if (type === 'edit'){
                    this.props.updateReportInvitation()
                } else if (type === 'detail') {
                    this.props.onClose();
                }
            }
        )
    }

    render() {
        const {onClose,visible,type,form,title} = this.props
        const myForm = Forms.getForms.apply(this)
        return (
            <div>
                <Drawer
                    title={title}
                    placement="right"
                    width={520}
                    destroyOnClose={"true"}
                    onClose={() => onClose('drawer')}
                    visible={visible}
                    footer={
                        <div style={{textAlign: 'right',}}>
                            <Button onClick={() => onClose('drawer')} style={{ marginRight: 8 }}>
                                取消
                            </Button>
                            <Button onClick={this.onSubmit} htmlType="submit" type="primary">
                                确定
                            </Button>
                        </div>
                    }
                >
                    <GeneratorForm
                        // ref={"reportInvitationDrawer"}
                        ref={this.formRef}
                        forms={myForm}
                        values={form.formValue}
                        onFormChange={this.props.onFormChange}
                    />
                </Drawer>
            </div>
        );
    }
}

export default ReportInvitationRightShow

/**
 * 总结：
 *      1、将表单项单独抽离处理，注意需要改变this的指向
 *      2、使用rReact.createRef()和 refs：
 *          this.formRef.current  = this.refs.checkUserDrawer 代表所指对象的实例
 */

