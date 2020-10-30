/**
 * 关注用户模块数据
 */
import {Link} from "react-router-dom";
import util from "../../util/util";
import React from "react";


export default {

    // 获取Form表单项
    getAttentionForms(disabledFlag) {
        const {forms} = this.props
        return [
            {
                name: "username",
                label: "用户名",
                rules: [{ required: true, message: '请输入用户名' }],
                disabled: disabledFlag,
                type: 'input'
            },{
                name: "usersex",
                label: "性别",
                rules: [{ required: true, message: '请输入性别' }],
                disabled: disabledFlag,
                type: 'input'
            },{
                name: "userphone",
                label: "用户手机号",
                rules: [{ required: true, message: '请输入用户手机号' }],
                disabled: disabledFlag,
                type: 'input'
            },{
                name: "noticer",
                label: "关注用户",
                rules: [{ required: true, message: '请输入关注用户' }],
                disabled: disabledFlag,
                type: 'input'
            },{
                name: "sex",
                label: "被关注用户性别",
                rules: [{ required: true, message: '请输入被关注用户性别' }],
                disabled: disabledFlag,
                type: 'input'
            },{
                name: "phone",
                label: "关注用户手机号",
                rules: [{ required: true, message: '请输入关注用户手机号' }],
                disabled: disabledFlag,
                type: 'input'
            },{
                name: "createtime",
                label: "关注时间",
                rules: [{ required: true, message: '请输入关注关注时间' }],
                disabled: disabledFlag,
                format: util.dateFormat,
                type: 'date'
            },{
                name: "status",
                label: "关注状态",
                rules: [{ required: true, message: '请输入关注关注时间' }],
                disabled: disabledFlag,
                type: 'select',
                options: forms.list.attentionStatus
            }

        ]
    },


    // 获取Table数据源
    getAttentionColumns(){
        const {forms} = this.state
        return [
            {   title: '序号',
                width: 50,
                align: 'center',
                render:(text,record,index)=>`${index+1}`,
            },
            { title: '用户名',width:80, dataIndex: 'username', key: 'username',align: "center",
                render:(text,record,index)=>{
                    return (
                        <Link to={{ pathname : '/admin/user',query:{type:'查看',userId:record.userId}}}>
                            {util.textTag(text,"geekblue")}
                        </Link>
                    )
                }
            },
            { title: '关注用户', width:80, dataIndex: 'noticer', key: 'noticer',align:'center',
                render:(text,record)=>{
                    return (
                        <Link to={{ pathname : '/admin/user',query:{type:'查看',userId:record.noticerId}}}>
                            {util.textTag(text,"geekblue")}
                        </Link>
                    )
                }
            },
            { title: '关注用户性别', width: 120,dataIndex: 'sex', key: 'usersex' ,align:'center',
                // onCell: (text) => {return (util.textTag(text,"geekblue"))}
                render: (text) => {return (util.textTag(text,"geekblue"))}
            },
            { title: '关注用户手机号', width:150, dataIndex: 'phone', key: 'phone',align:'center' },
            { title: '关注时间',width:130,  dataIndex: 'createtime', key: 'createtime',align:'center',
                render: (text,record) => {
                    return (<span onClick={() => this.showTimeline(record)}>{text}</span>)
                }
            },
            { title: '状态', width:100, dataIndex: 'status', key: 'status',align:'center',
                render: (text) => {return (util.textAndOptionsTag(text,forms.list.attentionStatus))}
            },
            {
                title: '操作', width:150, dataIndex: '', key: 'x',align:'center',
                render: (value, record) => {
                    return (
                        <div>
                            <a onClick={() => this.showDrawer(record,'detail')} style={styles.removeBtn}>查看</a>
                            <a onClick={() => this.showDrawer(record,'edit')} style={styles.removeBtn}>编辑</a>
                            <a onClick={() => this.deleteAttention(record)} style={styles.removeBtn}>删除</a>
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
}