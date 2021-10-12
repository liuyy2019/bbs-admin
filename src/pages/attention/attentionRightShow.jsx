/**
 * 1、关注用户模块右侧抽屉弹层
 */
import React from 'react'
import {Drawer, Button } from 'antd';
import moment from 'moment'
import 'moment/locale/zh-cn';
import GeneratorForm from "../../components/myConponents/GeneratorForm";
import data from "./data";

class AttentionRightShow extends React.Component {
    formRef = React.createRef();



    onSubmit = ()=>{
        if (this.props.type === 'edit'){
            this.props.updateAttention()
        }
        // 、调用父组件的onClose方法
        this.props.onClose();
        /*this.props.history.replace('/admin/announcement');*/
    }

    onValuesChange = (changedValues, allValues) =>{
        // 注意点：
        const obj = {
            ...allValues,
            createtime: (allValues.createtime)? moment(allValues.createtime).format('YYYY-MM-DD HH:mm:ss'):null
        }

        this.props.onFormChange(obj)
    }

    render() {
        const {onClose,visible,type,forms} = this.props
        const disabledFlag = type === 'detail'
        const form = data.getAttentionForms.call(this,disabledFlag)
        return (
            <div>
                <Drawer
                    title={`${type==='edit'? '编辑':'查看'}关注信息`}
                    placement="right"
                    width={520}
                    // closable={false}
                    destroyOnClose={"true"}
                    onClose={onClose}
                    visible={visible}
                    footer={
                        <div style={{textAlign: 'right',}}>
                            <Button onClick={this.props.onClose} style={{ marginRight: 8 }}>
                                取消
                            </Button>
                            <Button onClick={this.onSubmit} htmlType="submit" type="primary">
                                确定
                            </Button>
                        </div>
                    }
                >
                    <GeneratorForm
                        forms={form}
                        values={forms.formValue}
                        onFormChange={this.props.onFormChange}
                    />
                </Drawer>
            </div>
        );
    }
}

export default AttentionRightShow
