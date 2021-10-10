/**
 * 1、审核帖子模块右侧抽屉弹层表单配置
 */
import {Link} from "react-router-dom";
import util from "../../util/util";
import React from "react";


export default {

    // 弹层表单配置项
    getCheckInvitationForms(disabledFlag){
        const {value} = this.props
        return  [
            {
                name: "name",
                label: "发布人",
                rules: [{ required: true, message: '请输入发布人' }],
                disabled: disabledFlag,
            },
            {
                name: "title",
                label: "帖子标题",
                rules: [{ required: true, message: '请输入帖子标题' }],
                disabled: disabledFlag,
            },
            {
                name: "date",
                label: "发帖时间",
                rules: [{ required: true, message: '发帖时间' }],
                disabled: disabledFlag,
            },
            {
                name: "type",
                label: "帖子类别",
                type: "select",
                options: value.selectLists.InvitationType, // item.type
                rules: [{ required: true, message: '请输入帖子类别' }],
                disabled: disabledFlag,
            },
            {
                name: "visitors",
                label: "访问量",
                rules: [{ required: true, message: '请输入访问量' }],
                disabled: disabledFlag,
            },
            {
                name: "clicks",
                label: "点赞次数",
                rules: [{ required: true, message: '请输入点赞次数' }],
                disabled: disabledFlag,
            },
            {
                name: "reports",
                label: "被举报次数",
                rules: [{ required: true, message: '请输入被举报次数' }],
                disabled: disabledFlag,
            },
            {
                name: "status",
                label: "状态",
                rules: [{ required: true, message: '请选择状态' }],
                disabled: disabledFlag,
                type: 'select',
                options: value.selectLists.checkStatus
            },
        ]
    },

    // 表格配置项
    getCheckInvitationColumns(){
        return  [
            {   title: '序号', width: 50, align: 'center', render:(text,record,index)=>`${index+1}`},
            { title: '发布人', width: 80, dataIndex: 'name', key: 'name',align: "center",
                render: (text,record)=>{
                    return <Link to={{ pathname : '/admin/user',query:{type:'查看',userId:record.issuerId}}}>{util.textTag(text,"green")}</Link>
                }
            },
            { title: '标题', width: 150, dataIndex: 'title', key: 'title',align:'center',
                render: (text,record) => {
                    return <Link to={{ pathname : '/admin/invitation',state:{id:record.id}}}>{util.longContentHandle(text,15)}</Link>;
                }
            },
            { title: '类别', width: 80, dataIndex: 'type', key: 'type',align:'center',
                render: (text) => {
                    return util.textTag(text,"green")
                }
            },
            { title: '状态', width: 80, dataIndex: 'status', key: 'status',align:'center',
                render: (text) => {
                    return util.textAndOptionsTag(text,this.state.value.selectLists.checkStatus)
                }
            },
            { title: '被举报次数', width: 90, dataIndex: 'reports', key: 'reports',align:'center',
                render: (text) => { return util.textTag(text,"geekblue")}
            },
            { title: '发布时间',width: 150,  dataIndex: 'date', key: 'date' ,align:'center'},
            { title: '操作', width: 150, dataIndex: '', key: 'x',align:'center',
                render: (value, record) => {
                    return (
                        <div>
                            <a href="/#" onClick={() => this.showDrawer(record,'detail')} style={styles.removeBtn}>查看</a>
                            <a href="/#" onClick={() => this.showDrawer(record,'edit')} style={styles.removeBtn}>编辑</a>
                            <a href="/#" onClick={() => this.deleteInvitation(record)} style={styles.removeBtn}>删除</a>
                        </div>
                    );
                },
            },
        ];
    }
}

const styles = {
    removeBtn: {
        marginLeft: 8,
    },
};
