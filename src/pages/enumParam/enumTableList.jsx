import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {  Form,Button, Input,Table, } from 'antd';
import { DeleteOutlined,RestOutlined,FileOutlined } from '@ant-design/icons';

export default class EnumTableList extends Component {
    formRef = React.createRef();
    static propTypes = {
        parmSysCodeResList: PropTypes.array,
        disabledFlag: PropTypes.bool,
        removeItem: PropTypes.func,
        onChangeData: PropTypes.func
    }

    constructor (props) {
        super(props)
        this.state = {}
    }


    indexRender = (text,value, index) => {
        return (
            <div>
                {index+1}
            </div>
        )
    }

    codeNameRender = (text,value, index) => {
        const disabledFlag = this.props.disabledFlag

        return (
            <div>
                <Form.Item style={{margin:0}} required message="请输入1~60字"
                    // name={`parmSysCodeResList[${index}].codeName`}
                >
                    <Input
                        placeholder="请输入1~60字"
                        disabled={true}
                        maxLength={60}
                        defaultValue={text}
                        type='text'
                        style={{textAlign:"center"}}
                    />
                </Form.Item>
            </div>
        )
    }

    codeDescRender = (text,value, index) => {
        const disabledFlag = this.props.disabledFlag

        return (
            <div>
                <Form.Item style={{margin:0}} required message="请输入1~30字"
                    // name={`parmSysCodeResList[${index}].description`}
                >
                    <Input
                        placeholder="请输入最长200字"
                        disabled={true}
                        maxLength={200}
                        type='text'
                        defaultValue={text}
                        style={{textAlign:"center"}}
                    />
                </Form.Item>
            </div>
        )
    };

    codeStatusRender = (text,value, index) => {
        const disabledFlag = this.props.disabledFlag

        return (
            <div>
                <Form.Item style={{margin:0}} required message="请输入1~30字"
                           // name={`parmSysCodeResList[${index}].status`}
                >
                    <Input
                        placeholder="请输入1~30字"
                        disabled={true}
                        maxLength={30}
                        type='text'
                        onChange={this.handleChange}
                        value={text}
                        style={{textAlign:"center"}}
                    />
                </Form.Item>
            </div>
        )
    };
    handleChange = (e) => {
        console.log(e)
    }

    saveData = (value,index) => {
        console.log("data");
        console.log(value);
        console.log(index)
    }

    operatorRender = (text,value, index) => {
        const disabledFlag = this.props.disabledFlag
        return (
            <div>
                <Button type="link" disabled={disabledFlag}
                        onClick={this.display}
                >
                    <RestOutlined />
                    {/*<DeleteOutlined />*/}
                </Button>
                <Button type="link" disabled={disabledFlag}
                        onClick={()=>this.saveData(value,index)}
                >
                    <FileOutlined />
                </Button>
            </div>
            /*<Button disabled={disabledFlag} shape="text"
                    // onClick={this.props.removeItem.bind(this, index)}
            >
                <DeleteOutlined />
            </Button>*/
        )
    };

    render () {
        const {
            parmSysCodeResList
        } = this.props;
        console.log("parmCode")
        console.log(parmSysCodeResList)
        return (
            <Form hideRequiredMark ref={this.formRef}>
                <Table
                    dataSource={parmSysCodeResList || []}
                    bordered={false}
                    pagination={false}
                    size="small"
                    rowKey="id"
                    scroll={{  y: 300 }}
                >
                    <Table.Column
                        title="序号" dataIndex="planIndex" align="center" width={60}
                        render={this.indexRender}
                    />
                    <Table.Column
                        title="枚举码" dataIndex="codeName" align="center"
                        render={this.codeNameRender}
                    />
                    <Table.Column
                        title="描述" dataIndex="description" align="center"
                        render={this.codeDescRender}
                    />
                    <Table.Column
                        title="状态" dataIndex="status" align="center"
                        render={this.codeStatusRender}
                    />
                    {/*<Table.Column
                        title="操作" dataIndex="" align="center" width={120} lock="right"
                        render={this.operatorRender}
                    />*/}
                </Table>
            </Form>
        )
    }
}
