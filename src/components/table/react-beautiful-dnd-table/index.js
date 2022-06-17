import React, {forwardRef, useImperativeHandle, useState} from "react";
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {Table} from 'antd'


const CustomizeComponentTBody = (props) => {
    // console.log(props)
    const {children, ...other} = props
    return (
        <Droppable droppableId="droppable-0" direction={'horizontal'}>
            {(provided, snapshot) => (
                <tbody ref={provided.innerRef} {...provided.droppableProps} {...other} >
                {children}
                {provided.placeholder}
                </tbody>
            )}
        </Droppable>
    )
}

const CustomizeComponentRow = (props) => {
    console.log(props)

    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: 'none',
        // change background colour if dragging
        background: isDragging ? '#ECF6FF' : '#fff',
        // styles we need to apply on draggables
        opecity: isDragging ? 0.5 : 1,
        ...draggableStyle
    });

    const {index, record, ...rest} = props
    return (
        <Draggable draggableId={`draggableId ${record.key}`} index={index}>
            {(provided, snapshot) => (
                <tr ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    {...rest}
                    style={{
                        position: 'relative',
                        flex: 1,
                        height: '100%',
                        border: 'solid 1px #d9d9d9',
                        ...getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                        )
                    }}/>
            )}
        </Draggable>
    )
}

const ReactBeautifulDndTable = (props, ref) => {
    const {columns, dataSource, ...otherProps} = props;
    const [innerDataSource, setInnerDataSource] = useState([...dataSource])

    useImperativeHandle(ref, () => {
        return innerDataSource
    })
    const onDragEnd = (result) => {
        console.log(result);
        if (!result.source || !result.destination) return;
        const tempDataSource = [...innerDataSource]
        const oldIndex = result.source.index;
        const newIndex = result.destination.index;
        if (oldIndex === newIndex) return;
        const oldEl = tempDataSource.splice(oldIndex, 1);
        tempDataSource.splice(newIndex, 0, ...oldEl);
        setInnerDataSource(tempDataSource)
    };

    const components = {
        body: {
            wrapper: CustomizeComponentTBody,
            row: val => CustomizeComponentRow(val)
        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Table dataSource={innerDataSource} columns={columns} components={components}
                   onRow={(record, index) => ({index, record})}
                   {...otherProps}
            />
        </DragDropContext>
    )
}


export default forwardRef(ReactBeautifulDndTable)
