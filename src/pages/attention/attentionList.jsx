/* 用户关注信息组件 */
import React from 'react';
import {Table, Card, Breadcrumb, Form, Tooltip, Row, Col, Input, Button, Tag, Modal, message, Select,} from 'antd';
import {
    deleteAttentionById,
    getAllAttentions,
    getCodeByType,
    getListAttentions,
    getListAttentionsByName,
    updateAttention
} from "../../api";
import {Link} from "react-router-dom";
import AttentionRightShow from "./attentionRightShow";
import AttentionTimeline from "./attentionTimeline";
import moment from 'moment'
import 'moment/locale/zh-cn';
import locale from 'antd/es/locale/zh_CN';

const dateFormat = 'YYYY-MM-DD HH:mm:ss'

class AttentionList extends React.Component{
    formRef = React.createRef();
    constructor(props){
        super(props);
        this.state = {
            dataList:[],/* 列表输入*/
            pageNum: 1,
            pageSize: 100,
            visible: false,/* 新建右测栏 */
            type: 'add',
            values:{}, /* 查询条件组装的对象*/
            forms: {
                list: {
                    attentionStatus: [],/*关注用户状态*/
                },
                formValue: {}, /* 单条记录表单对象*/
                timeLineData: [],/* 时间轴数据对象数组*/
            },
            visibleTimeline: false,
        }
    }

    // 调用接口，设置初始化值
    initValues =() => {
        getAllAttentions((data)=>{
            this.setState({
                dataList: data,
            })
        },error => {
            console.log("error "+error)
        });
    };
    componentDidMount(){
        this.initValues();
        // 获取枚举代码类型
        const forms = this.state.forms
        getCodeByType({codeType:"ATTENTION_STATUS"},result => {
            forms.list.attentionStatus = result
            this.setState({
                forms
            })
        })
    }

    // 展示抽屉弹层，参数为：列表记录和操作类型
    showDrawer = (values,type) => {
        const {forms} = this.state
        console.log({values})
        forms.formValue = {
            ...values,
            createtime: moment(values.createtime,dateFormat)
        }
        console.log(forms.formValue)
        this.setState({
            visible: true,
            type: type,
            forms
        });
    };



    showTimeline = (values) => {
        const {forms} = this.state
        forms.formValue = values
        getListAttentionsByName({username:values.username},result => {
            forms["timeLineData"] = result
            this.setState({
                forms,
                visibleTimeline: true
            })
        })
    }

    // 更新关注信息
    updateAttention = () => {
        const {formValue} = this.state.forms
        updateAttention(formValue,(result)=>{
            if (result.status === 200){
                message.success('关注信息修改成功');
                this.initValues();
            }
        })
    }

    // 关闭抽屉弹层
    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    onCloseTimeline = () => {
        this.setState({
            visibleTimeline: false,
        });
    }

    /* 删除管理员*/
    deleteAttention = (record) => {
        Modal.confirm({
            title:`确认删除`,
            onOk:  ()=>{
                deleteAttentionById(record.id,result => {
                    if (result.status === 200) {
                        message.success('删除成功');
                        this.initValues();
                    }
                });
            }
        });
    }

    // 搜索查询提交调用的方法，获取符合条件的数据List
    onFinish = values => {
        this.setState({values});
        const {pageNum,pageSize} = this.state
        getListAttentions({attention:values,page:pageNum,size:pageSize},result => {
            this.setState({
                dataList: result
            })
        })
    };

    // 抽屉弹层表单项改变触发函数
    onFormChange = values => {
        console.log("value",values)
        const {forms} = this.state
        forms.formValue = values
        this.setState({
            forms
        })
    }

    render(){

        const {forms,dataList} = this.state
        const columns = [
            {   title: '序号',
                width: 50,
                align: 'center',
                render:(text,record,index)=>`${index+1}`,
            },
            { title: '用户名',width:80, dataIndex: 'username', key: 'username',align: "center",
                render:(text,record,index)=>{
                    return (
                        <Link to={{ pathname : '/admin/user',query:{type:'查看',userId:record.userId}}}>
                            <Tag color="geekblue" key={text}>{text}</Tag>
                        </Link>
                    )
                }
            },
            { title: '关注用户', width:80, dataIndex: 'noticer', key: 'noticer',align:'center',
                render:(text,record)=>{
                    return (
                        <Link to={{ pathname : '/admin/user',query:{type:'查看',userId:record.noticerId}}}>
                            <Tag color="geekblue" key={text}>{text}</Tag>
                        </Link>
                    )
                }
            },
            { title: '关注用户性别', width: 120,dataIndex: 'sex', key: 'usersex' ,align:'center',// 文本溢出...显示
                onCell: () => {
                    return {
                        style: {
                            maxWidth: 15,
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow:'ellipsis',
                            cursor:'pointer',
                        }
                    }
                },
                render: (text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
            },
            { title: '关注用户手机号', width:150, dataIndex: 'phone', key: 'phone',align:'center' },
            { title: '关注时间',width:130,  dataIndex: 'createtime', key: 'createtime',align:'center',
                render: (text,record) => {
                    return (<span onClick={() => this.showTimeline(record)}>{text}</span>)
                }
            },
            { title: '状态', width:100, dataIndex: 'status', key: 'status',align:'center',
                render: (text) => {
                    if (text === "1"){
                        return <Tag color="geekblue" key={text}>1 - 正常关注</Tag>
                    } else if (text === "0") {
                        return <Tag color="geekblue" key={text}>0 - 取消关注</Tag>
                    }
                }
            },
            {
                title: '操作', width:150, dataIndex: '', key: 'x',align:'center',
                render: (value, record) => {
                    return (
                        <div>
                            {/*<Link style={styles.removeBtn} to={{ pathname : '/admin/user',query:{type:'查看',record:record}}}>查看</Link>
                    <Link style={styles.removeBtn} to={{ pathname : '/admin/user',query:{type:'编辑',record:record}}}>编辑</Link>*/}
                            <a onClick={() => this.showDrawer(record,'search')} style={styles.removeBtn}>查看</a>
                            <a onClick={() => this.showDrawer(record,'edit')} style={styles.removeBtn}>编辑</a>
                            <a onClick={() => this.deleteAttention(record)} style={styles.removeBtn}>删除</a>
                        </div>
                    );
                },
            },
        ];

        return(
            <div style={{background:'#f0f2f5',height:'100%'}}>
                <Card size="small" style={{height:'20%'}}>
                    <Breadcrumb >
                        <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                        <Breadcrumb.Item>关注信息列表</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{marginTop:'10px'}}>
                        <Form ref={this.formRef} name="advanced_search"
                              className="ant-advanced-search-form" onFinish={this.onFinish}
                        >
                            <Row gutter={24}>
                                <Col span={6}>
                                    <Form.Item name="username" label="用户名">
                                        <Input placeholder="用户名" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item name="noticer" label="关注用户">
                                        <Input placeholder="请输入被关注用户名" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item name="status" label="状态">
                                        <Select placeholder="请选择账号状态">
                                            {
                                                forms.list.attentionStatus.map((item,index) => {
                                                    return <Select.Option key={index} value={item.codeName}>{item.codeName} - {item.description}</Select.Option>
                                                })
                                            }
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <div style={{float:'right'}}>
                                        <Button type="primary" style={{ marginRight: '8px' }} htmlType="submit">Search</Button>
                                        <Button type={"primary"} onClick={() => {this.formRef.current.resetFields();}}>
                                            Clear
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Card>
                <Card size="small" style={{marginTop:'15px',height:'76%'}}>
                    <Table
                        columns={columns}
                        dataSource={dataList}
                        scroll={{ y: 310 }}
                        size="middle"
                        key="attention"
                    />
                    <AttentionRightShow
                        onClose={this.onClose}
                        visible={this.state.visible}
                        type={this.state.type}
                        initValues={this.initValues}
                        forms={forms}
                        onFormChange={this.onFormChange}
                        updateAttention={this.updateAttention}
                    />
                    <AttentionTimeline
                        formValue={forms.formValue}
                        timeLineData={forms.timeLineData}
                        visibleTimeline={this.state.visibleTimeline}
                        onCloseTimeline={this.onCloseTimeline}
                    />
                </Card>
            </div>
        );
    }

}

export default AttentionList

const styles = {
    removeBtn: {
        marginLeft: 8,
    },
}