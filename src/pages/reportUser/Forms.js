/**
 * 表单项
 */
import util from "../../util/util";

export default {

    getReportUserForms(disabledFlag){
        const {form} = this.props
        return [
            {
                name: "userName",
                label: "举报人",
                rules: [{ required: true, message: '请输入举报人' }],
                disabled: disabledFlag,
                type: 'input'
            }, {
                name: "reportName",
                label: "被举报人",
                rules: [{ required: true, message: '请输入被举报人' }],
                disabled: disabledFlag,
                type: 'input'
            }, {
                name: "status",
                label: "状态",
                rules: [{ required: true, message: '请输入被举报人' }],
                options: form.selectLists.STATUS,
                disabled: disabledFlag,
                type: 'select',
                allowClear: true
            }, {
                name: "createTime",
                label: "举报时间",
                rules: [{ required: true, message: '请输入被举报人' }],
                disabled: disabledFlag,
                type: 'date',
                format: util.dateFormat,
            }, {
                name: "reportReason",
                label: "举报原因",
                rules: [{ required: true, message: '请输入被举报人' }],
                disabled: disabledFlag,
                type: 'textarea',
                style: {resize: "none"}
            }
        ]
    }
}