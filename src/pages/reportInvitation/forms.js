/**
 * 数据文件
 */
import util from "../../util/util";

export default {

    // 返回表单项
    getForms(){
        const {form,type} = this.props
        const disabledFlag = type === 'detail'

        return [
            {
                name: "reportName",
                label: "举报人",
                rules: [{ required: true, message: '请输入举报人' }],
                type: 'input',
                placeholder: '请输入',
                disabled: disabledFlag,
            }, {
                name: "issuer" ,
                label: "发帖人",
                rules: [{ required: true, message: '请输入发帖人' }],
                type: 'input',
                placeholder: '请输入',
                disabled: disabledFlag,
            }, {
                name: "title" ,
                label: "举报帖子标题",
                rules: [{ required: true, message: '请输入举报帖子标题' }],
                type: 'input',
                placeholder: '请输入',
                disabled: disabledFlag,
            }, {
                name: "createTime",
                label: "举报时间",
                rules: [{ required: true, message: '请输入举报时间' }],
                type: 'date',
                format: util.dateFormat,
                showTime: true,
                placeholder: '请输入',
                disabled: disabledFlag,
            }, {
                name:"status",
                label: "状态",
                rules: [{ required: true, message: '请选择类别状态' }],
                type: 'select',
                placeholder: '请选择类别状态',
                disabled: disabledFlag,
                options: form.selectLists.STATUS,
                allowClear: true
            }, {
                name: "reportReason",
                label: "举报原因",
                rules: [{ required: true, message: '请输入举报时间' }],
                type: 'textarea',
                placeholder: '请输入',
                disabled: disabledFlag,
            },
        ]
    }
}