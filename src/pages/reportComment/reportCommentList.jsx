/* 评论举报列表组件 */
import React from 'react'
import {
    deleteEnumType,
    getCodeByType,
    getListReportComments,
    getListReportCommentsById,
} from "../../api";
import {Link} from "react-router-dom";
import {Button, Card, Col, Input, Row, Tooltip, Breadcrumb, Form, Table, Modal,Tag, Select, message} from "antd";
import ReportCommentRightShow from "./reportCommentRightShow";
import ReportCommentTimeline from "./reportCommentTimeline";
import {ExclamationCircleOutlined} from "@ant-design/icons";



class ReportCommentList extends React.Component {
    formRef = React.createRef();
    constructor(props){
        super(props);
        this.state = {
            data:[],
            pageNum: 1,
            pageSize: 100,
            visible: false,
            isLoading:false,
            type: '',
            values: {},
            commentId: this.props.location.state.commentId,
            visibleTimeline: false,/*默认不显示时间轴*/
            TimelineValues:[],/*时间轴数据*/
            status: [],/*评论、帖子状态标识*/
        }
    }

    initValues = () => {
        const {pageNum,pageSize,commentId} = this.state;
        this.setState({isLoading:true});
        getListReportComments({reportComment:{commentId:commentId},page:pageNum,size:pageSize},result => {
            console.log(result)
            this.setState({
                data: result,
                isLoading:false,
            })
        })
    }
    componentWillMount(){
        this.initValues();
        getCodeByType({codeType:"REPORT_STATUS"},result => {
            this.setState({
                status: result
            })
        })
    }

    /* 搜索框表单提交 */
    onFinish = values => {
        this.setState({values});
        console.log(values)
        const {pageNum,pageSize} = this.state
        getListReportComments({reportComment:values,page:pageNum,size:pageSize},result => {
            console.log(result)
            this.setState({
                data: result
            })
        })
    };

    /* 显示右侧浮层 */
    showDrawer = (values,type) => {
        this.setState({
            visible: true,
            type: type,
            values: values
        });
        console.log(this.state)
    };
    showTimeline =(record)=>{
        this.setState({
            visibleTimeline: true,
        });
        getListReportCommentsById({commentId: record.commentId},result => {
            this.setState({
                TimelineValues: result
            })
        })
    };

    /* 关闭右侧浮层 */
    onClose = () => {
        this.setState({
            visible: false,
        });
        this.initValues();
    };
    onCloseTimeline = () => {
        this.setState({
            visibleTimeline: false,
        });
    };

    deleteReportComment = (record) => {
        let _this = this
        Modal.confirm({
            icon: <ExclamationCircleOutlined />,
            content: '确定删除评论举报信息',
            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                deleteEnumType(record.id,result => {
                    if (result === true){
                        message.success('评论举报信息删除成功');
                        _this.initValues();
                    }
                })
            },
        });
    };

    operatorRender = (value, record) => {
        return (
            <div>
                <a onClick={() => this.showDrawer(record,'search')} style={styles.removeBtn}>查看</a>
                <a onClick={() => this.showDrawer(record,'edit')} style={styles.removeBtn}>编辑</a>
                <a onClick={() => this.deleteReportComment(record)} style={styles.removeBtn}>删除</a>
            </div>
        );
    }
    statusRender = (text) => {
        if (text === "0") {
            return <Tag color="geekblue" key={text}>0 - 注销</Tag>
        } else if (text === "1") {
            return <Tag color="geekblue" key={text}>1 - 正常</Tag>
        } else if (text === "2") {
            return <Tag color="geekblue" key={text}>2 - 停用</Tag>
        }
    }

    styleFont = () => {
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
        return(
            <div style={{background:'#f0f2f5',height:'100%'}}>
                <Card size="small" style={{height:'20%'}}>
                    <Breadcrumb >
                        <Breadcrumb.Item>评论管理</Breadcrumb.Item>
                        <Breadcrumb.Item>评论举报记录</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{marginTop:'10px'}}>
                        <Form ref={this.formRef} name="advanced_search"
                              className="ant-advanced-search-form" onFinish={this.onFinish}
                        >
                            <Row gutter={24}>
                                <Col span={6}>
                                    <Form.Item name="commentName" label="评论人">
                                        <Input placeholder="评论人" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item name="status" label="状态">
                                        <Select placeholder="请选择账号状态">
                                            {
                                                this.state.status.map(item => {
                                                    return <option value={item.codeName}>{item.codeName} - {item.description}</option>
                                                })
                                            }
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item name="reportName" label="举报人">
                                        <Input placeholder="举报人" />
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
                    <Table rowKey="id" loading={this.state.isLoading}
                           dataSource={this.state.data} scroll={{ y: 255,x: 1000  }} size="middle" pagination={true}>
                        <Table.Column title= '序号' width= {50} align= 'center' fixed= 'left' render={(text,record,index)=>`${index+1}`}/>
                        <Table.Column title= '评论人' width= {100} align= 'center' dataIndex= 'commentName' render={
                            (text,record)=>{
                                return <Link to={{ pathname : '/admin/user',query:{type:'查看',userId:record.commentId}}}><Tag color="geekblue" key={text}>{text}</Tag></Link>
                            }
                        }/>
                        <Table.Column title= '举报时间' width= {150} align= 'center' dataIndex= 'createTime' style={styles.style} render={(text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>}/>
                        <Table.Column title= '举报原因' width= {150} align= 'center' dataIndex= 'reportReason' onCell={() => this.styleFont()} render={(text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>} />
                        <Table.Column title= '举报人' width= {100} align= 'center' dataIndex= 'reportName' render={
                            (text,record)=>{
                                return <Link to={{ pathname : '/admin/user',query:{type:'查看',userId:record.reportId}}}><Tag color="geekblue" key={text}>{text}</Tag></Link>
                            }
                        }/>
                        <Table.Column title= '状态' width= {100} align= 'center' dataIndex= 'status' render={this.statusRender}/>
                        <Table.Column title= '时间轴' width= {150} align= 'center' dataIndex= 'updateTime'
                              render={
                                  (text,record) => <a onClick={() => this.showTimeline(record)}>时间轴</a>
                              }
                        />
                        <Table.Column title= '操作' width= {130} fixed= 'right' align= 'center' dataIndex= '' render={this.operatorRender}/>
                    </Table>
                    <ReportCommentRightShow
                        onClose={this.onClose}
                        visible={this.state.visible}
                        type={this.state.type}
                        values={this.state.values}
                        initValues={this.initValues}
                        status={this.state.status}
                    />
                    <ReportCommentTimeline
                        onCloseTimeline={this.onCloseTimeline}
                        visibleTimeline={this.state.visibleTimeline}
                        TimelineValues={this.state.TimelineValues}
                    />
                    {/*<div style={{position:"absolute",right:"10px",bottom:'20px'}}>
                        <Pagination
                            showSizeChanger
                            defaultCurrent={3}
                            total={500}
                        />
                    </div>*/}
                </Card>
            </div>
        );
    }
}

export default ReportCommentList

const styles = {
    removeBtn: {
        marginLeft: 8,
    }
}