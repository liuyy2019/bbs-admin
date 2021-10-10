/**
 * 封装搜索组件
 */
import React from "react";
import {Button, Col, Form,Input, Row,Select} from "antd";


class GeneratorSearch extends React.Component{
    formRef = React.useRef();

    onFinish = (values) => {
        console.log({values})
    };
    render() {
        return (
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
                            <div style={{textAlign:'right'}}>
                                <Button type="primary" style={{ marginRight: '8px' }} htmlType="submit">查询</Button>
                                <Button type="primary" onClick={() => {this.formRef.current.resetFields();}}>重置</Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }

}
export default GeneratorSearch