import React, {useEffect, useRef, useState, useImperativeHandle} from 'react'
import {Table} from "antd";
import Sortable from 'sortablejs';
import './index.css'


const Index = ({ dataSource, columns,...otherTableProps }, ref) => {
    const tableContainerRef = useRef(null)
    const [innerDataSource, setInnerDataSource] = useState(dataSource)

    useImperativeHandle(ref,() => {
        return innerDataSource
    }, [innerDataSource])

    //拖拽初始化及逻辑
    const sortableGoods = (componentBackingInstance = document) => {
        // let el = componentBackingInstance.getElementsByClassName('ant-table-tbody')[0];
        let el = componentBackingInstance.querySelector('.ant-table-tbody');
        if (!el) return
        Sortable.create(el, {
            animation: 1000, //动画参数
            // easing: "cubic-bezier(1, 0, 0, 1)",
            // delay: 100, // 拖拽延迟
            sort: true,  // 是否排序，false-在组内不能拖动，但能拖动到别的组内；true能拖动
            disabled: false, // 关闭拖拽
            ghostClass: 'blue-background-class', // drop placeholder的css类名
            chosenClass: 'sortable-chosen',  // 被选中项的css 类名

            // 正在被拖拽中的css类名，需要设置设置forceFallback: true禁用html5原生拖拽。
            forceFallback: true,
            dragClass: 'sortable-drag',

            onEnd: function (evt) {
                const tempDataSource = [...innerDataSource]
                // 交换元素位置
                const { oldIndex, newIndex } = evt;
                const oldEl = tempDataSource.splice(oldIndex, 1);
                tempDataSource.splice(newIndex, 0, ...oldEl);

                setInnerDataSource(tempDataSource)
            }
        });
    }

    useEffect(() => {
        sortableGoods(tableContainerRef.current)
    }, [])


    return (
        <div ref={tableContainerRef}>
            <Table dataSource={innerDataSource} columns={columns} size={'small'} {...otherTableProps} />
        </div>
    )
}

export default React.forwardRef(Index)

/**
 * https://blog.csdn.net/web_yueqiang/article/details/95989355
 * https://blog.csdn.net/baidu_41457482/article/details/117106550
 * Sortablejs：https://github.com/SortableJS/Sortable
 * Sortablejs中文网：http://www.sortablejs.com/
 * https://www.itxst.com/sortablejs/f67ney22.html
 */
