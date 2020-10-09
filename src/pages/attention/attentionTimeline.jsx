/* 公告的新增、修改、查看组件 */
import React from 'react'
import { Drawer, Button,Timeline} from 'antd';

/*class AttentionTimeline extends React.Component {

    render() {
        const {onCloseTimeline,visibleTimeline,formValue,timeLineData} = this.props
        return (
            <div>
                <Drawer
                    title={`${formValue.username} - 关注用户时间轴`}
                    placement="right"
                    width={520}
                    destroyOnClose={"true"}
                    onClose={onCloseTimeline}
                    visible={visibleTimeline}
                    footer={
                        <div style={{ textAlign: 'right',}}>
                            <Button onClick={onCloseTimeline} style={{ marginRight: 8 }}>
                                关闭
                            </Button>
                        </div>
                    }
                >
                    <Timeline mode="alternate">
                        {
                            timeLineData.map((item,index) => {
                                if (item.status === '0'){
                                    return <Timeline.Item color="red" key={index} label="已取消关注">{item.createtime} - {`关注${item.noticer}`}</Timeline.Item>;
                                }
                                return <Timeline.Item key={index}>{item.createtime} - {`关注${item.noticer}`}</Timeline.Item>
                            })
                        }
                    </Timeline>
                </Drawer>
            </div>
        );
    }
}*/
const AttentionTimeline = (props) => {
    const {onCloseTimeline,visibleTimeline,formValue,timeLineData} = props
    return (
        <div>
            <Drawer
                title={`${formValue.username} - 关注用户时间轴`}
                placement="right"
                width={520}
                destroyOnClose={"true"}
                onClose={onCloseTimeline}
                visible={visibleTimeline}
                footer={
                    <div style={{ textAlign: 'right',}}>
                        <Button onClick={onCloseTimeline} style={{ marginRight: 8 }}>
                            关闭
                        </Button>
                    </div>
                }
            >
                <Timeline mode="alternate">
                    {
                        timeLineData.map((item,index) => {
                            if (item.status === '0'){
                                return <Timeline.Item color="red" key={index} label="已取消关注">{item.createtime} - {`关注${item.noticer}`}</Timeline.Item>;
                            }
                            return <Timeline.Item key={index}>{item.createtime} - {`关注${item.noticer}`}</Timeline.Item>
                        })
                    }
                </Timeline>
            </Drawer>
        </div>
    );
}
export default AttentionTimeline