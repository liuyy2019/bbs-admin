import React, {useEffect, useRef, useState, useImperativeHandle} from 'react'
import {Table} from "antd";
import Sortable from 'sortablejs';



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
            animation: 100, //动画参数
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
 */
