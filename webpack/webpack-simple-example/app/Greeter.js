//Greeter.js

import React,{Component} from 'react';
import config from './config.json';
import styles from './Greeter.css';//导入
import img from './image/mn1.jpg';//引入一张图片
// console.log(a);
class Greeter extends Component{
    render(){
        return (
            <div>
                <div>
                    <span>here is a icon photo!</span>
                    <div style={{display:'inlineBlock',width:'200px',height:'200px',"backgroundImage":'url(./image/icon1.png)'}}></div>
                </div>
                <img src={img} style={{diaplay:'block',margin:'10px auto'}} />
                <div className={styles.root}>{/*添加类名*/}
                    {config.greetText}
                </div>
            </div>
        )
    }
};

export default Greeter;