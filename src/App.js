import React from 'react';
import {Switch, Route} from 'react-router-dom'
import MyLayout from "./components/layout/myLayout";
import {privateRoutes} from "./routes/routeConfig"
import NotFound from "./pages/notFound/NotFound";

function App() {

    const flatArray = (routers) => {
        const arr = [];
        routers.forEach(routerItem => {
            if(routerItem.children) {
                routerItem.children.forEach(item => {
                    if (item.children) {
                        arr.push(flatArray(item.children))
                    }
                    arr.push(item)
                })
            }
        })
        return arr
    }

    return (
        <MyLayout>
            <Switch>
                {/*2、配置私有路由组件 */}
                {
                    flatArray(privateRoutes).map((item, index) => {
                        return (
                            <Route key={index} path={item.pathname} component={item.component}/>
                        )
                    })
                }
                <Route component={NotFound}/>
            </Switch>
        </MyLayout>
    );
}

export default App;
