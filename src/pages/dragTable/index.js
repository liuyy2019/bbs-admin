import React, { useRef } from "react";
import CustomSortable from "../../components/table/sortable-table/index";
import {Button} from "antd";

export default () => {
    const tableRef = useRef(null)

    const onSave = () => {
        console.log(tableRef.current)
    }
    const dataSource = [
        {
            key: '1',
            name: '胡彦斌1',
            age: 32,
            address: '西湖区湖底公园1号',
        },
        {
            key: '2',
            name: '胡彦祖2',
            age: 42,
            address: '西湖区湖底公园1号',
        },
        {
            key: '3',
            name: '胡彦祖3',
            age: 52,
            address: '西湖区湖底公园1号',
        },
    ];

    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
        },
    ];

    return (
        <div>
            <CustomSortable ref={tableRef} dataSource={dataSource} columns={columns}/>
            <Button onClick={onSave}>保存</Button>
        </div>
    )
}
