/**
 * 1、用户审核模块右侧抽屉弹层
 */
import React from 'react'
import {Drawer, Button} from 'antd';
import GeneratorForm from '../../components/myConponents/GeneratorForm'


class CheckUserRightShow extends React.Component {
    formRef = React.createRef();


    onSubmit = ()=>{
        const {type} = this.props
        this.refs.checkUserDrawer.validateAll().then(
            (values, fieldsValue) => {
                if (fieldsValue) {
                    console.log("error",fieldsValue)
                    return;
                }
                console.log("success",values)
                // 根据type的值进行不同的操作
                if (type === 'edit'){
                    this.props.updateCheckUser()
                } else if (type === 'search') {
                    this.props.onClose()
                }
            }
        )

    };

    render() {
        const {onClose,visible,form,type} = this.props
        const disabledFlag = type === 'detail';
        const forms = [{
            name: "name",
            label: "用户名",
            type: 'input',
            placeholder: '请输入',
            disabled: disabledFlag,
            rules: [{ required: true, message: '请输入用户名' }]
        },{
            name:"status",
            label: "状态",
            rules: [{ required: true, message: '请选择类别状态' }],
            type: 'select',
            placeholder: '请选择类别状态',
            disabled: disabledFlag,
            options: form.selectLists.checkStatus,
            allowClear: true
        },{
            name:"sex",
            label: "性别",
            rules: [{ required: true, message: '请输入用户性别' }],
            type: 'input',
            placeholder: '请输入用户性别',
            disabled: disabledFlag,
            allowClear: true,
        },{
            name: "createtime",
            label: "注册时间",
            rules: [{ required: true, message: '请输入注册时间' }],
            type: 'date',
            placeholder: '请输入',
            disabled: disabledFlag
        },{
            name: "phone",
            label: "手机号",
            rules: [{ required: true, message: '请输入用户手机号' }],
            type: 'input',
            placeholder: '请输入',
            disabled: disabledFlag
        },{
            name: "email",
            label: "邮箱",
            rules: [{ required: true, message: '请输入用户邮箱' }],
            type: 'input',
            placeholder: '请输入',
            disabled: disabledFlag
        },{
            name: "invitationNumber",
            label: "发帖数量",
            rules: [{ required: true, message: '请输入发帖数量'}],
            type: 'input',
            placeholder: '请输入',
            disabled: disabledFlag
        },{
            name: "reportNumber",
            label: "举报次数",
            rules: [{ required: true, message: '请输入举报次数' }],
            type: 'input',
            placeholder: '请输入',
            disabled: disabledFlag
        }];


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
                        <div style={{textAlign: 'right',}}>
                            <Button onClick={onClose} style={{ marginRight: 8 }}>取消</Button>
                            <Button onClick={this.onSubmit} type="primary">确定</Button>
                        </div>
                    }
                >
                    <GeneratorForm
                        ref={"checkUserDrawer"}
                        forms={forms}
                        values={form.formValue}
                        onFormChange={this.props.onFormChange}
                    />
                </Drawer>
            </div>
        );
    }
}
export default CheckUserRightShow
