import React, { Component} from 'react';
import PropTypes from 'prop-types';//used by react version >1.5 
import ViewInputBox from './ViewInputBox';

class ViewListItem extends Component{
    //构造函数
    constructor(props){
        super(props);
        this.state = {
            isEidtMode: false
        }
    }

    /**
    * 设置默认值
    */
    static get defaultProps(){
        return {
            title:"11111",
            isChecked: false,
            aid: 100,
            toggleItem: (params) => { console.log("toggle item ",params)},
            deleteItem: (tid) => {},
            editItem: (tid) => {},
        }
    }
    /**
    * 指定属性类型
    */
   static propTypes = {
        title: PropTypes.string.isRequired,
        isChecked: PropTypes.bool.isRequired,
        aid: PropTypes.number.isRequired,
        toggleItem: PropTypes.func.isRequired,
        deleteItem: PropTypes.func.isRequired,
        editItem: PropTypes.func.isRequired,
    }

    /**
     * 刷新状态
     */
    refreshState = () =>{
        this.state.isEidtMode = !this.state.isEidtMode;
        return this.setState({ isEditMode: this.state.isEidtMode});
    }

    /**
     * 只读模式
     */
    readMode = () =>{
        return(
            <span style={{margin: 5}} 
                //通过双击键来切换显示/修改 模式
                onDoubleClick= {() =>{
                    this.refreshState();
            }}>
            {this.props.title}
            </span>
        )
    };

    editMode = () => {
        return (
            <ViewInputBox 
                type="text" 
                defaultValue={this.props.title} 
                autoFocus={true} 
                style={{width: 200, height: 15, margin: 5, border: 0}}
                onBlur={()=>{
                    this.refreshState();
                }}
                onKeyDown={(e) => {
                    console.log("onkeydown ",e.keyCode);
                    if(e.keyCode === 13 && e.target.value !== "") {
                        //通知上层更新数据
                        this.props.editItem(this.props.aid, e.target.value);
                        //reset status
                        this.refreshState();
                    }
                    
                }}
            />
        )
    }


    //渲染
    render(){
         //定义属性
         const{
            isChecked,
            title,
            aid,
            toggleItem,
            deleteItem,
            editItem,         
        } = this.props;

        return(
            <div>
            {/* 单选按钮 */}
            <input 
                type="checkbox" 
                checked={isChecked}
                onChange={() => {
                    toggleItem(aid);
                }}
            />
            {/* 加载不同控件 */}
            {this.state.isEidtMode ? this.editMode() : this.readMode()}

            {/* 删除按钮 */}
            <button 
                onClick={() => {
                    deleteItem(aid)}
                }>X</button>
        </div>
        )

       
    }
}

export default ViewListItem;