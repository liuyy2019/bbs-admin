/**
 * 封装搜索组件
 */
import React, { useCallback } from "react";
import {Button, Col, Form,Input, Row,Select} from "antd";
import util from "../../util/util";

const { Option } = Select;
const  GeneratorSearch = ({ searchItemList, onReset, onFinish}) => {
    const formRef = React.useRef();


    // 搜索表单重置
    const onResetHandle = () => {
        formRef.current.resetFields();
        onReset && onReset()
    }

    // 生成搜索表单项
    const generalFormItem = (formItem) => {
        const { type, selectList, name, label, placeholder, options } = formItem;

        switch (type) {
            case 'input':
                return (
                    <Form.Item name={name} label={label}>
                        <Input placeholder={placeholder} {...options}/>
                    </Form.Item>
                )
            case 'select':
                return (
                    <Form.Item name={name} label={label}>
                        <Select placeholder={placeholder}>
                            {
                                selectList.map(item => (
                                    <Option value={item.codeId} key={item.codeId}>{`${item.codeId} - ${item.codeName}`}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                )
            default:
                return
        }
    }

    // 函数组件会多次更新渲染（使用useCallback保证返回的防抖函数是同一个）
    const submit = useCallback(util.debounce(onFinish), [])

    return (
        <div style={{marginTop:'10px'}}>
            <Form ref={formRef} name="advanced_search"
                  className="ant-advanced-search-form" onFinish={submit}
            >
                <Row gutter={24}>
                    {
                        searchItemList.map((item,index) => (
                            <Col span={6} key={index}>
                                {
                                    generalFormItem(item)
                                }
                            </Col>
                        ))
                    }
                    <Col span={6}>
                        <div style={{textAlign:'right'}}>
                            <Button type="primary" style={{ marginRight: '8px' }} htmlType="submit">查询</Button>
                            <Button type="primary" onClick={onResetHandle}>重置</Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </div>
    )

}
export default GeneratorSearch
