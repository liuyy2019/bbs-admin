This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## 使用react-app-rewired修改create-react-app 中的 webpack配置
* [`react-app-rewired`](https://github.com/timarney/react-app-rewired) 的作用是在不`eject`的情况下修改`webpack`配置。

### 1、基本使用（使用customize-cra协助配置）
##### 1）安转依赖
* 纯`react-app-rewired`的方式配置：https://github.com/timarney/react-app-rewired#extended-configuration-options

```
npm install react-app-rewired --save-dev
```
* 使用` customize-cra` 协助自定义：https://github.com/arackaf/customize-cra#using-the-plugins
```
npm install customize-cra react-app-rewired --dev
```
* 查看`create-react-app`的版本

```shell
create-react-app -V
create-react-app --version
```
##### 2）在根目录下新建文件config-overrides.js文件
* 通过config-overrides.js文件来对webpack配置进行扩展
```js
const { override } = require('customize-cra');
module.exports = {};
```
##### 3）修改package.json文件
```js
{
  // ...
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
  },
  // ...
}
```
### 2、配置项
##### 1）按需加载antd的组件
* 引入 antd 样式文件，需要下载` babel-plugin-import`。
  `npm install babel-plugin-import --dev`
```js
const { override, fixBabelImports } = require('customize-cra');

module.exports = override(    
    fixBabelImports('import', {        
        libraryName: 'antd',        
        libraryDirectory: 'es',       
        style: 'css'
    })
);
```

##### 2）配置路径
```js
const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(    
    addWebpackAlias({        
        "@": path.resolve(__dirname, "src"),        
        "@components": path.resolve(__dirname, "src/components")   
    })
)
```
##### 3）配置less
* `npm install less less-loader --dev`
```js
const { override, addLessLoader } = require('customize-cra');

module.exports = override(
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            '@primary-color': '#1DA57A'
        }
    })
);
```
## 更换主题
* 参考：https://github.com/mzohaibqc/antd-theme-generator

## 配置代理
