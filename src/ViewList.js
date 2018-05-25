import React, {Component} from 'react';
import PropTypes from 'prop-types'
import ViewListItem from './ViewListItem'

class ViewList extends Component{
    static get defaultProps(){
        return {
            data_arrays : [],
            toggleItemListener: ()=>{},
            deleteItemListener: ()=>{},
            editItmeListener: ()=>{},
        }
    }
    static propsTypes={
        data_arrays: PropTypes.arrayOf(PropTypes.object).isRequired,
        toggleItemListener: PropTypes.func.isRequired,
        deleteItemListener: PropTypes.func.isRequired,
        editItmeListener: PropTypes.func.isRequired,
    }
    render() {
        const {
            data_arrays,
            toggleItemListener,
            deleteItemListener,
            editItmeListener,
        }= this.props;

        return (
        <ul>
            {
                data_arrays.map((itemObj)=>{
                    console.log("--------test ---itemObj = ",itemObj);
                    return (
                        <li key={'li_' +itemObj.id}>
                         {/* <ViewListItem aid={itemObj.id} isChecked={itemObj.checked} title={itemObj.title} toggleItem={itemObj.toggleItem} /> */}
                         <ViewListItem 
                            aid={itemObj.id} 
                            isChecked={itemObj.checked} 
                            title={itemObj.title} 
                            toggleItem={toggleItemListener} 
                            deleteItem={deleteItemListener}
                            editItem={editItmeListener}/>
                         </li>
                        );
                })
            }
        </ul>
        )
    }
}
export default ViewList;