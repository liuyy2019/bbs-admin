import React from 'react';
import {Layout, Menu,Dropdown,Row,Col,Avatar,Popover} from 'antd';
import { Link } from 'react-router-dom'
import { SkinTwoTone } from '@ant-design/icons';
import {
    DownOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
import IconFont from "../IconFont/IconFont";
// import IconFont from "@/components/IconFont/IconFont";
import './index.css';
import { privateRoutes } from "../../routes/routeConfig";
import MyMenu from '../../components/myMenu/myMenu'
import {getToken} from "../../util/userLoginUtil";


const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

class MyLayout extends React.Component {
    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        this.setState({ collapsed });
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    getIcon = (icon) => {
        if (icon && typeof icon === 'object') {
            return icon
        }
        return (<IconFont type={icon}/>)
    }
    changeColor = (color) => {
        console.log(color)
        window.less.modifyVars({
            '@primary-color': color
        }).then((vars) => {
            console.log(vars)
            this.setState({ color })
        })
    }

    render() {
        const user = getToken();
        const{collapsed} = this.state;
        const content = (
            <div>
                <span className={'color-span'} style={{backgroundColor: '#13E8E9'}} onClick={() => this.changeColor('#13E8E9')}/>
                <span className={'color-span'} style={{backgroundColor: '#1890ff'}} onClick={() => this.changeColor('#1890ff')}/>
                <span className={'color-span'} style={{backgroundColor: '#ff4d4f'}} onClick={() => this.changeColor('#ff4d4f')}/>
            </div>
        );
        return (
            <Layout style={{minHeight: '100%',height: "100vh"}}>
                <Header className="header" style={{height: '10vh',minHeight:"64px"}}>
                    <Row style={{justifyContent: 'space-between' }}>
                        <Col>
                            <div style={{color:'white',lineHeight:'64px',fontSize:'26px'}} >
                                <span style={{paddingRight: "10px"}}>CMS管理系统</span>
                                <span onClick={this.toggle}> {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/> }</span>
                            </div>
                        </Col>
                        <Col style={{display: 'flex', alignItems: 'center'}}>
                            <Popover placement="bottom" content={content} trigger="click">
                                <SkinTwoTone twoToneColor="#AA3131FF" className={'color'}/>
                            </Popover>
                            <Dropdown overlay={<MyMenu/>}>
                                <div onClick={e => e.preventDefault()} className={'custom-avatar'}>
                                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                    <span style={{color: '#fff'}}>
                                        欢迎！{getToken("user").name}
                                        <DownOutlined />
                                    </span>
                                </div>
                            </Dropdown>
                        </Col>
                    </Row>
                </Header>
                <Layout className="site-layout" style={{height: "90vh"}}>
                    <Sider collapsible={false} collapsed={collapsed} onCollapse={this.onCollapse} style={{
                        overflow: 'auto'
                    }}>
                        <Menu theme="dark" mode="inline" style={{minHeight: '100%'}}>
                            {
                                privateRoutes.map((item,index) => (
                                    <SubMenu key={index} title={<span>{this.getIcon(item.icon)}<span>{item.title}</span></span>}>
                                        {
                                            item.children && item.children.map(menuItem => {
                                                if (menuItem.level) {
                                                    return menuItem.level === user.level ? (
                                                        <Menu.Item key={menuItem.pathname}><Link to={menuItem.pathname}>{this.getIcon(menuItem.icon)}{menuItem.title}</Link></Menu.Item>
                                                    ): null
                                                }
                                                return (
                                                    <Menu.Item key={menuItem.pathname}><Link to={menuItem.pathname}>{this.getIcon(menuItem.icon)}{menuItem.title}</Link></Menu.Item>
                                                )
                                            })
                                        }
                                    </SubMenu>
                                ))
                            }
                        </Menu>
                    </Sider>
                    <Content
                        className="site-layout-background border-common"
                        style={{
                            padding:0,
                            margin: 12,
                            minHeight: 280,
                        }}
                    >
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        );
    }

}

export default MyLayout
