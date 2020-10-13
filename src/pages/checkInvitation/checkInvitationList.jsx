/**
 * 1、审核帖子模块
 */
import React from 'react';
import {Table, Card, Breadcrumb, Form, Tag, Row, Col, Input, Button, Select, Modal, message} from 'antd';
import {
    deleteInvitationById,
    getUserById,
    getAllTypes,
    getCodeByType,
    getListInvitations,
    getParamByCodeId, updateInvitation
} from '../../api/index'
import {Link} from "react-router-dom";
import CheckInvitationRightShow from "./checkInvitationRightShow";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import util from "../../util/util";
import {emailSend} from "../../api/untils";


const {Option} = Select

/* 帖子列表组件 */
class CheckInvitationList extends React.Component{
    formRef = React.createRef();
    constructor(props){
        super(props);
        this.state = {
            dataList:[],
            isLoading: false,
            pageNum: 1,
            pageSize: 5,
            visible: false,
            type: '',
            searchValues: {},
            value: {
                selectLists: {
                    InvitationType: [],/* 帖子类别信息 */
                    checkStatus: [],/**/
                },
                formValue: {}, /* 单条表单记录*/
            },
            email: {},
            qqNumber: ''
        }
    }

    /* 数据初始化 */
    initValues = () => {
        this.setState({isLoading:true});
        const {pageNum,pageSize} = this.state
        getListInvitations({invitation:{reports:15},page:pageNum,size:pageSize},result => {
            this.setState({
                dataList: result,
                isLoading: false,
            })
        });
    };

    componentWillMount(){
        const {value} = this.state
        this.initValues();

        getCodeByType({codeType:"STATUS"},result => {
            value.selectLists.checkStatus = result
        })
        getAllTypes(result => {
            value.selectLists.InvitationType = result
        })

        this.setState({
            value
        })
    }

    /* 显示右侧浮层 */
    showDrawer = (values,type) => {
        const {value} = this.state
        value.formValue = values
        this.setState({
            visible: true,
            type: type,
            value
        });
        getParamByCodeId("INVITATION_CHECK_MESSAGE",result => {
            this.setState({
                email:  result,
            })
        })
        getUserById(values.issuerId,result => {
            this.setState({
                qqNumber: result.email,
            })
        })
    };

    /* 关闭右侧浮层 */
    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    /* 更新记录*/
    updateInvitation = () => {
        const {value,qqNumber,email} = this.state
        updateInvitation(value.formValue,(result)=>{
            // 如果状态设置为屏蔽，则发送短信消息
            if (value.formValue.status === '2') {
                let qq = qqNumber;
                let {codeName ,description}= email;
                description = `尊敬的用户您好！帖子：${value.formValue.title}，${description}`;
                emailSend({qq:qq,subject:codeName,content:description},result => {})
            }
            if (result === true){
                message.success('帖子举报信息修改成功！');
                this.initValues()
                this.onClose()
            }
        })
    }

    /* 更新表单信息*/
    onFormChange = (values) => {
        const {value} = this.state
        value.formValue = values
        this.setState({
            value
        })
    }

    /* 搜索框表单提交 */
    onFinish = values => {
        values.reports = 15;
        this.setState({searchValues:values});
        const {pageNum,pageSize} = this.state
        getListInvitations({invitation:values,page:pageNum,size:pageSize},result => {
            this.setState({
                dataList: result
            })
        })
    };

    /* 删除帖子信息 */
    deleteInvitation = (record) => {
        let _this = this
        Modal.confirm({
            icon: <ExclamationCircleOutlined />,
            content: '确定删除当前审核帖子',
            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                deleteInvitationById(record.id,result => {
                    if (result === true){
                        message.success('帖子删除成功');
                        _this.initValues();
                    }
                })
            },
            onCancel() {
                console.log(record.id);
            },
        });

    }



    render(){
        const {dataList,isLoading,value,type,visible} = this.state
        let title = [util.titlePrefix[type], '帖子举报审核信息'].join('')
        /* 表格的列 */
        const columns = [
            {   title: '序号', width: 50, align: 'center',
                render:(text,record,index)=>`${index+1}`,
            },
            { title: '发布人', width: 80, dataIndex: 'name', key: 'name',align: "center",
                render: (text,record,index)=>{
                    return <Link to={{ pathname : '/admin/user',query:{type:'查看',userId:record.issuerId}}}><Tag color="geekblue" key={text}>{text}</Tag></Link>
                }
            },
            { title: '标题', width: 150, dataIndex: 'title', key: 'title',align:'center',
                render: (text,record) => {
                    return <Link to={{ pathname : '/admin/invitation',state:{id:record.id}}}>{util.longContentHandle(text,15)}</Link>;
                }
            },
            { title: '类别', width: 80, dataIndex: 'type', key: 'type',align:'center',
                render: (text) => {
                    return (
                        <Tag color="green" key={text}>{text}</Tag>
                    )
                }
            },
            { title: '状态', width: 80, dataIndex: 'status', key: 'status',align:'center',
                render: (text) => {
                    if (text==="0") {
                        return <Tag color="geekblue" key={text}>0 - 审核中</Tag>;
                    } else if (text==="1") {
                        return <Tag color="geekblue" key={text}>1 - 正常</Tag>;
                    } else if (text ==="2") {
                        return <Tag color="geekblue" key={text}>2 - 屏蔽</Tag>;
                    }
                }
            },
            { title: '被举报次数', width: 90, dataIndex: 'reports', key: 'reports',align:'center',
                render: (text) => {
                    return (
                        <Tag color="geekblue" key={text}>{text}</Tag>
                    )
                }
            },
            { title: '发布时间',width: 150,  dataIndex: 'date', key: 'date' ,align:'center'},
            { title: '操作', width: 150, dataIndex: '', key: 'x',align:'center',
                render: (value, record) => {
                    return (
                        <div>
                            <a onClick={() => this.showDrawer(record,'detail')} style={styles.removeBtn}>查看</a>
                            <a onClick={() => this.showDrawer(record,'edit')} style={styles.removeBtn}>编辑</a>
                            <a onClick={() => this.deleteInvitation(record)} style={styles.removeBtn}>删除</a>
                        </div>
                    );
                },
            },
        ];
        return(
            <div style={{background:'#f0f2f5',height:'100%'}}>
                <Card size="small" style={{height:'20%'}}>
                    <Breadcrumb >
                        <Breadcrumb.Item>审核中心</Breadcrumb.Item>
                        <Breadcrumb.Item>帖子举报审核</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{marginTop:'10px'}}>
                        <Form ref={this.formRef} name="advanced_search"
                              className="ant-advanced-search-form" onFinish={this.onFinish}
                        >
                            <Row gutter={24}>
                                <Col span={6}>
                                    <Form.Item name="name" label="发布人">
                                        <Input placeholder="发布人" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item name="test" label="标题">
                                        <Input placeholder="标题" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item name="type" label="类别">
                                        <Select placeholder="请选择类别">
                                            {
                                                value.selectLists.InvitationType.map((item,index) => {
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
                    <Table
                        columns={columns}
                        loading={isLoading}
                        dataSource={dataList}
                        rowKey="id"
                        scroll={{ y: 310 }}
                        size="middle"
                        pagination={false}
                    />
                    <CheckInvitationRightShow
                        onClose={this.onClose}
                        onFormChange={this.onFormChange}
                        updateInvitation={this.updateInvitation}
                        visible={visible}
                        type={type}
                        title={title}
                        value={value}
                        qqNumber={this.state.qqNumber}
                        email={this.state.email}
                    />
                </Card>
            </div>
        );
    }

}

export default CheckInvitationList

const styles = {
    removeBtn: {
        marginLeft: 8,
    },
}

/**
 *  1、待完善时间组件
 */