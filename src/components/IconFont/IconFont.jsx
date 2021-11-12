/**
 * 组件作用：使用iconfont中的图标
 * 参考：https://3x.ant.design/components/icon-cn/ 自定义图标
 * 用法：<IconFont type="icon-guanli" />
 */
import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';


const IconFont = ({ type = 'icon-guanli', ...otherProper}) => {
    // iconfont项目中图标 生成的在线连接
    const IconFontComponent = createFromIconfontCN({
        scriptUrl: '//at.alicdn.com/t/font_2931573_iymkf6hwvw.js',
    });
    return (
        <IconFontComponent type={type} {...otherProper}/>
    )
}


export default IconFont
