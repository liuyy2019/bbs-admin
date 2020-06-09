/* 公告的新增、修改、查看组件 */
import React from 'react'
import { Drawer, Button,Timeline} from 'antd';
import {getListAttentionsByName} from '../../api/index'



class ReportUserTimeline extends React.Component {

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
                    title={`举报用户时间轴`}
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
                                    return <Timeline.Item color="red" label="已取消关注">{item.createTime} - {`关注${item.reportName}`}</Timeline.Item>;
                                }
                                return <Timeline.Item >{item.createTime} - {`举报${item.reportName}`}</Timeline.Item>
                            })
                        }
                    </Timeline>
                </Drawer>
            </div>
        );
    }
}

export default ReportUserTimeline