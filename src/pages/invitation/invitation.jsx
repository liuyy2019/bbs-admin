/* 帖子显示组件 */
import React from 'react';
import {Card} from "antd";
import {getInvitation} from "../../api";
// 引入EditorState
// import BraftEditor from 'braft-editor'
// 在展示页面引入css样板文件
import 'braft-editor/dist/output.css'

class Invitation extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            // data数据类型需要声明，否则报错
            data:{},
            id:this.props.location.state.id
        };
    }

    componentWillMount(){
        const {id} = this.state
        getInvitation({id:id},(data)=>{
            console.log(data);
            this.setState({
                data: data,
            })
        });
    }

    render (){
        const {title,content} = this.state.data;
        return(
            <div>
                <Card title={title}
                      description="1321313131"
                      extra={<a onClick={()=> window.history.back(-1)}>返回</a>}
                      style={{ width: "80%",margin: "10px auto"  }}
                      headStyle={{textAlign:'center'}}
                >
                    <div className="braft-output-content" dangerouslySetInnerHTML={{__html: content}} />
                </Card>
            </div>
        );
    }

}

export default Invitation