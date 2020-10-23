/**
 * 基于ant design 的 Drawer组件封装
 */
import React from 'react'
import PropTypes from "prop-types"
import { Drawer, Button } from 'antd';

class GeneratorDrawer extends React.Component{


    // 抽屉的页脚按钮
    footerButton = (type) => {
        const detailButton = (
            <div style={{ textAlign: 'right',}}>
                <Button onClick={this.props.onClose} style={{ marginRight: 8 }}>关闭</Button>
            </div>
        );
        const editButton = (
            <div style={{textAlign: 'right',}}>
                <Button onClick={this.props.onClose} style={{ marginRight: 8 }}>取消</Button>
                <Button onClick={this.props.onSubmit} type="primary">确定</Button>
            </div>
        );
        return type === 'detail'? detailButton : editButton
    };

    render(){
        const {onClose,placement,width,visible,type,title,...rest} = this.props


        return (
            <Drawer
                title={title}
                placement={placement}
                width={width}
                closable={false}
                destroyOnClose={"true"}
                onClose={onClose}
                visible={visible}
                footer={this.footerButton(type)}
                {...rest}
            >
                {this.props.children}
            </Drawer>
        )
    }
}

// 规定props个属性的类型
GeneratorDrawer.propTypes = {
    values: PropTypes.object,
    forms: PropTypes.array,
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    onSubmit: PropTypes.func,
};

// 设置props属性的默认值
GeneratorDrawer.defaultProps = {
    placement: "right",
    visible:false,
    width: 520,
    onClose: () => {},
    onSubmit: () => {},
}


export default GeneratorDrawer
