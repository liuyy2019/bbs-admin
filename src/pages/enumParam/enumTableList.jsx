import React,{Component} from 'react'
import PropTypes from 'prop-types'
import { Button, Input,Table } from 'antd';
import { DeleteOutlined, FileOutlined } from '@ant-design/icons';
const Column = Table.Column
/*export default class EnumTableList extends Component {
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

    codeNameRender = (text,value, index) => {
        const disabledFlag = this.props.disabledFlag
        return (
            <div>
                <Form.Item style={{margin:0}} required message="请输入1~60字"
                           name={`enumParamList[${index}].codeName`}
                >
                    <Input
                        placeholder="请输入1~60字"
                        disabled={disabledFlag}
                        maxLength={60}
                        type='text'
                        defaultValue={text}
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
                           name={`enumParamList[${index}].codeType`}
                >
                    <Input
                        placeholder="请输入最长200字"
                        disabled={disabledFlag}
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
                           name={`enumParamList[${index}].status`}
                >
                    <Input
                        placeholder="请输入1~30字"
                        disabled={disabledFlag}
                        maxLength={30}
                        type='text'
                        defaultValue={text}
                        style={{textAlign:"center"}}
                        onChange={e => this.onChangeHandle(e.target.value,"status",index)}
                    />
                </Form.Item>
            </div>
        )
    };

    saveData = (value,index) => {
        console.log("data");
        console.log(value,index);

    }

    onChangeHandle = (value,field,index) => {
        console.log(value,field,index)
    }

    operatorRender = (text,value, index) => {
        const disabledFlag = this.props.disabledFlag
        return (
            <div>
                <Button type="link" disabled={disabledFlag}
                        onClick={()=>this.saveData(value,index)}
                >
                    {/!*<RestOutlined />*!/}
                    <DeleteOutlined />
                </Button>
                <Button type="link" disabled={true}
                        onClick={()=>this.saveData(value,index)}
                >
                    <FileOutlined />
                </Button>
            </div>
        )
    };

    render () {
        const {
            parmSysCodeResList
        } = this.props;
        return (
            <Table
                dataSource={parmSysCodeResList || []}
                bordered={false}
                pagination={false}
                size="small"
                rowKey="id"
                scroll={{  y: 300 }}
            >
                <Column
                    title="序号" dataIndex="planIndex" align="center" width={60}
                    render={( value, array,index )=> index +1}
                />
                <Column
                    title="枚举码" dataIndex="codeName" align="center"
                    render={this.codeNameRender}
                />
                <Column
                    title="描述" dataIndex="description" align="center"
                    render={this.codeDescRender}
                />
                <Column
                    title="状态" dataIndex="status" align="center"
                    render={this.codeStatusRender}
                />
                <Column
                    title="操作" dataIndex="" align="center" width={120} lock="right"
                    render={this.operatorRender}
                />
            </Table>
        )
    }
}*/

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
        this.state = {
            parmSysCodeResList:[]
        }
    }

    codeRender = (text,index,filed) => {
        const disabledFlag = this.props.disabledFlag
        return (
            <div>
                <Input
                    placeholder="请输入1~30字"
                    disabled={disabledFlag}
                    maxLength={30}
                    type='text'
                    defaultValue={text}
                    style={{textAlign:"center"}}
                    onChange={e => this.onChangeHandle(e.target.value,filed,index)}
                />
            </div>
        )
    };

    saveData = (value,index) => {
        console.log("data");
        console.log(value,index);

    }

    onChangeHandle = (value,field,index) => {
        const list = [...this.props.parmSysCodeResList]
        list[index][field] = value
        this.setState({
            parmSysCodeResList: list
        })

    }

    operatorRender = (text,value, index) => {
        const disabledFlag = this.props.disabledFlag
        return (
            <div>
                <Button type="link" disabled={disabledFlag}
                        onClick={()=>this.saveData(value,index)}
                >
                    {/*<RestOutlined />*/}
                    <DeleteOutlined />
                </Button>
                <Button type="link" disabled={true}
                        onClick={()=>this.saveData(value,index)}
                >
                    <FileOutlined />
                </Button>
            </div>
        )
    };

    render () {
        const {parmSysCodeResList} = this.props;
        return (
            <Table
                dataSource={parmSysCodeResList || []}
                bordered={false}
                pagination={false}
                size="small"
                rowKey="id"
                scroll={{  y: 300 }}
            >
                <Column title="序号" dataIndex="planIndex" align="center" width={60}
                    render={( value, record,index )=> index +1}
                />
                <Column title="枚举码" dataIndex="codeName" align="center" render={(text, record, index)=>this.codeRender(text,index,"codeName")}/>
                <Column title="描述" dataIndex="description" align="center" render={(text, record, index)=>this.codeRender(text,index,"description")}/>
                <Column title="状态" dataIndex="status" align="center" render={(text, record, index)=>this.codeRender(text,index,"status")}/>
                <Column title="操作" dataIndex="" align="center" width={120} lock="right" render={this.operatorRender}/>
            </Table>
        )
    }
}
