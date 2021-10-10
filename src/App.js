import React from 'react';
import { Switch,Route } from 'react-router-dom'
import MyLayout from "./components/layout/myLayout";
import {privateRoutes} from "./routes/routeConfig"

function App() {
  return (
      <MyLayout>
          <Switch>
              {/*2、配置私有路由组件 */}
              {
                  privateRoutes.map((item,index)=>{
                      return (
                          <Route key={index} path={item.pathname} component={item.component}/>
                      )
                  })
              }
          </Switch>
      </MyLayout>
  );
}

export default App;
