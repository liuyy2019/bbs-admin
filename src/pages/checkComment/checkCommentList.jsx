/**
 * 1、审核举报评论模块
 */
import React from 'react'
import {deleteComment, getCodeByType, getListComments, updateComment} from "../../api";
import {Link} from "react-router-dom";
import {Button, Card, Col, Pagination,Input, Row, Breadcrumb, Form, Table, Modal, message, Select} from "antd";
import CheckCommentDrawer from './checkCommentDrawer'
import {ExclamationCircleOutlined} from "@ant-design/icons";
import util from "../../util/util";
import moment from "moment";

const FormItem = Form.Item
const {Option} = Select;
class CheckCommentList extends React.Component {
    formRef = React.createRef();
    constructor(props){
        super(props);
        this.state = {
            dataList:[],
            pageNum: 1,
            pageSize: 100,
            visible: false,
            isLoading: false,
            type: 'detail',
            values: {},
            form: {
                selectLists: {
                   STATUS: []
                },
                formValue: {}
            },
        }
    }

    componentWillMount(){
        const {form} = this.state
        this.init();
        getCodeByType({codeType:"STATUS"},result => {
            form.selectLists.STATUS = result
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
                isLoading: false,
            })
        })
    };

    /* 搜索框表单提交 */
    onFinish = values => {
        this.setState({values});
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
        form.formValue = {
            ...values,
            createtime: moment(values.createtime,util.dateFormat)
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

    /* 删除评论信息 */
    deleteComment = (record) => {
        Modal.confirm({
            icon: <ExclamationCircleOutlined />,
            content: '确认删除该评论信息！',
            okText: '删除',
            okType: 'danger',
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

    /* 更新信息*/
    updateComment = () => {
        const {formValue} = this.state.form
        const params = {
            ...formValue,
            createtime: formValue.createtime.format(util.dateFormat)
        }
        updateComment(params,(result)=>{
            if (result === true){
                message.success('修改成功');
                this.init();
                this.onClose()
            }
        })
    }

    /* 表单更新同步更新到formValue中*/
    formChange = (values) => {
        const {form} = this.state
        form.formValue = values
        this.setState({
            form
        })
    }

    /* 列表操作选项 */
    operatorRender = (value, record,index) => {
        return (
            <div>
                <a onClick={() => this.showDrawer(record,'detail')} style={styles.removeBtn}>查看</a>
                <a onClick={() => this.showDrawer(record,'edit')} style={styles.removeBtn}>编辑</a>
                <a onClick={() => this.deleteComment(record)} style={styles.removeBtn}>删除</a>
            </div>
        );
    };

    render(){
        const {form,dataList,type,visible,isLoading} = this.state
        let title = [util.titlePrefix[type], '评论举报审核信息'].join('')
        const disabledFlag = type === 'detail'
        return(
            <div style={{background:'#f0f2f5',height:'100%'}}>
                <Card size="small" style={{height:'20%'}}>
                    <Breadcrumb>
                        <Breadcrumb.Item>审核中心</Breadcrumb.Item>
                        <Breadcrumb.Item>评论举报审核</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{marginTop:'10px'}}>
                        <Form ref={this.formRef} name="advanced_search"
                              className="ant-advanced-search-form" onFinish={this.onFinish}
                        >
                            <Row gutter={24}>
                                <Col span={6}>
                                    <FormItem name="name" label="评论人">
                                        <Input placeholder="评论人" />
                                    </FormItem>
                                </Col>
                                <Col span={6}>
                                    <FormItem name="invitationTitle" label="帖子标题">
                                        <Input placeholder="帖子标题" />
                                    </FormItem>
                                </Col>
                                <Col span={6}>
                                    <FormItem name="status" label="状态" required>
                                        <Select placeholder="请选择状态" allowClear>
                                            {
                                                form.selectLists.STATUS.map((item,index) => {
                                                    return <Option key={index} value={item.codeName} key={item.id}>{item.codeName} - {item.description}</Option>
                                                })
                                            }
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span={6}>
                                    <div style={{float:'right'}}>
                                        <Button type="primary" style={{ marginRight: '8px' }} htmlType="submit">搜索</Button>
                                        <Button type={"primary"} onClick={() => {this.formRef.current.resetFields();}}>
                                            清除
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Card>
                <Card size="small" style={{marginTop:'15px',height:'76%'}}>
                    <Table rowKey="id" loading={isLoading} pagination={false}
                           dataSource={dataList} scroll={{ y: 230}} size="middle">
                        <Table.Column title= '序号' width= {50} align= 'center' fixed= 'left' render={(text,record,index)=>`${index+1}`}/>
                        <Table.Column title= '评论人' width= {100} align= 'center' dataIndex= 'name' render={
                            (text,record)=>{
                                return <Link to={{ pathname : '/admin/user',query:{type:'查看',userId:record.userId}}}>{util.textTag(text,'geekblue')}</Link>
                            }
                        }/>
                        <Table.Column title= '评论内容' width= {200} align= 'center' dataIndex= 'content' ellipsis={true}/>
                        <Table.Column title= '状态' width= {80} align= 'center' dataIndex= 'status' render={text => util.textAndOptionsTag(text,form.selectLists.STATUS,'geekblue')}/>
                        <Table.Column title= '被举报次数' width= {100} align= 'center' dataIndex= 'reports' render={
                            (text,record) => {
                                return <Link to={{ pathname : '/admin/reportComment',state:{commentId:record.id}}}>{util.textTag(text,'geekblue')}</Link>
                            }
                        }/>
                        <Table.Column title= '评论时间' width= {150} align= 'center' dataIndex= 'createtime' />
                        <Table.Column title= '操作' fixed= 'right' width= {130} align= 'center' dataIndex= '' render={this.operatorRender}/>
                    </Table>
                    <CheckCommentDrawer
                        onClose={this.onClose}
                        visible={visible}
                        disabledFlag={disabledFlag}
                        title={title}
                        type={type}
                        forms={form}
                        updateComment={this.updateComment}
                        formChange={this.formChange}
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

export default CheckCommentList

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
 * 总结：
 *      1、类组件修改为函数组件
 *      2、table中多余指定的width，使用ellipsis={true}会...显示
 */
