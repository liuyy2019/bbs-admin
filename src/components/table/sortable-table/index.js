import React, {useEffect, useRef, useState, useImperativeHandle} from 'react'
import {Table} from "antd";
import Sortable from 'sortablejs';
import './index.css'


const Index = ({ dataSource, columns,...otherTableProps }, ref) => {
    const tableContainerRef = useRef(null)
    const [innerDataSource, setInnerDataSource] = useState([...dataSource])
    const [innerColumns, setInnerColumns] = useState([...columns])

    useImperativeHandle(ref,() => {
        return innerDataSource
    }, [innerDataSource])

    useEffect(() => {
        tableRowDrag(tableContainerRef.current);
    }, [innerDataSource])

    useEffect(() => {
        tableColumnDrag(tableContainerRef.current);
    }, [innerColumns])

    const sortableOnEnd = (oldIndex, newIndex) => {
        const tempDataSource = deepClone(innerDataSource);
        // 两个数据位置交换
        [tempDataSource[oldIndex], tempDataSource[newIndex]] = [tempDataSource[newIndex], tempDataSource[oldIndex]];

        console.log(oldIndex, newIndex, tempDataSource)
        setInnerDataSource(tempDataSource)
    }

    const deepClone = (value) => JSON.parse(JSON.stringify(value))
    const tableRowDrag = (componentBackingInstance) => {
        // let el = componentBackingInstance.getElementsByClassName('ant-table-tbody')[0];
        let el = componentBackingInstance.querySelector('.ant-table-tbody');
        const sortable = Sortable.create(el, {
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

            onEnd: (evt) => {
                // 交换元素位置
                const { oldIndex, newIndex } = evt;
                if (oldIndex === newIndex) return
                sortableOnEnd(oldIndex, newIndex)
                sortable.destroy()
            },
        });
    }

    const tableColumnDrag = (componentBackingInstance) => {
        // let el = componentBackingInstance.getElementsByClassName('ant-table-tbody')[0];
        let el = componentBackingInstance.querySelector('.ant-table-thead tr');
        if (!el) return
        const sortable = Sortable.create(el, {
            animation: 500, //动画参数
            // easing: "cubic-bezier(1, 0, 0, 1)",
            // delay: 100, // 拖拽延迟
            sort: true,  // 是否排序，false-在组内不能拖动，但能拖动到别的组内；true能拖动
            disabled: false, // 关闭拖拽
            ghostClass: 'blue-background-class', // drop placeholder的css类名
            chosenClass: 'sortable-chosen',  // 被选中项的css 类名

            // 正在被拖拽中的css类名，需要设置设置forceFallback: true禁用html5原生拖拽。
            forceFallback: true,
            dragClass: 'sortable-drag',

            onEnd: (evt) => {
                // 交换元素位置
                const { oldIndex, newIndex } = evt;
                if (oldIndex === newIndex) return;
                const tempColumns = deepClone(innerColumns)
                const oldEl = tempColumns.splice(oldIndex, 1);
                tempColumns.splice(newIndex, 0, ...oldEl);
                setInnerColumns(tempColumns)

                sortable.destroy()
            },
        });
    }

    return (
        <div ref={tableContainerRef}>
            <Table dataSource={innerDataSource} columns={innerColumns} size={'small'} {...otherTableProps} />
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
