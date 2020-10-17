/**
 * 1、用户举报页面右侧抽屉弹层，使用自封转组件
 */
import React from 'react'
import {Drawer, Button,Tabs,Timeline} from 'antd';
import GeneratorForm from "../../components/myConponents/GeneratorForm";
import Forms from "./Forms";

const { TabPane } = Tabs;

class ReportUserRightShow extends React.Component {
    formRef = React.createRef();

    onSubmit = ()=>{
        const type = this.props.type
        this.formRef.current.validateAll().then(
            (values,errors) => {
                // 如果没有错位信息errors为undefined
                console.log("form",values,errors)
                if (errors) {
                    console.log("error",errors)
                    return;
                }
                if (type === 'edit'){
                    this.props.updateReportUser()
                } else if (type === 'detail') {
                    this.props.onClose();
                }
            }
        )
    }

    callback = (key)=> {
        console.log(key);
    }

    getReportUserTimeline = () => {
        const timelineValues = this.props.form.timelineValues
        return (
            <Timeline mode="alternate">
                {
                    timelineValues.map((item,index) => {
                        if (item.status === '0'){
                            return <Timeline.Item key={index} color="red" label="已取消关注">{item.createTime} - {`关注${item.reportName}`}</Timeline.Item>;
                        }
                        return <Timeline.Item key={index}>{item.createTime} - {`举报${item.reportName}`}</Timeline.Item>
                    })
                }
            </Timeline>
        )
    }
    render() {
        const {onClose,visible,type,form,title} = this.props
        const disabledFlag = type === 'detail'

        const forms = Forms.getReportUserForms.call(this,disabledFlag)

        return (
            <div>
                <Drawer
                    title={title}
                    placement="right"
                    width={650}
                    closable={false}
                    destroyOnClose={"true"}
                    onClose={onClose}
                    visible={visible}
                    footer={
                        <div style={{textAlign: 'right',}}>
                            <Button onClick={onClose} style={{ marginRight: 8 }}>取消</Button>
                            <Button onClick={this.onSubmit} type="primary">确定</Button>
                        </div>
                    }
                >
                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                        <TabPane tab="举报用户信息" key="1">
                            <GeneratorForm
                                ref={this.formRef}
                                forms={forms}
                                values={form.formValue}
                                onFormChange={this.props.onFormChange}
                            />
                        </TabPane>
                        <TabPane tab="时间轴" key="2">
                            {this.getReportUserTimeline()}
                        </TabPane>
                    </Tabs>
                </Drawer>
            </div>
        );
    }
}

export default ReportUserRightShow
