/**
 * 工具方法集合
 */
import React from 'react';
import {Tooltip} from 'antd'
export default {

    /**
     * 长文本处理，超过指定长度，多出字符显示...
     * @param value  需要处理的文本
     * @param length  指定长度，默认10
     */
    longContentHandle(value,length=10){
        const show = value && value.length > length ? `${value.substr(0, length)}...` : value;
        return (
            <Tooltip title={value} trigger={['hover','click']}>
                {show}
            </Tooltip>
        )
    },

    /**
     * 日期格式化
     */
    dateFormat: "YYYY-MM-DD HH:mm:ss",

    /**
     * 抽屉弹层title前置
     */
    titlePrefix: {
        create: '新建',
        detail: '查看',
        copy: '复制',
        edit: '编辑',
    },


    /**
     * 创建 一个深拷贝的克隆object
     * @param {*} jsonData object
     * @returns
     */
    deepClone(jsonData){
        if (!jsonData) return jsonData

        return JSON.parse(JSON.stringify(jsonData))
    },

    /**
     * DatePicker组件：定制日期单元格
     * @param current
     * @returns {*}
     */
    dateRender(current){
        const style = {};
        // 渲染条件
        if (current.date() === 1) {
            style.border = '1px solid #1890ff';
            style.borderRadius = '50%';
        }
        return (
            <div className="ant-picker-cell-inner" style={style}>
                {current.date()}
            </div>
        );
    }
}