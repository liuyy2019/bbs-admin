/**
 * 工具方法集合
 */
import React from 'react';
import {Tooltip,Tag} from 'antd'
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
    },

    /**
     * 十六进制颜色生成：https://www.jianshu.com/p/54fc0fce46cc
     * 严格模式下不支持arguments.caller和callee：
     *     https://segmentfault.com/q/1010000016180686
     * 可以给匿名函数起个名字，如下get：#3856f2
     */
    getRandomColor(){
        return  '#' + (function get(color){
            return (color +=  '0123456789abcdef'[Math.floor(Math.random()*16)])
            && (color.length === 6) ?  color : get(color);
        })('');
    },

    /**
     * 设置文本为：进行标记和分类的小标签。自定义颜色
     * @param text
     * @returns {*}
     */
    textTag(text){
        return <Tag color={this.getRandomColor()}>{text}</Tag>
    },

    /**
     * 文本和list项进行匹配，返回tag标识为文本
     * @param text
     * @param selectList
     * @param id
     * @param name
     * @returns {*}
     */
    textAndOptionsTag(text,selectList, id='codeName', name='description'){
        if (selectList.length !== 0) {
            const result = selectList.find((items) => text == items[id])
            if (result) {
                return <Tag color="cyan">{[result[id], result[name]].join(' - ')}</Tag>
            }
        }
        return <Tag color="cyan">{text}</Tag>
    },



}