/**
 * 1、参数信息的新增、修改、查看组件
 */
import React from 'react'
import { Form, Col, Row, Input, Select, DatePicker,Tooltip} from 'antd';
import { InfoCircleOutlined ,QuestionCircleOutlined} from '@ant-design/icons';
import locale from "antd/es/locale/zh_CN";
import moment from "moment";
import util from "../../util/util";
import Trip from 'trip.js';
import $ from 'jquery'
import './index.css'
import GeneratorDrawer from "../../components/myConponents/GeneratorDrawer";

const { Option } = Select;
const FormItem = Form.Item

// 提示设置
const tourSteps = [{
    position: 's',
    selector: '.tour-step-1',
    content: '<div style="width: 260px;">参数配置信息</div>'
},{
    position: 'n',
    selector: '.tour-step-2',
    content: '<div style="width: 260px">参数码</div>'
},{
    position: 'n',
    selector: '.tour-step-3',
    content: '<div style="width: 260px;">参数状态</div>'
},{
    position: 'n',
    selector: '.tour-step-4',
    content: '<div style="width: 260px">参数描述</div>'
}];

class ParamRightShow extends React.Component {
    formRef = React.createRef();


    onSubmit = (e)=>{
        e.preventDefault();
        const { type } = this.props
        // this.formRef.current可以获取所指对象的实例
        this.formRef.current.validateFields().then(values => {
            // 根据type的值进行不同的操作
            if (type === 'create') {
                this.props.addParam()
            } else if (type === 'edit') {
                this.props.updateParam()
            } else {
                this.props.onClose();
            }
        }, error => {
            console.log(error)
        })
    }

    onValuesChange = (changedValues, allValues) => {
        // 注意点：
        const obj = {
            ...allValues,
            createTime: (allValues.createTime) &&  moment(allValues.createTime).format('YYYY-MM-DD'),
            updateTime: (allValues.updateTime) && moment(allValues.updateTime).format('YYYY-MM-DD')
        }

        this.props.onFormChange(obj)
    }


    // 设置可用日期的开始（开始日期小于等于结束日期）
    disabledDateStart = (startTime) => {
        const {updateTime} = this.props.form.formValue
        let endTime = updateTime && moment(updateTime).format('YYYY-MM-DD')

        if (!updateTime) {
            return false
        }

        // 之前isBefore；之前或相等isSameOrBefore(参数可以是String、moment)
        // return moment(endTime).isBefore(startTime)
        return moment(endTime).isBefore(startTime.format('YYYY-MM-DD'))
        // return moment(endTime).isSameOrBefore(startTime)


    }
    // 设置可用日期的结束（结束日期大于等于开始日期）
    disabledDateEnd = (endTime) => {
        const {createTime} = this.props.form.formValue
        let startTime = createTime && moment(createTime).format('YYYY-MM-DD')

        if (!createTime) {
            return false
        }

        // 之后isBefore；之后或相等isSameOrBefore
        // return moment(startTime).isSameOrAfter(endTime.format('YYYY-MM-DD'))
        return moment(startTime).isAfter(endTime.format('YYYY-MM-DD'))
    }

    // 添加提示图标，点击图表获取引导提示
    getTrip = (labelName,step) => {
        const type = this.props.type
        return (
            <span> {labelName}&nbsp;
                {
                    "detail" === type ? null :
                        <QuestionCircleOutlined onClick={() => this.showGuide(step)} />
                }
            </span>
        )
    };

    showGuide = (tourStep) => {
        this.createTrip(tourStep)
    }

    // 创建Trip提示对象
    createTrip = (index) => {

        this.tripIns = new Trip(tourSteps.map(item => {
            return {
                sel: $(item.selector),
                content: item.content,
                position: item.position
            }
        }),{
            tripIndex: index,
            prevLabel: '上一步',
            nextLabel: '下一步',
            skipLabel: '跳过',
            finishLabel: '下一步', // dismiss 的中文描述
            showNavigation : true, // 显示上一步、下一步的导航信息
            showCloseBox : true, // 右上角叉号
            delay : -1,
            onTripChange(tripIndex, tripObject) {
                const sel = tripObject.sel
                $('.trip-border').removeClass('trip-border')
                sel.addClass('trip-border')

            },

            onTripClose() {
                $('.trip-border').removeClass('trip-border')
            },

            // tripIndex:是指当前step在tourSteps的下标
            // tourSteps数组的最后一个item，后执行该函数
            onEnd(tripIndex) {
                $('.trip-border').removeClass('trip-border')

                if (tripIndex === 3) {
                    const t = new Trip([{
                        position: 'w',
                        sel: '.tour-step-5',
                        content: '<div>信息填写完成后，点击确定保存</div>'
                    }], {
                        showCloseBox : true,
                        delay : -1,
                    })
                    t.start()
                }
            }
        })

        this.tripIns.start()
    }

    render() {
        const {onClose,visible,type,title,form,disabledFlag} = this.props

        return (
            <div>
                <GeneratorDrawer
                    title={title}
                    type={type}
                    width={650}
                    onClose={onClose}
                    onSubmit={this.onSubmit}
                    visible={visible}
                >
                    <Form layout="vertical" ref={this.formRef} onFinish={this.onFinish}
                          onValuesChange={this.onValuesChange} initialValues={form.formValue}
                    >
                        <Row gutter={16} className="tour-step-1">
                            <Col span={12}>
                                <FormItem name="codeId" label={this.getTrip("参数码",0)}
                                          rules={[{ required: true, message: '请输入参数码' }]}
                                >
                                    <Input placeholder="请输入参数码" disabled={disabledFlag}/>
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem name="createBy"
                                          label={
                                              <span> 创建者&nbsp;
                                                  <Tooltip title="What do you want others to call you?">
                                                        <InfoCircleOutlined />
                                                   </Tooltip>
                                               </span>
                                          }
                                          rules={[{ required: true, message: '请输入创建者' }]}
                                >
                                    <Input placeholder="请输入创建者" disabled={true}/>
                                </FormItem>
                            </Col>
                        </Row>
                        {
                            type==="create"?null:
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <FormItem name="createTime" label="创建时间"
                                                  rules={[{ required: true, message: '请输入创建时间' }]}
                                        >
                                            <DatePicker style={{width:"100%"}} disabled={disabledFlag}
                                                        dateRender={util.dateRender}
                                                        disabledDate={this.disabledDateStart} locale={locale}
                                            />
                                        </FormItem>
                                    </Col>
                                    <Col span={12}>
                                        <FormItem name="updateTime" label="更新时间"
                                                  rules={[{ required: true, message: '请选择更新时间' }]}
                                        >
                                            <DatePicker disabled={disabledFlag} style={{width:"100%"}}
                                                        dateRender={util.dateRender}
                                                        disabledDate={this.disabledDateEnd} locale={locale}
                                            />
                                        </FormItem>
                                    </Col>
                                </Row>
                        }
                        <Row gutter={16}>
                            <Col span={12} className="tour-step-2">
                                <FormItem name="codeName" label={this.getTrip("参数值",1)}
                                          rules={[{ required: true, message: '请输入参数值' }]}
                                >
                                    <Input placeholder="请输入参数值" disabled={disabledFlag}/>
                                </FormItem>
                            </Col>
                            <Col span={12} className="tour-step-3">
                                <FormItem name="status" label={this.getTrip("状态",2)}
                                          rules={[{ required: true, message: '请选择类别状态' }]}
                                >
                                    <Select placeholder="请选择类别状态" disabled={disabledFlag}>
                                        <Option value="0" >0 - 无效</Option>
                                        <Option value="1" >1 - 有效</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={16} className="tour-step-4">
                            <Col span={24}>
                                <FormItem name="description" label={this.getTrip("参数描述",3)}
                                          rules={[
                                              {required: true,message: '请输入描述信息'},
                                          ]}
                                >
                                    <Input.TextArea rows={4} placeholder="请输入公告内容" disabled={disabledFlag} style={{resize: "none"}}/>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </GeneratorDrawer>
            </div>
        );
    }
}

export default ParamRightShow

/**
 * 1、ant design组件DatePicker 不可选日期：disabledDate的使用
 *
 * 2、moment对象的基本方法：https://www.cnblogs.com/boonook/p/9242867.html
 *      2.1、获取今天0时0分0秒：moment().startOf('day')   ；
 *           23时59分59秒：moment().endOf(String)
 *      2.2、本周第一天(周日)0时0分0秒：moment().startOf('week')  ；
 *           本周最后一天(周六)23时59分59秒 ：moment().endOf('week')
 *      2.3、本周周一0时0分0秒：moment().startOf('isoWeek')
 *           本周周日23时59分59秒：moment().endOf('isoWeek')
 *      2.4、当前月第一天0时0分0秒：moment().startOf('month')
 *           当前月最后一天23时59分59秒：moment().endOf('month')
 *
 */
