/* 公告的新增、修改、查看组件 */
import React from 'react'
import {Drawer, Form, Button, Col, Row, Card, Input, Select, message, Space,} from 'antd';
import {addEnumType, updateEnumType, getCodeByType} from '../../api/index'
import {getToken} from "../../util/userLoginUtil";
import EnumTableList from "./enumTableList";
import { FileDoneOutlined } from '@ant-design/icons';

const { Option } = Select;


/*const initValues = {
    enumParamList: [{
        first: "12",
        last: "1"
    },{
        first: "12",
        last: "1"
    }]
}*/

class EnumRightShow extends React.Component {
    formRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            value: {},
            id: 0,
            // enumParamList:[],
        };
    }

    /*componentWillMount(){
        const {codeType} = this.props.values;
        getCodeByType({codeType},result => {
            console.log(result)
            this.setState({
                enumParamList: result,
            })
        });
    }*/




    onSubmit = ()=>{
        // 1、通过该方式与表单进行交互，获取表单值
        const data =this.formRef.current.getFieldsValue();
        data.createBy = getToken().name;
        data.id = this.state.id;
        // 根据type的值进行不同的操作
        if (this.props.type === 'create') {
            // 1、将表单值插入到数据库中
            addEnumType(data,(result)=>{
                if (result === true){
                    message.success('枚举参数类型新建成功');
                    this.props.initValues();
                }
            })
        } else if (this.props.type === 'edit') {
            updateEnumType(data,(result)=>{
                if (result === true){
                    message.success('枚举参数类型更新成功');
                    this.props.initValues();
                }
            })
        }

        // 3、调用父组件的onClose方法
        this.props.onClose();
        console.log(this.props)
        // 4、清空表单值
        this.formRef.current.resetFields();
    };

    changeHandle = (changedValues, allValues) => {
        console.log('formChange',changedValues, allValues)
    }

    render() {
        const {onClose,visible,type,form} = this.props;
        let  enumParamList = form.lists.enumParamList;
        let disabledFlag = type === 'detail'

        return (
            <div>
                <Drawer
                    title={`${type==='edit'?'编辑':'查看'}枚举类型信息`}
                    placement="right"
                    width={700}
                    destroyOnClose={"true"}
                    onClose={onClose}
                    visible={visible}
                    footer={
                        <div style={{ textAlign: 'right',}}>
                            <Button onClick={onClose} style={{ marginRight: 8 }}>
                                取消
                            </Button>
                            <Button onClick={this.onSubmit} htmlType="submit" type="primary">
                                确定
                            </Button>
                        </div>
                    }
                >
                    <Form hideRequiredMark ref={this.formRef}
                          // onValuesChange={(changedValues, allValues)=>this.changeHandle(changedValues, allValues)}
                          initialValues={form.formValue}
                    >
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="codeName" label="枚举类型"
                                           rules={[{ required: true, message: '请输入枚举类型' }]}
                                >
                                    <Input placeholder="请输入枚举类型"  disabled={disabledFlag}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="status" label="状态"
                                           rules={[{ required: true, message: '请选择类别状态' }]}
                                >
                                    <Select placeholder="请选择类别状态" disabled={disabledFlag}>
                                        {
                                            form.lists.enumTypeStatus.map(item => {
                                                return <Option key={item.codeName} value={item.codeName}>{item.codeName}- {item.description}</Option>
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="description" label="描述信息"
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入描述信息',
                                               },
                                           ]}
                                >
                                    <Input.TextArea rows={3} placeholder="请输入公告内容" disabled={disabledFlag}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        {
                            type === "create"? null :
                                <Card size="small" title={<span><FileDoneOutlined />枚举码信息</span>} bordered={false}>
                                    <EnumTableList
                                        parmSysCodeResList={enumParamList}
                                        disabledFlag={disabledFlag}
                                        // removeItem={this.props.removeItem}
                                        // onChangeData={this.onChangeData}
                                    />
                                </Card>
                        }
                    </Form>
                </Drawer>
            </div>
        );
    }
}

export default EnumRightShow