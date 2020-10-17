/* 帖子类别修改，添加等抽屉组件 */
import React from 'react'
import { Drawer, Button} from 'antd';
import Forms from "./Forms";
import GeneratorForm from "../../components/myConponents/GeneratorForm";


class TypeRightShow extends React.Component {
    formRef = React.createRef();


    onSubmit = ()=>{
        const type = this.props.type;
        this.formRef.current.validateAll().then(
            (values,errors) => {
                if (errors){
                    console.log("errors",errors)
                    return
                }
                // 2、根据type的值进行不同的操作
                if (type === 'add') {
                    this.props.addInvitationType()
                } else if (type === 'edit') {
                    this.props.updateInvitationType()
                } else {
                    this.props.onClose()
                }
            }
        )

    };

    render() {
        const {onClose,visible,type,form,title} = this.props
        const disabledFlag = type === 'detail';
        const forms = Forms.getTypeForms.call(this,disabledFlag)
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
                            <Button onClick={onClose} style={{ marginRight: 8 }}>取消</Button>
                            <Button onClick={this.onSubmit}  type="primary">确定</Button>
                        </div>
                    }
                >
                    <GeneratorForm
                        ref={this.formRef}
                        forms={forms}
                        values={form.formValue}
                        onFormChange={this.props.onFormChange}
                    />
                </Drawer>
            </div>
        );
    }
}

export default TypeRightShow