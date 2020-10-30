import React from 'react'
import {deleteEnumCode,getListEnumCode} from "../../api";
import {Button, Card, Col, Input, Row, message, Tooltip, Breadcrumb, Form, Table, Modal, Tag, Select} from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import EnumTypeRightShow from './enumTypeRightShow'


const { confirm } = Modal;
class EnumTypeList extends React.Component {
    formRef = React.createRef();
    constructor(props){
        super(props);
        this.state = {
            dataList:[],
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
        getListEnumCode({enumCode:{},page: 1,size: 100},result => {
            this.setState({
                dataList: result,
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
        getListEnumCode({enumCode:values,page:1,size:100},result => {
            this.setState({
                dataList: result
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
    };
    deleteEnumType = (record)=> {
        let _this = this
        confirm({
            icon: <ExclamationCircleOutlined />,
            content: '确定删除参数枚举码',
            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                deleteEnumCode(record.id,result => {
                    if (result === true){
                        message.success('参数枚举类型删除成功');
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
                <a onClick={() => this.showDrawer(record,'detail')} style={styles.removeBtn}>查看</a>
                <a onClick={() => this.showDrawer(record,'edit')} style={styles.removeBtn}>编辑</a>
                <a onClick={() => this.deleteEnumType(record)} style={styles.removeBtn}>删除</a>
            </div>
        );
    }
    statusRender = (text) => {
        if (text === "0"){
            return <Tag color="geekblue" key={text}>0 - 失效</Tag>
        } else if (text === "1") {
            return <Tag color="geekblue" key={text}>1 - 有效</Tag>
        }
    }

    render(){
        const {dataList,type,visible} = this.state
        return(
            <div style={{background:'#f0f2f5',height:'100%'}}>
                <Card size="small" style={{height:'20%'}}>
                    <Breadcrumb >
                        <Breadcrumb.Item>参数管理</Breadcrumb.Item>
                        <Breadcrumb.Item>枚举码列表</Breadcrumb.Item>
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
                                    <Form.Item name="codeType" label="枚举类型">
                                        <Input placeholder="枚举类型" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item name="status" label="状态">
                                        <Select placeholder="请选择账号状态">
                                            <Select.Option value="0">0 - 失效</Select.Option>
                                            <Select.Option value="1">1 - 有效</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <div style={{float:'right'}}>
                                        <Button type="primary" style={{ marginRight: '8px' }} htmlType="submit">Search</Button>
                                        <Button type={"primary"} onClick={() => {this.formRef.current.resetFields();}}>清除</Button>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Card>
                <Card title="帖子种类列表" extra={<Button type="primary" onClick={()=>this.showDrawer({},'create')}>新建</Button>} size="small" style={{marginTop:'15px',height:'76%'}}>
                    <Table rowKey="id" loading={this.state.isLoading}
                           dataSource={dataList} scroll={{ y: 230 }} size="middle" >
                        <Table.Column title= '序号' width= {50} align= 'center' fixed= 'left' render={(text,record,index)=>`${index+1}`}/>
                        <Table.Column title= '枚举类型' width= {150} align= 'center' dataIndex= 'codeType' ellipsis={true}/>
                        <Table.Column title= '枚举码' width= {80} align= 'center' dataIndex= 'codeName' ellipsis={true}/>
                        <Table.Column title= '描述' width= {150} align= 'center' dataIndex= 'description' style={styles.titleStyles} render={(text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>}/>
                        <Table.Column title= '参数状态' width= {100} align= 'center' dataIndex= 'status' render={this.statusRender}/>
                        <Table.Column title= '发布人' width= {80} align= 'center' dataIndex= 'createBy'/>
                        <Table.Column title= '发布时间' width= {150} align= 'center' dataIndex= 'createTime'/>
                        <Table.Column title= '操作' width= {130} align= 'center' dataIndex= '' render={this.operatorRender}/>
                    </Table>
                    <EnumTypeRightShow
                        onClose={this.onClose}
                        visible={visible}
                        type={type}
                        values={this.state.values}
                        initValues={this.initValues}
                    />
                </Card>
            </div>
        );
    }
}

export default EnumTypeList

const styles = {
    removeBtn: {
        marginLeft: 8,
    },
}