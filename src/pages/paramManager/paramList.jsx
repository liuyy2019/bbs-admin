/**
 * 1、参数-参数列表模块
 */
import React from 'react'
import {addParam, deleteParam, getListParams, updateParam} from "../../api";
import {Button, Card, message, Tooltip, Modal } from "antd";
import { ExclamationCircleOutlined, ProjectOutlined } from '@ant-design/icons';
import ParamRightShow from './paramRightShow'
import moment from 'moment'
import util from "../../util/util";
import {getToken} from "../../util/userLoginUtil";
import CommonContentHead from "../../components/myConponents/CommonContentHead";
import GeneratorTable from "../../components/myConponents/GeneratorTable";


const { confirm } = Modal;
const statusList = [
    {codeId: '0', codeName: '无效'},
    {codeId: '1', codeName: '有效'},
]

class ParamList extends React.Component {
    formRef = React.createRef();
    constructor(props){
        super(props);
        this.state = {
            dataList:[],
            page: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            },
            visible: false,/* 新建右测栏 */
            isLoading:false,
            type: 'create',
            disabledFlag: false,
            searchValue:{},
            form: {
                formValue: {},/* 单条记录组装成的对象*/
                selectLists: {},/* 下拉框数组，组成的对象*/
            }
        };
        this.addParam = this.addParam.bind(this)
    }

    initValues = (param, current = 1, size = 10) => {
        this.setState({isLoading:true});
        getListParams({param, page: current,size: size},result => {
            const { data, pageNo: pageNum ,pageSize, total } = result || {};
            this.setState({
                dataList: data,
                page: {
                    pageNum, pageSize, total
                },
                isLoading:false,
            })
        })
    }
    componentDidMount(){
        this.initValues({}, 1, 10);
    }



    /* 搜索框表单提交 */
    onFinish = values => {
        console.log(values)
        this.setState({ searchValue: values });
        this.initValues(values, 1, 10);
    };

    // 抽屉弹层显示控制
    showDrawer = (values,type) => {
        let {form} = this.state
        let disabledFlag
        form.formValue = {
            ...values,
            createTime: (values.createTime) && moment(values.createTime,util.dateFormat),
            updateTime: (values.updateTime) && moment(values.updateTime,util.dateFormat),
            createBy: values.createBy || getToken().name,
        };

        switch (type) {
            case "create":
                disabledFlag = false
                break;
            case "edit":
                disabledFlag = false
                break;
            default :
                disabledFlag = true
        }

        this.setState({
            visible: true,
            type: type,
            form,
            disabledFlag
        })
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    onFormChange = (values) => {
        const {form} = this.state
        form.formValue = values
        this.setState({
            form
        })
    }

    // 删除参数列表
    deleteParam= (record)=> {
        const _this = this;
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

    // 新建一条参数信息
    addParam(){
        const {formValue} = this.state.form
        addParam(formValue,(result)=>{
            if (result === true){
                message.success('参数码新建成功');
                this.onClose();
                this.initValues();
            }
        })
    }

    // 更新一条参数信息
    updateParam = () => {
        const {formValue} = this.state.form
        updateParam(formValue,(result)=>{
            if (result === true){
                message.success('参数码更新成功');
                this.onClose();
                this.initValues();
            }
        })
    }

    operatorRender = (value, record) => {
        return (
            <div>
                <Button type={"link"} onClick={() => this.showDrawer(record,'detail')} className="operation-sty">查看</Button>
                <Button type={"link"} onClick={() => this.showDrawer(record,'edit')} className="operation-sty">编辑</Button>
                <Button type={"link"} onClick={() => this.deleteParam(record)} className="operation-sty">删除</Button>
            </div>
        );
    }

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

    // 分页数据发生改变是触发函数
    onPageChange = (pageNum, pageSize) => {
        console.log(pageNum, pageSize)
        const { searchValue } = this.state;
        this.initValues(searchValue, pageNum, pageSize);
    }

    render(){
        const { dataList,isLoading,visible,type,form, page, disabledFlag } = this.state;

        let title = [util.titlePrefix[type], '参数信息'].join('');
        const breadcrumb = [
            { content: '参数管理', href: '', icon: <ProjectOutlined />},
            { content: '参数信息列表', href: '', icon: ''},
            { content: '测试', href: '', icon: ''},
        ]

        const searchItemList = [
            { label:'发布人', name: 'createBy', type: 'input', placeholder: '发布人' },
            { label:'参数码', name: 'codeId', type: 'input', placeholder: '参数码' },
            { label:'状态', name: 'status', type: 'select', selectList: statusList, placeholder: '请选择状态' },
        ]

        const tableItemList = [
            {
                title: '参数码',
                width: 220,
                align: 'center',
                dataIndex: 'codeId',
                ellipsis: true
            },
            {
                title: '参数值',
                width: 100,
                align: 'center',
                dataIndex: 'codeName',
                render: (text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
            },
            {
                title: '描述',
                width: 150,
                align: 'center',
                dataIndex: 'description',
                onCell: this.contentCell,
                render: (text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
            },
            {
                title: '参数状态',
                width: 100,
                align: 'center',
                dataIndex: 'status',
                render: (text) => util.textAndOptionsTag(text,statusList,'geekblue','codeId', 'codeName')
            },
            {
                title: '发布人',
                width: 100,
                align: 'center',
                dataIndex: 'createBy'
            },
            {
                title: '操作',
                width: 130,
                align: 'center',
                dataIndex: '',
                render: this.operatorRender
            },
        ]
        const extra = (
            <>
                <Button type="primary" onClick={()=>this.showDrawer({},'create')} className={'margin-l-r-10'}>导出</Button>
                <Button type="primary" onClick={()=>this.showDrawer({},'create')}>新建</Button>
            </>
        )
        return(
            <div style={{background:'#f0f2f5', margin: '0', padding: '0',height: 'calc( 100% -24px)'}}>
                <CommonContentHead
                    breadcrumb={breadcrumb}
                    onFinish={this.onFinish}
                    searchItemList={searchItemList}
                />
                <Card title="参数信息列表" size="small" style={{marginTop:'15px',height:'76%'}} bordered={false} extra={extra}>
                    <GeneratorTable
                        isLoading={isLoading}
                        tableItemList={tableItemList}
                        dataSourceList={dataList}
                        page={page}
                        onPageChange={this.onPageChange}
                    />
                </Card>
                <ParamRightShow
                    disabledFlag={disabledFlag}
                    visible={visible}
                    type={type}
                    title={title}
                    form={form}
                    onFormChange={this.onFormChange}
                    addParam={this.addParam}
                    updateParam={this.updateParam}
                    onClose={this.onClose}
                />
            </div>
        );
    }
}

export default ParamList

/**
 * 1、Table.Column中多余字符...显示，实现方式一：render={text => util.longContentHandle}
 * 2、方式二：
 *      onCell={this.contentCell}
 *      render={(text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>}
 */
