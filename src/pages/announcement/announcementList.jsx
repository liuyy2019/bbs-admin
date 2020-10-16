/**
 * 1、公告管理模块
 */
import React from 'react'
import {
    getListAnnouncements,
    getAllAnnouncements,
    deleteAnnouncement,
    getCodeByType,
    addAnnouncement,
    updateAnnouncement
} from "../../api";
import {
    Button,
    Card,
    Col,
    Input,
    Row,
    message,
    Breadcrumb,
    Form,
    Table,
    Modal,
    Select, Pagination
} from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import util from '../../util/util'
import RightShow from './announcementDrawer'
import {getToken} from "../../util/userLoginUtil";


const {Option} = Select
const { confirm } = Modal;
const FormItem = Form.Item
class AnnouncementList extends React.Component {
    formRef = React.createRef();
    constructor(props){
        super(props);
        this.state = {
            dataList:[],
            pageNum: 1,
            pageSize: 5,
            visible: false,/* 新建右测栏 */
            isLoading: false,
            type: 'create',
            form:{
                formValue: {},
                selectLists: {
                    announcementStatus: [],
                },
            },
        };
    }

    initValues = () => {
        this.setState({isLoading:true});
        getAllAnnouncements(result => {
            this.setState({
                dataList: result,
                isLoading: false,
            })
        })
    }
    componentWillMount(){
        const {form} = this.state
        this.initValues();
        getCodeByType({codeType:"ANNOUNCEMENT_STATUS"},result => {
            form.selectLists.announcementStatus = result
            this.setState({
                form
            })
        })
    }

    /* 搜索框表单提交 */
    onFinish = values => {
        this.setState({values});
        getListAnnouncements({announcement:values,page:1,size:100},result => {
            this.setState({
                dataList: result
            })
        })
    };

    showDrawer = (values,type) => {
        const {form} = this.state
        form.formValue = values
        this.setState({
            visible: true,
            type,
            form
        });
    };

    // 表单项更新触发函数
    onFormChange = (allValues) => {
        const {form} = this.state
        form.formValue = allValues
        this.setState({
            form
        })
    }

    // 添加公告信息
    addAnnouncement = () => {
        const {formValue} = this.state.form
        const param = {
            ...formValue,
            issuer: getToken().name
        }
        addAnnouncement(param,(result)=>{
            if (result === true){
                message.success('公告新建成功');
                this.initValues();
                this.onClose()
            }
        })
    }

    // 更新公告信息
    updateAnnouncement = () => {
        const {formValue} = this.state.form
        updateAnnouncement(formValue,(result)=>{
            if (result === true){
                message.success('公告更新成功');
                this.initValues();
                this.onClose()
            }
        })
    }

    onClose = () => {
        this.setState({
            visible: false,
        });
    };


    deleteAnnouncement= (record)=> {
        let _this = this
        confirm({
            icon: <ExclamationCircleOutlined />,
            content: '确定删除当前公告',
            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                deleteAnnouncement(record.id,result => {
                    if (result === true){
                        message.success('公告删除成功');
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
                <a onClick={() => this.deleteAnnouncement(record)} style={styles.removeBtn}>删除</a>
            </div>
        );
    }

    render(){
        const {dataList,form,type,visible,isLoading} = this.state
        const title = [util.titlePrefix[type],'公告信息'].join('')
        return(
            <div style={{background:'#f0f2f5',height:'100%'}}>
                <Card size="small" style={{height:'20%'}}>
                    <Breadcrumb >
                        <Breadcrumb.Item>公告管理</Breadcrumb.Item>
                        <Breadcrumb.Item>公告信息列表</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{marginTop:'10px'}}>
                        <Form ref={this.formRef} name="advanced_search"
                              className="ant-advanced-search-form" onFinish={this.onFinish}
                        >
                            <Row gutter={24}>
                                <Col span={6}>
                                    <FormItem name="issuer" label="发布人">
                                        <Input placeholder="发布人" />
                                    </FormItem>
                                </Col>
                                <Col span={6}>
                                    <FormItem name="title" label="公告标题">
                                        <Input placeholder="公告标题" />
                                    </FormItem>
                                </Col>
                                <Col span={6}>
                                    <FormItem name="status" label="状态">
                                        <Select placeholder="请选择状态">
                                            {
                                                form.selectLists.announcementStatus.map(item => {
                                                    return <Option value={item.codeName} key={item.id}>{item.codeName} - {item.description}</Option>
                                                })
                                            }
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span={6}>
                                    <div style={{float:'right'}}>
                                        <Button type="primary" style={{ marginRight: '8px' }} htmlType="submit">查询</Button>
                                        <Button type="primary" onClick={() => {this.formRef.current.resetFields();}}>
                                            清除
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Card>
                <Card title="公告列表信息" extra={<Button type="primary" onClick={()=>this.showDrawer({},'create')}>新建</Button>} size="small" style={{marginTop:'15px',height:'76%'}}>
                    <Table rowKey="id" loading={isLoading} pagination={false}
                           dataSource={dataList} scroll={{ y: 260 }} size="middle" >
                        <Table.Column title= '序号' width= {50} align= 'center' fixed= 'left' render={(text,record,index)=>`${index+1}`}/>
                        <Table.Column title= '公告标题' width= {100} align= 'center' dataIndex= 'title' ellipsis={true}/>
                        <Table.Column title= '公告内容' width= {150} align= 'center' dataIndex= 'content' render={(text) => util.longContentHandle(text)}/>
                        <Table.Column title= '发布时间' width= {150} align= 'center' dataIndex= 'createTime' />
                        <Table.Column title= '公告状态' width= {100} align= 'center' dataIndex= 'status' render={text => util.textAndOptionsTag(text,form.selectLists.announcementStatus)}/>
                        <Table.Column title= '发布人' width= {100} align= 'center' dataIndex= 'issuer'/>
                        <Table.Column title= '操作' width= {130} align= 'center' dataIndex= '' render={this.operatorRender}/>
                    </Table>
                    <RightShow
                        values={form}
                        onClose={this.onClose}
                        visible={visible}
                        type={type}
                        title={title}
                        onFormChange={this.onFormChange}
                        addAnnouncement={this.addAnnouncement}
                        updateAnnouncement={this.updateAnnouncement}
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

export default AnnouncementList

const styles = {
    removeBtn: {
        marginLeft: 8,
    },
    styleFont: {
        maxWidth: 150,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow:'ellipsis',
        cursor:'pointer'
    }
}