/**
 * 帖子类型右侧抽屉弹层表单项
 */
import util from "../../util/util";

export default {

    getTypeForms(disabledFlag){
        const {form} = this.props;
        return [
            {
                name: "type",
                label: "类别",
                rules: [{ required: true, message: '请输入类别' }],
                type: 'input',
                disabled: disabledFlag
            },{
                name: "status",
                label: "状态",
                rules: [{ required: true, message: '请输入状态' }],
                type: 'select',
                options: form.selectLists.invitationTypeStatus,
                disabled: disabledFlag,
                allowClear: true
            },{
                name: "createBy",
                label: "创建者",
                rules: [{ required: true, message: '请输入创建者' }],
                type: 'input',
                disabled: disabledFlag
            },{
                name: "createTime",
                label: "创建时间",
                rules: [{ required: true, message: '请输入创建时间' }],
                type: 'date',
                disabled: disabledFlag,
                format: util.dateFormat,
            },{
                name: "description",
                label: "描述",
                rules: [{ required: true, message: '请输入描述' }],
                type: 'textarea',
                disabled: disabledFlag
            },
        ]
    }
}