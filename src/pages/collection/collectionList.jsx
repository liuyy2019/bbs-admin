import React from 'react';
import {
    Table,
    Card,
    Form,
    Breadcrumb,
    Tooltip,
    Pagination,
    Row,
    Col,
    Input,
    Button,
    Tag,
    message,
    Modal,
    Select,
} from 'antd';
import {deleteCollection, getAllAnnouncements, getAllCollections, getAllTypes, getListCollections} from "../../api";
import {Link} from "react-router-dom";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import RightShow from "./rightShow";


/*
const columns = [
    {   title: '序号', width: 50, align: 'center',fixed: 'left',
        render:(text,record,index)=>`${index+1}`,
    },
    { title: '收藏者',width: 100, dataIndex: 'collector',ellipsis: true, key: 'collector',align: "center" },
    { title: '帖子标题', width: 150,dataIndex: 'title', key: 'title' ,align:'center',// 文本溢出...显示
        onCell: () => {
            return {
                style: {
                    maxWidth: 15,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow:'ellipsis',
                    cursor:'pointer'
                }
            }
        },
        render: (text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
    },
    { title: '收藏时间', width: 100,dataIndex: 'createtime', key: 'createtime',align:'center' },
    { title: '帖子类型', width: 100,dataIndex: 'type', key: 'type',align:'center' },
    { title: '帖子状态', width: 100,dataIndex: 'status', key: 'status',align:'center' },
    {
        title: '操作', width: 200,dataIndex: '', key: 'x',align:'center',
        render: (value, record) => {
            return (
                <div>
                    <Link style={styles.removeBtn} to={{ pathname : '/admin/user',query:{type:'查看',record:record}}}>查看</Link>
                    <Link style={styles.removeBtn} to={{ pathname : '/admin/user',query:{type:'编辑',record:record}}}>编辑</Link>
                    <a onClick={() => this.deleteUser(record)} style={styles.removeBtn}>删除</a>
                </div>
            );
        },
    },
];
*/

const {Option} = Select
class CollectionList extends React.Component{
    formRef = React.createRef();
    constructor(props){
        super(props);
        this.state = {
            data:[],
            pageNum: 1,
            pageSize: 5,
            visible: false,/* 新建右测栏 */
            isLoading: false,
            type: 'add',
            values:{},
            typeList: [],/* 帖子类别信息 */
        }
    }

    /* 组件在将要挂载是调用初始化方法 */
    componentWillMount(){
        this.initValues();
        getAllTypes(result => {
            this.setState({
                typeList: result
            })
        })
    }

    /* 列表数据的初始化 */
    initValues = () => {
        this.setState({isLoading:true});
        getAllCollections((data)=>{
            console.log(data);
            this.setState({
                data: data,
                isLoading: false
            })
        },error => {
            console.log("error "+error)
        });
    }

    /* 搜索框表单提交 */
    onFinish = values => {
        this.setState({values});
        console.log(values)
        const {pageNum,pageSize} = this.state
        getListCollections({collection:values,page:pageNum,size:pageSize},result => {
            console.log(result)
            this.setState({
                data: result
            })
        })
    };

    /* 删除收藏记录 */
    deleteCollection = (record) =>{
        let _this = this
        Modal.confirm({
            icon: <ExclamationCircleOutlined />,
            content: '确定删除当前收藏记录？',
            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                deleteCollection(record.id,result => {
                    if (result === true){
                        message.success('收藏记录删除成功');
                        _this.initValues();
                    }
                })
            },
            onCancel() {
                console.log(record.id);
            },
        });
    }

    /* 查看/编辑是右测显示遮罩层 */
    showDrawer = (values,type) => {
        this.setState({
            visible: true,
            type: type,
            values: values
        });
    };
    /* 关闭右测遮罩层*/
    onClose = () => {
        this.setState({
            visible: false,
            type: '',
            values: {}
        });
        this.initValues();
    };

    /* 列表右测操作按钮 */
    operatorRender = (value, record) => {
        return (
            <div>
                <a onClick={() => this.showDrawer(record,'search')} style={styles.removeBtn}>查看</a>
                <a onClick={() => this.showDrawer(record,'edit')} style={styles.removeBtn}>编辑</a>
                <a onClick={() => this.deleteCollection(record)} style={styles.removeBtn}>删除</a>
            </div>
        );
    };


    statusRender = (text) => {
        if (text === "0"){
            return <Tag color="geekblue" key={text}>0 - 取消收藏</Tag>
        } else if (text === "1") {
            return <Tag color="geekblue" key={text}>1 - 正常收藏</Tag>
        }
    };

    render(){
        return(
            <div style={{background:'#f0f2f5',height:'100%'}}>
                <Card size="small" style={{height:'20%'}}>
                    <Breadcrumb >
                        <Breadcrumb.Item>帖子管理</Breadcrumb.Item>
                        <Breadcrumb.Item>收藏信息列表</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{marginTop:'10px'}}>
                        <Form ref={this.formRef} name="advanced_search"
                              className="ant-advanced-search-form" onFinish={this.onFinish}
                        >
                            <Row gutter={24}>
                                <Col span={6}>
                                    <Form.Item name="collector" label="收藏者">
                                        <Input placeholder="收藏者" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item name="title" label="帖子标题">
                                        <Input placeholder="帖子标题" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item name="type" label="类型">
                                        <Select placeholder="请选择类别">
                                            {
                                                this.state.typeList.map((item,index) => {
                                                    return <Option value={item.type} key={index}>{item.type}</Option>
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
                        <Table.Column title= '序号' width= {50} align= 'center'fixed= 'left' render={(text,record,index)=>`${index+1}`}/>
                        <Table.Column title= '收藏者' width= {100} align= 'center' dataIndex= 'collector' ellipsis={true} render={
                            (text,record)=>{
                                return <Link to={{ pathname : '/admin/user',query:{type:'查看',userId:record.userId}}}><Tag color="geekblue" key={text}>{text}</Tag></Link>
                            }
                        }/>
                        <Table.Column title= '帖子标题' width= {150} align= 'center' dataIndex= 'title' style={styles.titleStyles} render={(text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>}/>
                        <Table.Column title= '收藏时间' width= {150} align= 'center' dataIndex= 'createtime' />
                        <Table.Column title= '帖子发布者' width= {150} align= 'center' dataIndex= 'issuer' render={
                            (text,record)=>{
                                return <Link to={{ pathname : '/admin/user',query:{type:'查看',userId:record.issuerId}}}><Tag color="geekblue" key={text}>{text}</Tag></Link>
                            }
                        } />
                        <Table.Column title= '帖子类型' width= {100} align= 'center' dataIndex= 'type'/>
                        <Table.Column title= '帖子状态' width= {100} align= 'center' dataIndex= 'status' render={this.statusRender}/>
                        <Table.Column title= '操作' width= {200} align= 'center' dataIndex= '' render={this.operatorRender}/>
                    </Table>
                    <RightShow
                        onClose={this.onClose}
                        visible={this.state.visible}
                        type={this.state.type}
                        values={this.state.values}
                        initValues={this.initValues}
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

export default CollectionList

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