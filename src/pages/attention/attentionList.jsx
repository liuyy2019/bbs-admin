/**
 * 1、关注用户模块
 */
import React from 'react';
import {
    Table,
    Card,
    Breadcrumb,
    Form,
    Row,
    Col,
    Input,
    Button,
    Tag,
    Modal,
    message,
    Select,
    Pagination,
} from 'antd';
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
import util from "../../util/util";
import data from "./data";

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
            isLoading: false,
            type: 'detail',
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
        this.setState({isLoading:true})
        getAllAttentions((data)=>{
            this.setState({
                dataList: data,
                isLoading: false
            })
        },error => {
            console.log("error "+error)
        });
    };

    componentDidMount(){
        this.initValues();
        // 获取枚举代码类型
        const forms = this.state.forms;
        getCodeByType({codeType:"ATTENTION_STATUS"},result => {
            forms.list.attentionStatus = result || [
                {"id":11,"codeType":"ATTENTION_STATUS","codeName":"0","description":"取消关注","status":"1","createTime":"2020-05-25 10:12:24","createBy":"admin"},
                {"id":12,"codeType":"ATTENTION_STATUS","codeName":"1","description":"正常关注","status":"1","createTime":"2020-05-25 10:12:39","createBy":"admin"}
            ];
            this.setState({
                forms
            })
        })
    }

    // 展示抽屉弹层，参数为：列表记录和操作类型
    showDrawer = (values,type) => {
        const {forms} = this.state;
        forms.formValue = {
            ...values,
            createtime: moment(values.createtime,dateFormat)
        };
        console.log(forms.formValue);
        this.setState({
            visible: true,
            type: type,
            forms
        });
    };



    showTimeline = (values) => {
        const {forms} = this.state;
        forms.formValue = values;
        getListAttentionsByName({username:values.username},result => {
            forms["timeLineData"] = result;
            this.setState({
                forms,
                visibleTimeline: true
            })
        })
    };

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
        const {forms} = this.state
        forms.formValue = values
        this.setState({
            forms
        })
    }

    render(){

        const {forms,dataList,isLoading,type,visible} = this.state

        const columns = data.getAttentionColumns.call(this)
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
                        loading={isLoading}
                        pagination={false}
                        scroll={{ y: 305 }}
                        size="middle"
                        key="attention"
                    />
                    <AttentionRightShow
                        visible={visible}
                        type={type}
                        initValues={this.initValues}
                        forms={forms}
                        onFormChange={this.onFormChange}
                        onClose={this.onClose}
                        updateAttention={this.updateAttention}
                    />
                    <AttentionTimeline
                        formValue={forms.formValue}
                        timeLineData={forms.timeLineData}
                        visibleTimeline={this.state.visibleTimeline}
                        onCloseTimeline={this.onCloseTimeline}
                    />
                    <div style={{position:"absolute",right:"10px",bottom:'20px'}}>
                        <Pagination
                            showSizeChanger
                            defaultCurrent={3}
                            total={500}
                        />
                    </div>
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