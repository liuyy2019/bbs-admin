/**
 * 通用内容头部：面包屑和搜索模块
 */

import React from 'react'
import GeneratorSearch from "./GeneratorSearch";
import {Breadcrumb, Card} from "antd";


/**
 * 公用面包屑组件，Breadcrumb.Item参数格式：
 *      {
 *          content：'首页',
 *          href: '',
 *          icon: <HomeOutlined />
 *      }
 */
const GeneratorBreadcrumb = ({ itemList, customOption }) => {
    const defaultOption = {
        separator: '/'
    }
    const options = {...defaultOption, ...customOption };
    return (
        <Breadcrumb {...options}>
            {
                itemList.map(item => (
                    // item.href设置为undefined不是刷新页面
                    <Breadcrumb.Item href={item.href || undefined} key={item.content}>
                        {item.icon}
                        <span>{item.content}</span>
                    </Breadcrumb.Item>
                ))
            }
        </Breadcrumb>
    )
}

const CommonContentHead = ({breadcrumb, searchItemList, onFinish}) => {

    return (
        <Card size="small" style={{minHeight: '110px'}}>
            <GeneratorBreadcrumb itemList={breadcrumb}/>
            <GeneratorSearch onFinish={onFinish} searchItemList={searchItemList}/>
        </Card>
    )
}
export default CommonContentHead
