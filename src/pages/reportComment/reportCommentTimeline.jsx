/* 公告的新增、修改、查看组件 */
import React from 'react'
import { Drawer, Button,Timeline} from 'antd';
import {getListAttentionsByName} from '../../api/index'



class ReportCommentTimeline extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }



   /* componentWillReceiveProps(props,nextProps){
        let {username} = props.values;
        getListAttentionsByName({username:username},result => {
            this.setState({
                data:result
            })
        })
    }*/


    render() {
        const {onCloseTimeline,visibleTimeline,TimelineValues} = this.props
        return (
            <div>
                <Drawer
                    title={`该评论被举报时间轴`}
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
                            TimelineValues.map(item => {
                                if (item.status === '0'){
                                    return <Timeline.Item color="red" label="已取消关注">{item.createTime} - {`${item.reportName}取消举报`}</Timeline.Item>;
                                }
                                return <Timeline.Item >{item.createTime} - {`${item.reportName}举报`}</Timeline.Item>
                            })
                        }
                    </Timeline>
                </Drawer>
            </div>
        );
    }
}

export default ReportCommentTimeline