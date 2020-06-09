import React from 'react'
import {deleteComment, getCodeByType, getListComments} from "../../api";
import {Link} from "react-router-dom";
import {Button, Card, Col, Input, Row, Tooltip, Breadcrumb, Form, Table, Tag, Modal, message, Select} from "antd";
import CheckCommentRightShow from './checkCommentRightShow'
import {ExclamationCircleOutlined} from "@ant-design/icons";


const {Option} = Select;
class CheckCommentList extends React.Component {
    formRef = React.createRef();
    constructor(props){
        super(props);
        this.state = {
            data:[],
            pageNum: 1,
            pageSize: 100,
            visible: false,
            isLoading: false,
            type: '',
            values: {},
            status: [],
        }
    }

    componentWillMount(){
        this.init();
        getCodeByType({codeType:"STATUS"},result => {
            this.setState({
                status: result
            })
        })
    }

    init = () => {
        const {pageNum,pageSize} = this.state;
        this.setState({isLoading:true});
        getListComments({comment:{},page:pageNum,size:pageSize},result => {
            console.log(result)
            this.setState({
                data: result,
                isLoading: false,
            })
        })
    };

    /* 搜索框表单提交 */
    onFinish = values => {
        this.setState({values});
        const {pageNum,pageSize} = this.state
        getListComments({comment:values,page:pageNum,size:pageSize},result => {
            console.log(result)
            this.setState({
                data: result
            })
        })
    };

    /* 右侧显示详情页（查看/修改）*/
    showDrawer = (values,type) => {
        this.setState({
            visible: true,
            type: type,
            values: values
        });
        console.log(this.state)
    };

    /* 关闭右侧抽屉显示页 */
    onClose = () => {
        this.setState({
            visible: false,
        });
        this.init()
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

    /* 状态返回值对应 */
    statusRender = (text) => {
        if (text==="0") {
            return <Tag color="geekblue" key={text}>0 - 审核中</Tag>;
        } else if (text==="1") {
            return <Tag color="geekblue" key={text}>1 - 正常</Tag>;
        } else if (text ==="2") {
            return <Tag color="geekblue" key={text}>2 - 屏蔽</Tag>;
        }
    };

    render(){
        return(
            <div style={{background:'#f0f2f5',height:'100%'}}>
                <Card size="small" style={{height:'20%'}}>
                    <Breadcrumb >
                        <Breadcrumb.Item>审核中心</Breadcrumb.Item>
                        <Breadcrumb.Item>评论举报审核</Breadcrumb.Item>
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
                                        <Select placeholder="请选择状态">
                                            {
                                                this.state.status.map(item => {
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
                    <Table rowKey="id" loading={this.state.isLoading}
                           dataSource={this.state.data} scroll={{ y: 230,x: 1000  }} size="middle">
                        <Table.Column title= '序号' width= {50} align= 'center' fixed= 'left' render={(text,record,index)=>`${index+1}`}/>
                        <Table.Column title= '评论人' width= {100} align= 'center' dataIndex= 'name' render={
                            (text,record)=>{
                                return <Link to={{ pathname : '/admin/user',query:{type:'查看',userId:record.userId}}}><Tag color="geekblue" key={text}>{text}</Tag></Link>
                            }
                        }/>
                        <Table.Column title= '评论内容' width= {200} align= 'center' dataIndex= 'content' ellipsis={true} render={(text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>}/>
                        <Table.Column title= '状态' width= {80} align= 'center' dataIndex= 'status' render={this.statusRender}/>
                        <Table.Column title= '被举报次数' width= {100} align= 'center' dataIndex= 'reports' render={
                            (text,record) => {
                                return <Link to={{ pathname : '/admin/reportComment',state:{commentId:record.id}}}><Tag color="geekblue" key={text}>{text}</Tag></Link>
                            }
                        }/>
                        <Table.Column title= '评论时间' width= {150} align= 'center' dataIndex= 'createtime' />
                        <Table.Column title= '操作' fixed= 'right' width= {130} align= 'center' dataIndex= '' render={this.operatorRender}/>
                    </Table>
                    <CheckCommentRightShow
                        onClose={this.onClose}
                        visible={this.state.visible}
                        type={this.state.type}
                        values={this.state.values}
                        status={this.state.status}
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