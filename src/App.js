import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ViewInputBox from './ViewInputBox';
import ViewHeader from './ViewHeader'
import ViewList from './ViewList';

/**
 * 由于拿不到类中的元素，暂时不能实现想要的逻辑，直接把函数通过数组内中函数传递方式
 * @param {*} tid 
 */
function _todoToggleItem(tid) {
    console.log("toggle item id ",{tid} );
}

/**
 * 监听单选框事件处理
 * @param {*} srcArrays 
 * @param {*} tid 
 */
let _funcToggleItemListener = (srcArrays, tid) => {
    console.log("todoToggleItemListener id ",{tid} );
    let targetObj = srcArrays.find((obj) => {
        return obj.id === tid;
    })

    targetObj.checked = !targetObj.checked;
    console.log("after todoToggleItemListener  ",srcArrays);
    return srcArrays;

}

/**
 * 删除指定item
 * @param {*} srcArrays 
 * @param {*} tid 
 */
let _funcDelItemListener = (srcArrays, tid) => {

    //找到删除的index
    let targetIndex = srcArrays.findIndex((obj) => {
        return obj.id === tid;
    });

    //执行删除
    srcArrays.splice(targetIndex, 1 );//参数1,只删除从index中的一次，否则会从index 开始后面的也执行
    return srcArrays;
}

let _funcCreateItem = (srcArrays, title) => {
    if(title === ""){
        return srcArrays;
    }

    //先确定id，判断原来数组是否为0
    var len = srcArrays.length;
    var new_id =  len ? srcArrays[len - 1].id + 1 : 100;
    //push 新记录到数组字典
    srcArrays.push({
        id: new_id,
        title: title,
        checked: false,
    });
}

let _funcAddItemListener = (srcArrays, keyCode, title) => {
    if(keyCode === 13 && title !== "") { //for enter key 
       srcArrays : _funcCreateItem(srcArrays, title);
    }
    return srcArrays;
}

let _funcEditItemListener = (srcArrays, tid, new_value) => {
    console.log("edit item litener callback===> new value =",new_value);
    if(new_value === "") {
        return;
    }

    var editObject = srcArrays.find((obj) => {
        return tid === obj.id;
    });
    if(editObject) {
        editObject.title = new_value;
    }
    
    return srcArrays;
}

class App extends Component{    
    componentWillMount(){
        console.log("componentWillMount");
    }

    /**
     * Component类 中
     * 生命周期didmount
     * 
     * testData.json 文件放在public目录下
     */
    componentDidMount(){
        console.log("componentDidMount");
        fetch("testData.json")
            .then((data) => data.json())
            .then(((localData) => {
                this.setState({localData});
            }));
    }
    constructor(propos){
        super(propos);

        //初始化状态机变量数据
        this.state = {
            localData: [],
        }
    }

    render(){
        //定义状态机属性
        const { localData }= this.state;
        var unCheckedCount = localData.filter((itemObj) => !itemObj.checked).length;
        return (
        <div>
            <ViewHeader name="Andy.chen" unCheckedCount={unCheckedCount}/>
            <ViewInputBox type="text" 
                placeholder="please input text" 
                autoFocus={true} 
                onKeyDown={(e) => {
                    console.log("input keydown event ",e.keyCode);

                    //处理逻辑并改变状态机变量值
                    this.setState(_funcAddItemListener(localData,e.keyCode, e.target.value));

                    if(e.keyCode === 13){//clear the input box
                        e.target.value = "";
                    }
                    
                }}
            />
            <ViewList 
                data_arrays={localData} 
                toggleItemListener={(aid) => {
                    //改变状态机值
                    this.setState(_funcToggleItemListener(localData,aid));
                }}
                deleteItemListener={(aid) => {
                    this.setState(_funcDelItemListener(localData,aid));
                }}

                editItmeListener={(aid, new_value) => {
                    this.setState(_funcEditItemListener(localData, aid, new_value));
                }}
            />
        </div>
        )
    }
}

export default App