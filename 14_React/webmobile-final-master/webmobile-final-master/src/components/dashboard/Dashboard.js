import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import './Dashboard.css'
import 'react-open-weather/lib/css/ReactWeather.css';
import Modal from '@material-ui/core/Modal';
import ReactWeather from 'react-open-weather';
import PostSummary from '../posts/PostSummary'
import ProjectSummary from '../projects/ProjectSummary'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Gitgraph from './Gitgraph'
const audio_bump = document.getElementById('audio_bump')
const audio_jump = document.getElementById('audio_jump')
audio_jump.volume = 0.5;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseX: "",
      marioY: 505,
      HelpOpen : false,
    };
  }
  
  handleHelpOpen = e => {
    this.setState({
      HelpOpen : true,
    })
  };
  handleClose = () => {
    this.setState({
      HelpOpen : false, })
  };
  handleWeather = () => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Seoul&units=metric&appid=3540c79accb11a345a5e7bb3338f85c7 `)
      .then(res => {
        this.setState({
          description: res.data.weather[0].description,
          icon: res.data.weather[0].icon,
          name: res.data.name,
          temp: res.data.main.temp,
          humidity: res.data.main.humidity,
          temp_max: res.data.main.temp_max,
          temp_min: res.data.main.temp_min,
        })
        if (document.getElementById("weather").style.display === "block") {
          document.getElementById("weather").style.display = "none";
        } else {
          document.getElementById("weather").style.display = "block";
        }
      })
  }
  handleWeatherClose = () => {
    if (document.getElementById("weather").style.display === "block") {
      document.getElementById("weather").style.display = "none";
    }
  }
  handleGitGraphOpen = () => {
    if (document.getElementById("graph").style.display === "block") {
      document.getElementById("graph").style.display = "none";
    } else {
      document.getElementById("graph").style.display = "block";
    }
  }
  handleGitGraphClose = e => {
    e.preventdefault();
    if (document.getElementById("graph").style.display === "block") {
      document.getElementById("graph").style.display = "none";
    }
  }
  btn1() {
    setTimeout(function () {
      audio_bump.play();
    }, 160);
    if (document.getElementById("btn1").style.display === "block") {
      document.getElementById("btn1").style.display = "none";
      document.getElementById("btn2").style.display = "block";
      document.getElementById("project").style.display = "block";
      document.getElementById("btn3").style.display = "block";
      document.getElementById("btn4").style.display = "none";
      document.getElementById("post").style.display = "none";
    } else if (document.getElementById("btn2").style.display === "block") {
      document.getElementById("btn2").style.display = "none";
      document.getElementById("btn1").style.display = "block";
      document.getElementById("project").style.display = "none";
    }
  }
postbtn() {
    setTimeout(function () {
      audio_bump.play();
    }, 160);
    if (document.getElementById("btn3").style.display === "block") {
      document.getElementById("btn3").style.display = "none";
      document.getElementById("btn4").style.display = "block";
      document.getElementById("post").style.display = "block";
      document.getElementById("btn1").style.display = "block";
      document.getElementById("btn2").style.display = "none";
      document.getElementById("project").style.display = "none";
    } else if (document.getElementById("btn4").style.display === "block") {
      document.getElementById("btn4").style.display = "none";
      document.getElementById("btn3").style.display = "block";
      document.getElementById("post").style.display = "none";
    }
  }
  weather() {
    if (document.getElementById("weather").style.display === "block") {
      document.getElementById("weather").style.display = "none";
    } else {
      document.getElementById("weather").style.display = "block";
    }
  }
  btn5() {
    if (document.getElementById("google_translate_element").style.visibility === "visible") {
      document.getElementById("google_translate_element").style.visibility = "hidden";
    } else {
      document.getElementById("google_translate_element").style.visibility = "visible";
    }
  }
  marioMove(e) {
    this.setState({
      mouseX: e.clientX - 33 + "px"
    });
  }
  marioJump(e) {
    setTimeout(function () {
      audio_jump.pause();
      audio_jump.currentTime = 0
    }, 380);
    if(audio_jump.paused && audio_jump.currentTime == 0){
      audio_jump.play();
    }
    if (this.state.marioY === 505) {
      const { marioY } = this.state;
      const thisclass = this;
      this.setState({
        marioY: marioY - 10
      });
      setTimeout(function () {
        thisclass.setState({
          marioY: marioY - 20
        });
      }, 20);
      setTimeout(function () {
        thisclass.setState({
          marioY: marioY - 30
        });
      }, 40);
      setTimeout(function () {
        thisclass.setState({
          marioY: marioY - 40
        });
      }, 60);
      setTimeout(function () {
        thisclass.setState({
          marioY: marioY - 50
        });
      }, 80);
      setTimeout(function () {
        thisclass.setState({
          marioY: marioY - 60
        });
      }, 100);
      setTimeout(function () {
        thisclass.setState({
          marioY: marioY - 70
        });
      }, 120);
      setTimeout(function () {
        thisclass.setState({
          marioY: marioY - 80
        });
      }, 140);
      setTimeout(function () {
        thisclass.setState({
          marioY: marioY - 90
        });
      }, 160);
      setTimeout(function () {
        thisclass.setState({
          marioY: marioY - 100
        });
      }, 170);
      setTimeout(function () {
        thisclass.setState({
          marioY: marioY - 110
        });
      }, 180);
      setTimeout(function () {
        thisclass.setState({
          marioY: marioY - 100
        });
      }, 190);
      setTimeout(function () {
        thisclass.setState({
          marioY: marioY - 90
        });
      }, 200);
      setTimeout(function () {
        thisclass.setState({
          marioY: marioY - 80
        });
      }, 220);
      setTimeout(function () {
        thisclass.setState({
          marioY: marioY - 70
        });
      }, 240);
      setTimeout(function () {
        thisclass.setState({
          marioY: marioY - 60
        });
      }, 260);
      setTimeout(function () {
        thisclass.setState({
          marioY: marioY - 50
        });
      }, 280);
      setTimeout(function () {
        thisclass.setState({
          marioY: marioY - 40
        });
      }, 300);
      setTimeout(function () {
        thisclass.setState({
          marioY: marioY - 30
        });
      }, 320);
      setTimeout(function () {
        thisclass.setState({
          marioY: marioY - 20
        });
      }, 340);
      setTimeout(function () {
        thisclass.setState({
          marioY: marioY - 10
        });
      }, 360);
      setTimeout(function () {
        thisclass.setState({ marioY: marioY });
      }, 380);
    }
  }
  render() {
    const {projects, auth, notifications, posts} = this.props;
    console.log(auth.isEmpty)
    var con = document.getElementsByClassName("makeStyles-grow-1")[0];
    if (con) {
      con.style.display = 'block';
    }
    if (posts && projects) {
      const postRemain = 6 - posts.length;
      console.log(posts.length);
      let arr;
      arr = posts.map((post, index) => {
        const asd = "postbox" + index
        return (<div key={asd} id={asd} className="box"><Link to={'/post/' + post.id
        } key={post.id} style={{ textDecoration: 'none' }} >
          <PostSummary post={post} />
        </Link></div>)
      })
      const postTemp = 6 - postRemain;
      if (document.getElementById("postBA") != null && document.getElementById("postbox" + postTemp) === null) {
        for (var i = 6 - postRemain; i < 6; i++) {
          const asd2 = "postbox" + i
          var asdd2 = document.createElement('div');
          asdd2.id = asd2;
          asdd2.className = "box";
          var img2 = document.createElement('img');
          img2.src = "https://i.imgur.com/GTVCgiq.jpg";
          img2.style.width = "300px";
          img2.style.height = "300px";
          asdd2.appendChild(img2);
          document.getElementById("postBA").appendChild(asdd2)
        }
      }
      const projectRemain = 6 - projects.length;
      let brr;
      brr = projects.map((project, index) => {
        const asd = "projectbox" + index
        return (<div key={asd} id={asd} className="box"><Link to={'/project/' + project.id
        } key={project.id} style={{ textDecoration: 'none' }}>
          <ProjectSummary project={project} />
        </Link></div>)
      })
      const projectTemp = 6 - projectRemain;
      if (document.getElementById("projectBA") != null && document.getElementById("projectbox" + projectTemp) == null) {
        for (var i = 6 - projectRemain; i < 6; i++) {
          const asd2 = "projectbox" + i
          var asdd2 = document.createElement('div');
          asdd2.id = asd2;
          asdd2.className = "box";
          var img2 = document.createElement('img');
          img2.src = "https://i.imgur.com/GTVCgiq.jpg";
          img2.style.width = "300px";
          img2.style.height = "300px";
          asdd2.appendChild(img2);
          document.getElementById("projectBA").appendChild(asdd2)
        }
      }
      return (
        <div onMouseMove={this.marioMove.bind(this)} onMouseDown={this.marioJump.bind(this)} className="dashboard container" style={{
          height: "100%",
          width: "100%",
          maxWidth: "unset",
         overflow:"hidden"
          }}>
      <div>
        <button id="btn3" onClick={this.postbtn} style={{display:"block"}}>
          <img className="brick" src="https://raw.githubusercontent.com/LantareCode/random-this-and-thats/master/CSS/SuperMario-Animation/images/QuestionBlock.gif" alt="" height="70px;"/>
        </button>
        <button id="btn4" onClick={this.postbtn}>
          <img className="brick" src="http://www.videogamesprites.net/SuperMarioBros1/Items/Empty%20Block.gif" alt="" height="70px;"/>
        </button>
        <button id="btn1" onClick={this.btn1} style={{display:"block"}}>
          <img className="brick" src="https://raw.githubusercontent.com/LantareCode/random-this-and-thats/master/CSS/SuperMario-Animation/images/QuestionBlock.gif" alt="" height="70px;"/>
        </button>
        <button id="btn2" onClick={this.btn1}>
          <img className="brick" src="http://www.videogamesprites.net/SuperMarioBros1/Items/Empty%20Block.gif" alt="" height="70px;"/>
        </button>
      </div>
      <div className="cloudset">
        <img className="cloudsingle" src="https://raw.githubusercontent.com/LantareCode/random-this-and-thats/master/CSS/SuperMario-Animation/images/CloudSingle.gif" alt=""/>
        <button id="btn5" onClick={this.btn5} style={{
            position: "absolute",
            left: "65vw",
            top: "55px",
            display: "block",
            border: "0px",
            padding: "0px"
          }}>
            <img className="cloud" src="https://raw.githubusercontent.com/LantareCode/random-this-and-thats/master/CSS/SuperMario-Animation/images/CloudDouble.gif" alt="" />
          </button>
          <img className="cloud" style={{
            zIndex: -30
          }} src="https://raw.githubusercontent.com/LantareCode/random-this-and-thats/master/CSS/SuperMario-Animation/images/CloudTriple.gif" alt="" />
          <img className="cloud" style={{
            zIndex: -30
          }} src="https://raw.githubusercontent.com/LantareCode/random-this-and-thats/master/CSS/SuperMario-Animation/images/CloudTriple.gif" alt=""/>
      </div>
      <div>
        <img style={{
            position: "absolute",
            width: "100%",
            height: "13%",
            left: 0,
            top: "578px",
            zIndex:-1,
          }} src="https://i.imgur.com/6fLNbqc.png" alt=""/>
        <img style={{
            position: "absolute",
            left: 0,
            zIndex: -100,
            height: "650px",
            width: "100%"
          }} src="https://i.imgur.com/PrcmS70.png" alt=""/>
      </div>
      <div className="mario" style={{
          left: this.state.mouseX,
          top: this.state.marioY
        }}></div>
        <button onClick={this.handleHelpOpen} style={{padding:"0px" , border:"0px"}}>
          <p className="nes-balloon from-right nes-pointer helpText" style={{zIndex:"1"}}>
            Help
        </p>
         <img className="princess" src="http://www.videogamesprites.net/SuperMarioBros1/Characters/Other/Princess%20Toadstool.gif"  alt=""/>
       </button>
       <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.state.HelpOpen}
        onClose={this.handleClose}
        style={{overflow:"initial",position:"absolute"}}
      >
        <div className="container" style={{top:"100px"}}>
        <form className="white">
          <div class="lists">
            <ul class="nes-list is-disc">
              <button onClick={this.handleClose} style={{backgroundColor: "transparent", border: "0" , float:"right"}}><i class="nes-icon close is-small"></i></button>
              <p>Good morning.</p>
              <p>If you click sun, you can see weather.</p>
              <p>If you click cloud, you can see translate button.</p>
              <p>If you click flower, you can see gitgraph.</p>
              <p>Good Bye.</p>
            </ul>
          </div>
        </form>
      </div>
      </Modal>
       <img className="largehill" src="http://www.videogamesprites.net/SuperMarioBros1/Scenery/Hill%20-%20Large.gif" alt=""/>
       <img className="smallhill" src="http://www.videogamesprites.net/SuperMarioBros1/Scenery/Hill%20-%20Small.gif" alt=""/>
       <img className="sun" style={{ zIndex: "9999" }} src="https://isaactv.files.wordpress.com/2013/04/angrysun-large1.gif" onClick={this.handleWeather} alt="" />
          <div id="weather" style={{
            display: "none",
            marginTop: "10px",
            marginLeft: '1000px',
          }}>
            <section class="message -right sunMessage">
              <div class="nes-balloon from-right">
                <ul className="nes-list is-disc">
                  <button onClick={this.handleWeatherClose} style={{ backgroundColor: "transparent", border: "0", margin: '0', float: "right" }}><i className="nes-icon close is-small"></i></button>
                  <p>Location : {this.state.name}.</p>
                  {/* <p>today sky is {this.state.description}</p> */}
                  <p>Temp : {this.state.temp}</p>
                  <p>The high will be {this.state.temp_max} and The low will be {this.state.temp_min} </p>
                  <p>Humidity: {this.state.humidity}</p>
                </ul>
              </div>
            </section>
          </div>

          <img className="giantmushroom" style={{ zIndex: "9999" }}src="http://www.videogamesprites.net/SuperMarioBros1/Items/Fire%20Flower.gif" onClick={this.handleGitGraphOpen} alt="" />
        <div id="graph" style={{
            display: "none",
            marginTop: "10px",
            marginLeft: '1000px',
          }}>

      <div className="graphcon" style={{top:"100px"}}>
        <form className="white">
          <div class="lists">
            <ul class="nes-list is-disc">
              <button onClick={this.handleGitGraphClose} style={{backgroundColor: "transparent", border: "0" , float: "right"}}><i class="nes-icon close is-small"></i></button>
              <p><Gitgraph/></p>
            </ul>
          </div>
        </form>
      </div>
      </div>
        <div className="row" style={{
          marginLeft: "20%",
          marginRight: "30%"
        }}>
          <img className="largehill" src="http://www.videogamesprites.net/SuperMarioBros1/Scenery/Hill%20-%20Large.gif" alt=""/>
          <img className="smallhill" src="http://www.videogamesprites.net/SuperMarioBros1/Scenery/Hill%20-%20Small.gif" alt=""/>
          <div className="row" style={{
            marginLeft: "20%",
            marginRight: "30%"
          }}>
            <div id="project" style={{
              display: "none"
            }} className="col s12 m6">
              <div id="wrapper">
                <div className="box-area" id="projectBA" style={{ left: "-300px" }}>
                  {brr}
                </div>
              </div>
            </div>
            <div id="post" style={{
              display: "none"
            }} className="col s12 m6">
              <div id="wrapper">
                <div className="box-area" id="postBA" style={{ left: "-300px" }}>
                  {arr}
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        )
    } else {
      return (
        <div className="container center">
          <p>Loading post...</p>
        </div>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {
    posts: state.firestore.ordered.posts,
    projects: state.firestore.ordered.projects,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications,
    cpstate: state,
  }
}
export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'posts', orderBy: ['createdAt', 'desc'], limit: 6 },
    { collection: 'projects', orderBy: ['createdAt', 'desc'], limit: 6 },
    { collection: 'notifications', limit: 3, orderBy: ['time', 'desc'] }
  ])
)(Dashboard)