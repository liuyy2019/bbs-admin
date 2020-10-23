/**
 * 管理员信息数据
 */
export default {

    // 表单数据
    getAdminForms(disabledFlag){
        const {form} = this.props
        return [
            {
                name: "name",
                label: "账户",
                type: "input",
                rules: [{ required: true, message: '请输入类账户' }],
                placeholder: "请输入类账户",
                disabled: disabledFlag
            },
            {
                name: "password",
                label: "密码",
                type: "input",
                rules: [{ required: true, message: '请输入密码' }],
                placeholder: "请输入密码",
                disabled: disabledFlag
            },
            {
                name: "status",
                label: "状态",
                type: "select",
                options: form.list.adminStatus,
                rules: [{ required: true, message: '请选择状态' }],
                placeholder: "请选择状态",
                disabled: disabledFlag
            },
            {
                name: "level",
                label: "类别",
                type: "select",
                options: form.list.adminLevel,
                rules: [{ required: true, message: '请选择类别' }],
                placeholder: "请选择类别",
                disabled: disabledFlag,
                allowClear: true
            }
        ]
    },

    // 列表数据
    getAdminTables(){
        return []
    }
}