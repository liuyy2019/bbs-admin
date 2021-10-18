/**
 * 通用表格组件
 */
import React, {Fragment} from 'react'
import { Table, Pagination } from "antd";

const { Column } = Table
const GeneratorTable = ({isLoading, dataSourceList, tableItemList, onPageChange, page = {} }) => {

    const onChange = (...rest) => {
        onPageChange && onPageChange(...rest)
    }
    const onShowSizeChange = (...rest) => {
        onPageChange && onPageChange(...rest)
    }

    const { pageNum, pageSize, total } = page;
    return (
        <Fragment>
            <Table rowKey="id" loading={isLoading} pagination={false}
                   dataSource={dataSourceList} scroll={{ y: 360 }} size="middle" >
                <Column dataIndex={'index'} title="序号" align="center" width={50} fixed="left" render={(text,record,index)=>`${index+1}`}/>
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
                    total={total}
                    current={pageNum}
                    pageSize={pageSize}
                    showSizeChanger
                    pageSizeOptions={['10', '20', '50']}
                    onChange={onChange}
                    onShowSizeChange={onShowSizeChange}
                    showTotal={total => `共 ${total} 条`}
                />
            </div>
        </Fragment>
    )
}

export default GeneratorTable
