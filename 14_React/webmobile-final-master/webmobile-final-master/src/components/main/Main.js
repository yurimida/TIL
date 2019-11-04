import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Main.css'
import {RemoveScroll} from 'react-remove-scroll';

class Main extends Component {
    render() {
        var con = document.getElementsByClassName("makeStyles-grow-1")[0];
        if(con){
            con.style.display = 'none';
        }
        return (
            <RemoveScroll>
            <div className="sad2">
                <div className="sky2" style={{width:"100% !important"}}>
                    <div className="scorebar2">
                        <p><span className="topline-mario2">MARIO</span>
                            <span className="topline-world2">WORLD</span>
                            <span className="topline-time2">TIME</span>
                            <span className="bottomline-score2">OOOOOO</span>
                            <span className="bottomline-coin2"><img src="https://raw.githubusercontent.com/LantareCode/random-this-and-thats/master/CSS/SuperMario-Animation/images/Coin.gif" alt="" height="40px" /> x OO</span>
                            <span className="bottomline-world2">1 - 1</span>
                            <span className="bottomline-time2">111</span>
                            <Link to="/main" style={{ textDecoration: "none", color: "white" }}>
                                <span className="tri blinking">▶</span>
                                <span className="start blinking" >START</span>
                            </Link>
                        </p>
                    </div>
                    <img className="cloud2" src="https://raw.githubusercontent.com/LantareCode/random-this-and-thats/master/CSS/SuperMario-Animation/images/CloudSingle.gif" alt="" />
                    <img className="cloud2" src="https://raw.githubusercontent.com/LantareCode/random-this-and-thats/master/CSS/SuperMario-Animation/images/CloudDouble.gif" alt="" />
                    <img className="cloud2" src="https://raw.githubusercontent.com/LantareCode/random-this-and-thats/master/CSS/SuperMario-Animation/images/CloudTriple.gif"  alt=""/>
                </div>
                <div className="ground2">
                    <div className="skyblocks2">
                        <img className="brick2" src="https://raw.githubusercontent.com/LantareCode/random-this-and-thats/master/CSS/SuperMario-Animation/images/Bricks.gif" alt="" height="70px;" />
                        <img className="brick2" src="https://raw.githubusercontent.com/LantareCode/random-this-and-thats/master/CSS/SuperMario-Animation/images/QuestionBlock.gif" alt="" height="70px;" />
                        <img className="brick2" src="https://raw.githubusercontent.com/LantareCode/random-this-and-thats/master/CSS/SuperMario-Animation/images/Bricks.gif" alt="" height="70px;" />
                        <img className="brick2" src="https://raw.githubusercontent.com/LantareCode/random-this-and-thats/master/CSS/SuperMario-Animation/images/Bricks.gif" alt="" height="70px;" />
                    </div>
                    <img className="bush2" src="https://raw.githubusercontent.com/LantareCode/random-this-and-thats/master/CSS/SuperMario-Animation/images/BushSingle.gif" alt="" height="70px;" />
                    <img className="bush2" src="https://raw.githubusercontent.com/LantareCode/random-this-and-thats/master/CSS/SuperMario-Animation/images/BushDouble.gif" alt="" height="70px;" />
                    <img className="bush2" src="https://raw.githubusercontent.com/LantareCode/random-this-and-thats/master/CSS/SuperMario-Animation/images/BushSingle.gif" alt="" height="70px;" />
                    <div className="mario2"></div>
                </div>
            </div>
            </RemoveScroll>
        )
    }
}

export default Main