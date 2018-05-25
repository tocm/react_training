import React, {Component} from 'react';
import PropTypes from 'prop-types';//used by react version >1.5 

class ViewInputBox extends Component{

    static get defaultProps() {
        return {
            type: "text",
            style: {width:200, margin:0},
            placeholder: "",
            onKeyDown: ()=>{},
            autoFocus: false,

        }
    }

    static propType = {
        type: PropTypes.string.isRequired,
        style: PropTypes.object.isRequired,
        placeholder: PropTypes.string.isRequired,
        onKeyDown: PropTypes.func.isRequired,
        autoFocus: PropTypes.bool.isRequired,
    }

    render(){
        const{
            type,
            style,
            placeholder,
            onKeyDown,
            autoFocus,
        }=this.props;

        return (
            <input {...this.props}/>
        );
    }
}
export default ViewInputBox;
