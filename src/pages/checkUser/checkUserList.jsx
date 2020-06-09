/* 用户举报列表组件 */
import React from 'react'
import {getListUsers, getCodeByType, getParamByCodeId, deleteUserById} from "../../api";
import {Link} from "react-router-dom";
import {Button, Card, Col, Input, Row, Tooltip, Breadcrumb, Form, Table, Tag, Select, Modal, message} from "antd";
import CheckUserRightShow from "./checkUserRightShow";
import {ExclamationCircleOutlined} from "@ant-design/icons";



const {Option} = Select
class CheckUserList extends React.Component {
    formRef = React.createRef();
    constructor(props){
        super(props);
        this.state = {
            data:[],
            pageNum: 1,
            pageSize: 100,
            isLoading:false,
            visible: false,
            type: '',
            values: {},
            reportStatus: [],
            sexList: [],
            email: {},/*参数信息*/
            reportNumber:0
        }
    }

    /* 初始化获取用户列表 */
    initValues = (number) => {
        this.setState({isLoading:true});
        const {pageNum ,pageSize } = this.state;
        getListUsers({user:{reportNumber:number},page:pageNum,size:pageSize},result => {
            this.setState({
                data: result,
                isLoading:false,
            })
        },error => {
            console.log("error "+error)
        });
    };

    componentWillMount(){
        getCodeByType({codeType:"STATUS"},result => {
            this.setState({
                reportStatus: result
            })
        })
        getCodeByType({codeType:"SEX"},result => {
            this.setState({
                sexList: result
            })
        })
        getParamByCodeId("REPORT_USER_NUMBER",result => {
            this.initValues(parseInt(result.codeName));
            this.setState({
                reportNumber: parseInt(result.codeName),
            })
        })

    }

    /* 搜索框表单提交 */
    onFinish = values => {
        values.reportNumber = 15;
        this.setState({values});
        const {pageNum,pageSize} = this.state
        getListUsers({user:values,page:pageNum,size:pageSize},result => {
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
        getParamByCodeId("USER_CHECK_MESSAGE",result => {
            this.setState({
                email:  result,
            })
        })
    };

    /* 关闭右侧浮层 */
    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    /* 删除用户 */
    deleteUser = (record)=>{
        Modal.confirm({
            icon: <ExclamationCircleOutlined />,
            title:`确认删除${record.name}`,
            onOk:  ()=>{
                deleteUserById(record.userId,result => {
                    console.log(record);
                    if (result.status===200) {
                        message.success('删除用户成功');
                        this.getUserList();
                    }
                });
            }
        });
    };

    operatorRender = (value, record,index) => {
        return (
            <div>
                <a onClick={() => this.showDrawer(record,'search')} style={styles.removeBtn}>查看</a>
                <a onClick={() => this.showDrawer(record,'edit')} style={styles.removeBtn}>编辑</a>
                <a onClick={() => this.deleteUser(record)} style={styles.removeBtn}>删除</a>
            </div>
        );
    };

    statusRender = (text) => {
        if (text === 0) {
            return <Tag color="geekblue" key={text}>0 - 注销</Tag>
        } else if (text === 1) {
            return <Tag color="geekblue" key={text}>1 - 正常</Tag>
        } else if (text === 2) {
            return <Tag color="geekblue" key={text}>2 - 停用</Tag>
        }
    };

    /* 多余字体省略号显示，鼠标悬浮显示全部*/
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
    };

    render(){
        return(
            <div style={{background:'#f0f2f5',height:'100%'}}>
                <Card size="small" style={{height:'20%'}}>
                    <Breadcrumb >
                        <Breadcrumb.Item>审核中心</Breadcrumb.Item>
                        <Breadcrumb.Item>用户举报审核</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{marginTop:'10px'}}>
                        <Form ref={this.formRef} name="advanced_search"
                              className="ant-advanced-search-form" onFinish={this.onFinish}
                        >
                            <Row gutter={24}>
                                <Col span={6}>
                                    <Form.Item name="name" label="用户名">
                                        <Input placeholder="用户名" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item name="status" label="状态">
                                        <Select placeholder="请选择状态">
                                            <Option value={0}>0 - 注销</Option>
                                            <Option value={1}>1 - 正常</Option>
                                            <Option value={2}>2 - 停用</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item name="sex" label="性别">
                                        <Select placeholder="请选择状态">
                                            {
                                                this.state.sexList.map(item => {
                                                    return <Option value={item.description} key={item.id}>{item.description}</Option>
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
                    <Table rowKey="userId" dataSource={this.state.data} scroll={{ y: 230,x: 1000  }} size="middle"
                           pagination={true} loading={this.state.isLoading}
                    >
                        <Table.Column title= '序号' width= {50} align= 'center' fixed= 'left' render={(text,record,index)=>`${index+1}`}/>
                        <Table.Column title= '用户名' width= {80} align= 'center' dataIndex= 'name' render={
                            (text,record)=>{
                                return <Link to={{ pathname : '/admin/user',query:{type:'查看',userId:record.userId}}}><Tag color="geekblue" key={text}>{text}</Tag></Link>
                            }
                        }/>
                        {/*<Table.Column title= '发帖数量' width= {90} align= 'center' dataIndex= 'invitationNumber'/>*/}
                        <Table.Column title= '举报次数' width= {90} align= 'center' dataIndex= 'reportNumber'/>
                        <Table.Column title= '性别' width= {80} align= 'center' dataIndex= 'sex' style={styles.style} render={(text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>}/>
                        <Table.Column title= '联系方式' width= {130} align= 'center' dataIndex= 'email' render={
                            (text)=>{
                                return <Tag color="geekblue" key={text}>{text}</Tag>
                            }
                        }/>
                        <Table.Column title= '状态' width= {80} align= 'center' dataIndex= 'status' render={this.statusRender}/>
                        <Table.Column title= '注册时间' width= {130} align= 'center' dataIndex= 'createtime' onCell={() => this.styleFont()} render={(text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>} />
                        <Table.Column title= '操作' width= {130} fixed= 'right' align= 'center' dataIndex= '' render={this.operatorRender}/>
                    </Table>
                    <CheckUserRightShow
                        onClose={this.onClose}
                        visible={this.state.visible}
                        type={this.state.type}
                        values={this.state.values}
                        initValues={this.initValues}
                        reportNumber={this.state.reportNumber}
                        reportStatus={this.state.reportStatus}
                        email={this.state.email}
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

export default CheckUserList

const styles = {
    removeBtn: {
        marginLeft: 8,
    }
}