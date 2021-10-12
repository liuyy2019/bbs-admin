import React from 'react';
import {Layout, Menu,Dropdown,Row,Col,Avatar} from 'antd';
import { Link } from 'react-router-dom'
import {
    UserOutlined,
    LaptopOutlined,
    DownOutlined,
    NotificationOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
import './index.css';
import {privateRoutes} from "../../routes/routeConfig";
import MyMenu from '../../components/myMenu/myMenu'
import {getToken} from "../../util/userLoginUtil";


// 过滤出顶级导航
const topMenus = privateRoutes.filter(item => {
    return item.isTop === true;
})
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

    render() {
        const user = getToken();
        const{collapsed} = this.state
        return (
            <Layout style={{minHeight: '100%',height: "100vh"}}>
                <Header className="header" style={{height: '10vh',minHeight:"64px"}}>
                    <Row style={{justifyContent: 'space-between' }}>
                        <Col>
                            <div style={{color:'white',lineHeight:'64px',fontSize:'26px'}} >
                                <span style={{paddingRight: "10px"}}>CMS管理系统</span>
                                {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                    className: 'trigger',
                                    onClick: this.toggle,
                                })}
                            </div>
                        </Col>
                        <Col>
                            <Dropdown overlay={<MyMenu/>} >
                                <div style={{color:'#fff'}} className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                    欢迎！{getToken("user").name}<DownOutlined />
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
                            <SubMenu key="sub1" title={<span><LaptopOutlined/><span>监控中心</span></span>}>
                                <Menu.Item key="1"><Link to="/admin/dashboard">监控台</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" title={<span><UserOutlined/><span>用户管理</span></span>}>
                                <Menu.Item key="3"><Link to={{pathname:"/admin/userList",state:{reports:0}}}>用户列表</Link></Menu.Item>
                                <Menu.Item key="4"><Link to="/admin/attention">用户关注列表</Link></Menu.Item>
                                <Menu.Item key="8"><Link to="/admin/reportUser">用户举报记录</Link></Menu.Item>
                                {user.level==="1"?<Menu.Item key="10"><Link to="/admin/admin">管理员列表</Link></Menu.Item>:null}
                            </SubMenu>
                            <SubMenu key="sub3" title={<span><NotificationOutlined/><span>帖子管理</span></span>}>
                                <Menu.Item key="5"><Link to="/admin/invitationList">帖子列表</Link></Menu.Item>
                                {/*<Menu.Item key="6"><Link to="/admin/answerList">问答列表</Link></Menu.Item>*/}
                                <Menu.Item key="7"><Link to="/admin/collection">收藏管理</Link></Menu.Item>
                                <Menu.Item key="16"><Link to="/admin/reportInvitation">帖子举报记录</Link></Menu.Item>
                                <Menu.Item key="11"><Link to="/admin/typeList">帖子种类</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub4" title={<span><UserOutlined/><span>审核中心</span></span>}>
                                <Menu.Item key="15"><Link to={{pathname:"/admin/checkUserList"}}>审核举报用户</Link></Menu.Item>
                                <Menu.Item key="9"><Link to="/admin/checkInvitationList">审核举报帖子</Link></Menu.Item>
                                <Menu.Item key="20"><Link to="/admin/checkCommentList">审核举报评论</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub5" title={<span><UserOutlined/><span>公告中心</span></span>}>
                                <Menu.Item key="10"><Link to="/admin/announcement">公告列表</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub6" title={<span><UserOutlined/><span>评论管理</span></span>}>
                                <Menu.Item key="11"><Link to="/admin/comment">评论列表</Link></Menu.Item>
                                <Menu.Item key="18"><Link to={{pathname:"/admin/reportComment",state:{commentId:null}}}>评论举报记录</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub7" title={<span><UserOutlined/><span>参数管理</span></span>}>
                                <Menu.Item key="21"><Link to="/admin/paramList">参数列表</Link></Menu.Item>
                                <Menu.Item key="22"><Link to="/admin/enumTypeList">参数字典列表</Link></Menu.Item>
                                <Menu.Item key="23"><Link to="/admin/enumParamList">枚举类型列表</Link></Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Content
                        className="site-layout-background"
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
