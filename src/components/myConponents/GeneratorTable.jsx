/**
 * 通用表格组件
 */
import React, {Fragment} from 'react'
import { Table, Pagination } from "antd";

const { Column } = Table
const GeneratorTable = ({isLoading, dataSourceList, tableItemList, onPageChange}) => {

    const onChange = (...rest) => {
        onPageChange && onPageChange(...rest)
    }
    const onShowSizeChange = (...rest) => {
        onPageChange && onPageChange(...rest)
    }
    return (
        <Fragment>
            <Table rowKey="id" loading={isLoading} pagination={false}
                   dataSource={dataSourceList} scroll={{ y: 260 }} size="middle" >
                {
                    tableItemList.map((item,index) => {
                        const { title, dataIndex, align='center', ...rest} = item;
                        return (
                            <Column dataIndex={dataIndex} title={title} align={align} {...rest} key={`${dataIndex+index}`}/>
                        )
                    })
                }
            </Table>
            <div className={"flex-reverse"} style={{marginTop: '15px'}}>
                <Pagination
                    defaultCurrent={2}
                    total={500}
                    current={3}
                    showSizeChanger
                    onChange={onChange}
                    onShowSizeChange={onShowSizeChange}
                    showTotal={total => `共 ${total} 条`}
                />
            </div>
        </Fragment>
    )
}

export default GeneratorTable
