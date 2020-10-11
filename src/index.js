import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'antd/dist/antd.css'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import {BrowserRouter as Router,Route,Switch ,Redirect ,Link} from 'react-router-dom'
import {commonRoutes} from './routes/routeConfig'
import {isLogin} from "./util/userLoginUtil";

ReactDOM.render(
    <ConfigProvider locale={zhCN}>
        <Router>
            <Switch>
                {/* 1、私有组件部分,以/admin开始的，登录后显示的部分 */}
                <Route path="/admin"
                       render={(rootProps) => {
                           if (isLogin()) {
                               return <App {...rootProps}/>
                           }
                           return <Redirect to="/login"/>
                       }}
                />
                {/* 2、公共组件部分，未登录亦能访问 */}
                {
                    commonRoutes.map((item,index)=>{
                        return (
                            <Route key={index} path={item.pathname} component={item.component}></Route>
                        )
                    })
                }
                {/* 3、配置notFound 和默认路由*/}
                {/* exact:当path在全部匹配是进行路由跳转 */}
                <Redirect from="/" to="/login" exact/>
                <Redirect to="/404"/>
            </Switch>
        </Router>
    </ConfigProvider>,
    document.getElementById('root')
);

