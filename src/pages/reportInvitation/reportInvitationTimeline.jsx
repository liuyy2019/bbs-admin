/**
 * 1、评论举报页面时间轴弹层
 */
import React from 'react'
import { Drawer, Button,Timeline} from 'antd';


const ReportInvitationTimeline = ({onClose,visibleTimeline,TimelineValues}) => {
    return (
        <div>
            <Drawer
                title={`举报用户时间轴`}
                placement="right"
                width={520}
                // destroyOnClose={"true"}
                onClose={() => onClose('timeLine')}
                visible={visibleTimeline}
                footer={
                    <div style={{ textAlign: 'right',}}>
                        <Button onClick={() => onClose('timeLine')} style={{ marginRight: 8 }}>
                            关闭
                        </Button>
                    </div>
                }
            >
                <Timeline mode="alternate">
                    {
                        TimelineValues.map((item,index)   => {
                            if (item.status === '0'){
                                return <Timeline.Item key={index} color="red" label="已取消关注">{item.createTime} - {`${item.reportName} 举报${item.title}`}</Timeline.Item>;
                            }
                            return <Timeline.Item key={index}>{item.createTime} - {`${item.reportName} 举报${item.title}`}</Timeline.Item>
                        })
                    }
                </Timeline>
            </Drawer>
        </div>
    );
};

export default ReportInvitationTimeline