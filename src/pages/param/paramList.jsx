import React from 'react'
import {deleteParam,getListParams} from "../../api";
import {Button, Card, Col, Input, Row, message, Tooltip, Breadcrumb, Form, Table, Modal, Tag, Select} from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ParamRightShow from './paramRightShow'


const {Option} = Select
const { confirm } = Modal;
class ParamList extends React.Component {
    formRef = React.createRef();
    constructor(props){
        super(props);
        this.state = {
            data:[],
            pageNum: 1,
            pageSize: 5,
            visible: false,/* 新建右测栏 */
            isLoading:false,
            type: 'add',
            values:{},
        };
    }

    initValues = () => {
        this.setState({isLoading:true});
        getListParams({param:{},page: 1,size: 100},result => {
            console.log(result);
            this.setState({
                data: result,
                isLoading:false,
            })
        })
    }
    componentWillMount(){
        this.initValues();
    }

    /* 搜索框表单提交 */
    onFinish = values => {
        this.setState({values});
        console.log(values);
        getListParams({param:values,page:1,size:100},result => {
            console.log(result)
            this.setState({
                data: result
            })
        })
    };

    showDrawer = (values,type) => {
        this.setState({
            visible: true,
            type: type,
            values: values
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
            type: '',
            values: {}
        });
        this.initValues();
    };
    deleteParam= (record)=> {
        let _this = this
        confirm({
            icon: <ExclamationCircleOutlined />,
            content: '确定删除当前参数信息',
            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                deleteParam(record.id,result => {
                    if (result === true){
                        message.success('参数删除成功');
                        _this.initValues();
                    }
                })
            },
            onCancel() {
                console.log(record.id);
            },
        });
    }

    operatorRender = (value, record) => {
        return (
            <div>
                <a onClick={() => this.showDrawer(record,'search')} style={styles.removeBtn}>查看</a>
                <a onClick={() => this.showDrawer(record,'edit')} style={styles.removeBtn}>编辑</a>
                <a onClick={() => this.deleteParam(record)} style={styles.removeBtn}>删除</a>
            </div>
        );
    }
    statusRender = (text) => {
        if (text === "0"){
            return <Tag color="geekblue" key={text}>0 - 失效</Tag>
        } else if (text === "1") {
            return <Tag color="geekblue" key={text}>1 - 有效</Tag>
        }
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
        return(
            <div style={{background:'#f0f2f5',height:'100%'}}>
                <Card size="small" style={{height:'20%'}}>
                    <Breadcrumb >
                        <Breadcrumb.Item>参数管理</Breadcrumb.Item>
                        <Breadcrumb.Item>参数信息列表</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{marginTop:'10px'}}>
                        <Form ref={this.formRef} name="advanced_search"
                              className="ant-advanced-search-form" onFinish={this.onFinish}
                        >
                            <Row gutter={24}>
                                <Col span={6}>
                                    <Form.Item name="createBy" label="发布人">
                                        <Input placeholder="发布人" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item name="codeId" label="参数码">
                                        <Input placeholder="参数码" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item name="status" label="状态">
                                        <Select placeholder="请选择状态">
                                            <Option value="0" >0 - 无效</Option>
                                            <Option value="1" >1 - 有效</Option>
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
                <Card title="帖子种类列表" extra={<Button type="primary" onClick={()=>this.showDrawer({},'add')}>新建</Button>} size="small" style={{marginTop:'15px',height:'76%'}}>
                    <Table rowKey="id" loading={this.state.isLoading}
                           dataSource={this.state.data} scroll={{ y: 230 }} size="middle" >
                        <Table.Column title= '序号' width= {50} align= 'center' fixed= 'left' render={(text,record,index)=>`${index+1}`}/>
                        <Table.Column title= '参数码' width= {220} align= 'center' dataIndex= 'codeId' ellipsis={true}/>
                        <Table.Column title= '参数值' width= {100} align= 'center' dataIndex= 'codeName' style={styles.titleStyles} render={(text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>}/>
                        <Table.Column title= '描述' width= {150} align= 'center' dataIndex= 'description' style={styles.titleStyles}
                                      onCell={this.contentCell}
                                      render={(text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>}
                        />
                        <Table.Column title= '参数状态' width= {100} align= 'center' dataIndex= 'status' render={this.statusRender}/>
                        <Table.Column title= '发布人' width= {100} align= 'center' dataIndex= 'createBy'/>
                        <Table.Column title= '操作' width= {130} align= 'center' dataIndex= '' render={this.operatorRender}/>
                    </Table>
                    <ParamRightShow
                        onClose={this.onClose}
                        visible={this.state.visible}
                        type={this.state.type}
                        values={this.state.values}
                        initValues={this.initValues}
                    />
                </Card>
            </div>
        );
    }
}

export default ParamList

const styles = {
    removeBtn: {
        marginLeft: 8,
    },
}