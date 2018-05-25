import React, {Component} from 'react';
import PropTypes from 'prop-types';//used by react version >1.5 

class ViewHeader extends Component{

    //构造函数
    constructor(props)
    {
        super(props);
    }
    
    //初始化属性数据
    static get defaultProps(){
        return{
            name: "andy",
            unCheckedCount: 0,
        }
    }
    //指定属性类型
    static propTypes={
        name: PropTypes.string.isRequired,
        unCheckedCount: PropTypes.number.isRequired
    }
    //渲染
    render(){
        //定义属性
        const{
            name,
            unCheckedCount,
        }=this.props;
        return (
        <div>
            <h1>Hello, { name } Welcome to demo app</h1>
            <h5>Please input a item at here input box</h5>
            <h3>待办项目 {unCheckedCount} 条</h3>
        </div>
        )
    }
}
export default ViewHeader;