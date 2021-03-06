/**
 * 1、评论信息列表
 */
import React from 'react'
import {deleteComment, getCodeByType, getListComments, updateComment} from "../../api";
import {Link} from "react-router-dom";
import {Button, Card, Col, Input, Row, Tooltip, Breadcrumb,Pagination, Form, Table, Tag, Modal, message, Select} from "antd";
import CommentRightShow from './commentRightShow'
import moment from 'moment'
import 'moment/locale/zh-cn';
import util from "../../util/util";

const { Option } = Select;
const dateFormat = 'YYYY-MM-DD HH:mm:ss'

class MyComment extends React.Component {
    formRef = React.createRef();
    constructor(props){
        super(props);
        this.state = {
            dataList:[],
            pageNum: 1,
            pageSize: 100,
            visible: false,
            isLoading:false,
            type: '',
            searchValues: {},
            form: {
                lists: {
                    STATUS: [],/*帖子和评论状态*/
                },
                formValue: {},/* 单条记录组成的对象*/
            }
        }
        this.updateComment = this.updateComment.bind(this)
    }

    componentDidMount(){
        const {form} = this.state
        this.init();
        getCodeByType({codeType:"STATUS"},result => {
            form.lists.STATUS = result
            this.setState({
                form
            })
        })
    }

    init = () => {
        const {pageNum,pageSize} = this.state;
        this.setState({isLoading:true});
        getListComments({comment:{},page:pageNum,size:pageSize},result => {
            this.setState({
                dataList: result,
                isLoading:false,
            })
        })
    };

    onFormChange = (values) => {
        const {form} = this.state
        form.formValue = values
        this.setState({
            form
        })
    }
    /* 搜索框表单提交 */
    onFinish = values => {
        this.setState({searchValues: values});
        const {pageNum,pageSize} = this.state
        getListComments({comment:values,page:pageNum,size:pageSize},result => {
            this.setState({
                dataList: result
            })
        })
    };

    /* 右侧显示详情页（查看/修改）*/
    showDrawer = (values,type) => {
        const {form} = this.state
        // 1、将接口中的日期字符串转化成moment对象
        form.formValue = {
            ...values,
            createtime: moment(values.createtime,dateFormat)
        }
        this.setState({
            visible: true,
            type: type,
            form
        });

    };

    /* 关闭右侧抽屉显示页 */
    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    /* 更新评论信息 */
    updateComment(){
        const {formValue} = this.state.form
        const data = {
            ...formValue,
            createtime: formValue.createtime.format(dateFormat)
        }
        updateComment(data,(result)=>{
            if (result === true){
                message.success('评论信息修改成功');
                this.init();
            }
        })
    }
    /* 删除评论信息 */
    deleteComment = (record) => {
        Modal.confirm({
            title:`确认删除该评论信息！`,
            onOk:  ()=>{
                deleteComment(record.id,result => {
                    if (result === true) {
                        message.success('删除成功');
                        this.init();
                    }
                });
            }
        });
    };

    /* 列表操作选项 */
    operatorRender = (value, record,index) => {
        return (
            <div>
                <a onClick={() => this.showDrawer(record,'search')} style={styles.removeBtn}>查看</a>
                <a onClick={() => this.showDrawer(record,'edit')} style={styles.removeBtn}>编辑</a>
                <a onClick={() => this.deleteComment(record)} style={styles.removeBtn}>删除</a>
            </div>
        );
    };


    contentCell = () => {
        return {
            style: {
                maxWidth: 150,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow:'ellipsis',
                cursor:'pointer'
            }
        }
    }

    render(){
        const {form,dataList,isLoading,visible,type} = this.state
        return(
            <div style={{background:'#f0f2f5',height:'100%'}}>
                <Card size="small" style={{height:'20%'}}>
                    <Breadcrumb >
                        <Breadcrumb.Item>评论管理</Breadcrumb.Item>
                        <Breadcrumb.Item>评论信息列表</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{marginTop:'10px'}}>
                        <Form ref={this.formRef} name="advanced_search"
                              className="ant-advanced-search-form" onFinish={this.onFinish}
                        >
                            <Row gutter={24}>
                                <Col span={6}>
                                    <Form.Item name="name" label="评论人">
                                        <Input placeholder="评论人" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item name="invitationTitle" label="帖子标题">
                                        <Input placeholder="帖子标题" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item name="status" label="状态">
                                        <Select placeholder="请选择账号状态">
                                            {
                                                form.lists.STATUS.map(item => {
                                                    return <Option value={item.codeName} key={item.id}>{item.codeName} - {item.description}</Option>
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
                    <Table rowKey="id" loading={isLoading} pagination={false}
                           dataSource={dataList} scroll={{ y: 310 }} size="middle">
                        <Table.Column title= '序号' width= {50} align= 'center' fixed= 'left' render={(text,record,index)=>`${index+1}`}/>
                        <Table.Column title= '评论人' width= {100} align= 'center' dataIndex= 'name' render={
                            (text,record)=>{
                                return <Link to={{ pathname : '/admin/user',query:{type:'查看',userId:record.userId}}}><Tag color="geekblue" key={text}>{text}</Tag></Link>
                            }
                        }/>
                        <Table.Column title= '评论内容' width= {200} align= 'center' dataIndex= 'content' onCell={this.contentCell} render={(text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>}/>
                        <Table.Column title= '评论帖子标题' width= {130} align= 'center' dataIndex= 'invitationTitle'/>
                        <Table.Column title= '帖子发布人' width= {100} align= 'center' dataIndex= 'invitationName' render={
                            (text,record)=>{
                                return <Link to={{ pathname : '/admin/user',query:{type:'查看',userId:record.issuerId}}}><Tag color="geekblue" key={text}>{text}</Tag></Link>
                            }
                        }/>
                        <Table.Column title= '状态' width= {80} align= 'center' dataIndex= 'status' render={text => util.textAndOptionsTag(text,form.lists.STATUS)}/>
                        <Table.Column title= '被举报次数' width= {100} align= 'center' dataIndex= 'reports' render={(text) => <Tag color="red" key={text}>{text}</Tag>}/>
                        <Table.Column title= '点赞次数' width= {100} align= 'center' dataIndex= 'amount' render={(text) => <Tag color="red" key={text}>{text}</Tag>}/>
                        <Table.Column title= '评论时间' width= {150} align= 'center' dataIndex= 'createtime' />
                        <Table.Column title= '操作' fixed= 'right' width= {130} align= 'center' dataIndex= '' render={this.operatorRender}/>
                    </Table>
                    <CommentRightShow
                        onClose={this.onClose}
                        visible={visible}
                        type={type}
                        form={form}
                        onFormChange={this.onFormChange}
                        updateComment={this.updateComment}
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

export default MyComment

const styles = {
    removeBtn: {
        marginLeft: 8,
    },
    titleStyles: {
        maxWidth: 15,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow:'ellipsis',
        cursor:'pointer'
    }
}
/**
 * 1、DatePicker接收的moment对象，接口返回的是字符串
 *    需要在回显和接口提交时进行转换
 * 2、转换的时机：
 *       1、提交更新数据时
 *       2、触发表单的onValuesChange时间时
 */