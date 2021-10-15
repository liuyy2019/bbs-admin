import React from 'react';
import { Empty } from 'antd';

class NotFound extends React.Component{
    render() {
        return (
            <div className={"display-flex-center"}>
                <Empty/>
            </div>
        )
    }
}

export default NotFound
