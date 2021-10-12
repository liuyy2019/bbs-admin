/**
 * 枚举参数列表
 */
import React from 'react'
import {deleteEnumType, getCodeByType, getListEnumType} from "../../api";
import {Button, Card, Col, Input, Row, message, Tooltip, Breadcrumb, Form, Table, Modal, Select} from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import EnumRightShow from './enumRightShow'
import util from "../../util/util";

const FormItem = Form.Item
const Option = Select.Option
const { confirm } = Modal;
class EnumParamList extends React.Component {
    formRef = React.createRef();

    constructor(props){
        super(props);
        this.state = {
            dataList:[],
            pageNum: 1,
            pageSize: 5,
            visible: false,/* 新建右测栏 */
            isLoading:false,
            type: 'create',
            form:{
                lists: {
                    enumParamList:[],
                    enumTypeStatus: [
                        {codeName: "0",description: "失效"},
                        {codeName: "1",description: "有效"},
                    ],
                },
                formValue: {}
            },

        };
    }

    initValues = () => {
        this.setState({isLoading:true});
        getListEnumType({enumType:{},page: 1,size: 100},result => {
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
        getListEnumType({enumType:values,page:1,size:100},result => {
            this.setState({
                dataList: result
            })
        })
    };

    showDrawer = (values,type) => {
        const form = this.state.form
        form.formValue = values
        this.setState({
            visible: true,
            type,form
        });
        const {codeName} = values;
        getCodeByType({codeType:codeName},result => {
            form.lists.enumParamList = result
            this.setState({
                form
            })
        });

    };

    onClose = () => {
        this.setState({
            visible: false,
            type: '',
            values: {}
        });
    };

    // 删除枚举参数类型
    deleteParamType= (record)=> {
        let _this = this
        confirm({
            icon: <ExclamationCircleOutlined />,
            content: '确定删除参数枚举类型',
            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                deleteEnumType(record.id,result => {
                    if (result === true){
                        message.success('枚举参数类型删除成功');
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
                <Button type={"link"} onClick={() => this.showDrawer(record,'detail')} className="operation-sty">查看</Button>
                <Button type={"link"} onClick={() => this.showDrawer(record,'edit')} className="operation-sty">编辑</Button>
                <Button type={"link"} onClick={() => this.deleteParamType(record)} className="operation-sty">删除</Button>
            </div>
        );
    };

    render(){
        const {form,dataList,isLoading,type,visible} = this.state
        return(
            <div style={{background:'#f0f2f5',height:'100%'}}>
                <Card size="small" style={{height:'20%'}}>
                    <Breadcrumb >
                        <Breadcrumb.Item>参数管理</Breadcrumb.Item>
                        <Breadcrumb.Item>参数类型列表</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{marginTop:'10px'}}>
                        <Form ref={this.formRef} name="advanced_search"
                              className="ant-advanced-search-form" onFinish={this.onFinish}
                        >
                            <Row gutter={24}>
                                <Col span={6}>
                                    <FormItem name="createBy" label="发布人">
                                        <Input placeholder="发布人" />
                                    </FormItem>
                                </Col>
                                <Col span={6}>
                                    <FormItem name="codeName" label="枚举类型">
                                        <Input placeholder="枚举类型" />
                                    </FormItem>
                                </Col>
                                <Col span={6}>
                                    <FormItem name="status" label="状态">
                                        <Select placeholder="请选择账号状态">
                                            {
                                                form.lists.enumTypeStatus.map(item => {
                                                    return <Option key={item.codeName} value={item.codeName}>{item.codeName}- {item.description}</Option>
                                                })
                                            }
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span={6}>
                                    <div style={{float:'right'}}>
                                        <Button type="primary" style={{ marginRight: '8px' }} htmlType="submit">查询</Button>
                                        <Button type={"primary"} onClick={() => {this.formRef.current.resetFields();}}>清除</Button>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Card>
                <Card title="参数字典列表" extra={<Button type="primary" onClick={()=>this.showDrawer({},'create')}>新建</Button>} size="small" style={{marginTop:'15px',height:'76%'}}>
                    <Table rowKey="id" loading={isLoading}
                           dataSource={dataList} scroll={{ y: 260 }} size="middle" >
                        <Table.Column title= '序号' width= {50} align= 'center' fixed= 'left' render={(text,record,index)=>`${index+1}`}/>
                        <Table.Column title= '枚举类型' width= {100} align= 'center' dataIndex= 'codeName' ellipsis={true}/>
                        <Table.Column title= '描述' width= {150} align= 'center' dataIndex= 'description' style={styles.titleStyles} render={(text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>}/>
                        <Table.Column title= '参数状态' width= {100} align= 'center' dataIndex= 'status' render={text=> util.textAndOptionsTag(text,form.lists.enumTypeStatus)}/>
                        <Table.Column title= '发布人' width= {100} align= 'center' dataIndex= 'createBy'/>
                        <Table.Column title= '发布时间' width= {150} align= 'center' dataIndex= 'createTime'/>
                        <Table.Column title= '操作' width= {130} align= 'center' dataIndex= '' render={this.operatorRender}/>
                    </Table>
                    <EnumRightShow
                        onClose={this.onClose}
                        visible={visible}
                        type={type}
                        form={form}
                        initValues={this.initValues}
                        enumParamList={this.state.enumParamList}
                    />

                </Card>
            </div>
        );
    }
}

export default EnumParamList

const styles = {
    removeBtn: {
        marginLeft: 8,
    },
}
