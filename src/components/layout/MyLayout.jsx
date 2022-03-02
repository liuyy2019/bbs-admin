import React from 'react';
import {Layout, Menu} from 'antd';
import { Link } from 'react-router-dom'
import IconFont from "../IconFont/IconFont";
// import IconFont from "@/components/IconFont/IconFont";
import { privateRoutes } from "../../routes/routeConfig";
import {getToken} from "../../util/userLoginUtil";
import MyHead from './MyHead'


const {SubMenu} = Menu;
const {Content, Sider} = Layout;

class MyLayout extends React.Component {
    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        this.setState({ collapsed });
    };

    toggle = () => {
        this.setState(({ collapsed }) => ({
            collapsed: !collapsed
        }))
    }

    getIcon = (icon) => {
        if (icon && typeof icon === 'object') {
            return icon
        }
        return (<IconFont type={icon}/>)
    }

    render() {
        const user = getToken();
        const{collapsed} = this.state;

        return (
            <Layout style={{minHeight: '100%',height: "100vh"}}>
                <MyHead collapsed={collapsed} toggle={this.toggle}/>
                <Layout className="site-layout" style={{height: "90vh"}}>
                    <Sider collapsible={true} collapsed={collapsed} onCollapse={this.onCollapse} style={{
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
                                                        <Menu.Item key={menuItem.pathname}><Link to={menuItem.pathname}>
                                                            {this.getIcon(menuItem.icon)}{menuItem.title}</Link>
                                                        </Menu.Item>
                                                    ): null
                                                }
                                                return (
                                                    <Menu.Item key={menuItem.pathname}>
                                                        <Link to={menuItem.pathname}>{this.getIcon(menuItem.icon)}{menuItem.title}</Link>
                                                    </Menu.Item>
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
                            padding: 0,
                            margin: 12,
                            minHeight: 260
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
