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
    }
}