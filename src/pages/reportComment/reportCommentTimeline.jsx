/* 1、评论举报组件的时间轴组件 */
import React from 'react'
import { Drawer, Button,Timeline} from 'antd';



class ReportCommentTimeline extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }


    render() {
        const {onClose,visibleTimeline,timelineValues} = this.props
        return (
            <div>
                <Drawer
                    title={`该评论被举报时间轴`}
                    placement="right"
                    width={520}
                    destroyOnClose={"true"}
                    onClose={() => onClose("timeLine")}
                    visible={visibleTimeline}
                    footer={
                        <div style={{ textAlign: 'right',}}>
                            <Button onClick={() => onClose("timeLine")} style={{ marginRight: 8 }}>
                                关闭
                            </Button>
                        </div>
                    }
                >
                    <Timeline mode="alternate">
                        {
                            timelineValues.map((item,index) => {
                                if (item.status === '0'){
                                    return <Timeline.Item key={index} color="red" label="已取消关注">{item.createTime} - {`${item.reportName}取消举报`}</Timeline.Item>;
                                }
                                return <Timeline.Item key={index}>{item.createTime} - {`${item.reportName}举报`}</Timeline.Item>
                            })
                        }
                    </Timeline>
                </Drawer>
            </div>
        );
    }
}

export default ReportCommentTimeline