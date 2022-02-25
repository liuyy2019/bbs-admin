import React from 'react'
import {Col, Popover, Row, Layout} from "antd";
import {MenuFoldOutlined, MenuUnfoldOutlined, SmileTwoTone, SkinTwoTone} from "@ant-design/icons";
import MyMenu from "../myMenu/myMenu";
import {getToken} from "../../util/userLoginUtil";

const {Header} = Layout;

export default ({collapsed, toggle}) => {

    // 切换颜色
    const changeColor = (color) => {
        console.log(color)
        window.less.modifyVars({
            '@primary-color': color
        }).then((vars) => {
            // console.log(vars)
            // this.setState({ color })
        })
    }

    const content = (
        <div>
            <span className={'color-span'} style={{backgroundColor: '#13E8E9'}}
                  onClick={() => changeColor('#13E8E9')}/>
            <span className={'color-span'} style={{backgroundColor: '#1890ff'}}
                  onClick={() => changeColor('#1890ff')}/>
            <span className={'color-span'} style={{backgroundColor: '#ff4d4f'}}
                  onClick={() => changeColor('#ff4d4f')}/>
        </div>
    );

    return (
        <Header className="header" style={{height: '10vh', minHeight: "64px"}}>
            <Row style={{justifyContent: 'space-between'}}>
                <Col>
                    <div style={{color: 'white', lineHeight: '64px', fontSize: '26px'}}>
                        <span style={{paddingRight: "10px"}}>CMS管理系统</span>
                        <span onClick={toggle}> {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}</span>
                    </div>
                </Col>
                <Col>
                    <span style={{display: 'flex', alignItems: 'center', fontSize: '20px'}}>
                        <Popover placement="bottom" content={content} trigger="click">
                            <SkinTwoTone className={'color'}/>
                        </Popover>
                        <Popover placement="bottom" content={<MyMenu/>}>
                            <SmileTwoTone/>
                            <span style={{color: '#fff'}}> 欢迎！{getToken("user").name}</span>
                        </Popover>
                    </span>
                </Col>
            </Row>
        </Header>
    )
}
