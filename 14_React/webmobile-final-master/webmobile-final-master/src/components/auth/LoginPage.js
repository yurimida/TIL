import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { signIn , signOut , signUp , facebookLogin } from '../../store/actions/AuthActions';
import Modal from '@material-ui/core/Modal';
import './LoginPage.css'
import {
  Container,
  Col,
  Row,
} from 'reactstrap';
class LoginPage extends Component {
  state = {
    open : false,
    SignInOpen : false,
    SignUpOpen : false,
    email: '',
    password: '',
    facebookClicked: false,
    firstName: '',
    lastName: '',
    photoURL: '',
    github:'',
  };
 
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
      [e.target.name] : e.target.value,
    })
  };
  handleSignInOpen = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      SignInOpen : true,
      SignUpOpen : false,
    })
  };
  handleSignUpOpen = () => {
    this.setState({
      SignInOpen : false,
      SignUpOpen : true,
    })
  };
  handleClose = () => {
    this.setState({
      SignInOpen : false,
      SignUpOpen : false,
      
    })  
  };
  handleSignFacebookLogin = (e) => {
    e.preventDefault();
    this.props.facebookLogin(this.state);
  }
  handleSignIn = (e) => {
    e.preventDefault();
    this.props.signIn(this.state);
  }
  handleSignUp = (e) => {
    e.preventDefault();
    this.props.signUp(this.state);
  }
  render() {
    const { authError, auth , signIn , signOut , signUp , facebookLogin } = this.props;
    return (
    <div>
      <a href="" style={{ color: "white", marginRight:"10%", marginTop:"2.5%" }}  onClick={this.handleSignInOpen}>
        LogIn
      </a>
      <Modal 
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.state.SignInOpen}
        onClose={this.handleClose}
      >
      <div className="container" style={{top:"100px"}}>
        <form className="white">
          <div>
            <span style={{color:"#ec407a"}} onClick={this.handleSignInOpen}>
                Sign In &nbsp;&nbsp;
            </span>
            <span className="grey-text text-darken-3" onClick={this.handleSignUpOpen}>
                Sign Up
            </span>
            <button onClick={this.handleClose} style={{backgroundColor: "transparent", border: "0"}}><i class="nes-icon close is-small"></i></button> 
          </div>
          <div className="input-field">
            <label htmlFor="email" className="active">Email</label>
            <input type="email" id="email" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password"  className="active">Password</label>
            <input type="password" id="password" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <Link to="/main">
            <button className="btn pink lighten-1 z-depth-0" onClick={this.handleSignIn}>Login</button>
            </Link>
            <button className="btn blue lighten-1 z-depth-0" onClick={this.handleSignFacebookLogin}>
              Facebook
            </button>
            <div className="center red-text">
              {!this.facebookClicked && authError ? <p>{authError}</p> : null}
            </div>
          </div>
        </form>
      </div>
      </Modal>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.state.SignUpOpen}
        onClose={this.handleClose}
        style={{overflow:"initial",position:"absolute"}}
      >
     <div className="container" style={{top:"100px"}}>
        <form className="white">
          <div>
            <span className="grey-text text-darken-3" onClick={this.handleSignInOpen}>
                Sign In &nbsp;&nbsp;
            </span>
            <span style={{color:"#ec407a"}} onClick={this.handleSignUpOpen}>
                Sign Up
            </span>
            <button onClick={this.handleClose} style={{backgroundColor: "transparent", border: "0"}}><i class="nes-icon close is-small"></i></button>
          </div>
          <div className="input-field">
            <label htmlFor="email" className="active">Email</label>
            <input type="email" id="email" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password" className="active">Password</label>
            <input type="password" id="password" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="firstName" className="active">First Name</label>
            <input type="text" id="firstName" onChange={this.handleChange} />
          </div>  
          <div className="input-field">
            <label htmlFor="lastName"  className="active">Last Name</label>
            <input type="text" id="lastName" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="github"  className="active">Github</label>
            <input type="text" id="github" onChange={this.handleChange}/>
          </div>
          <Container style={{width:"100%"}}>
          <Row className="photoURL">
                <Col style={{display:"inline-block"}} xs ="12" sm="6" md="3" lg="3" xl="3"><input type="radio" value="http://mariopartylegacy.com/wp-content/uploads/2011/08/marioprofile.png" name='photoURL'  onClick={this.handleChange} id="myCheckbox1"/>
                <label className="imagelabel" htmlFor="myCheckbox1">
                  <img src="http://mariopartylegacy.com/wp-content/uploads/2011/08/marioprofile.png"/> 
                </label>
                </Col><Col style={{display:"inline-block"}} xs ="12" sm="6" md="3" lg="3" xl="3"><input type="radio" name='photoURL'  onClick={this.handleChange} value="http://mariopartylegacy.com/wp-content/uploads/2011/08/luigiprofile.png" id="myCheckbox2" />
                <label className="imagelabel" htmlFor="myCheckbox2">
                  <img src="http://mariopartylegacy.com/wp-content/uploads/2011/08/luigiprofile.png"/>
                </label>
                </Col><Col style={{display:"inline-block"}} xs ="12" sm="6" md="3" lg="3" xl="3"><input type="radio" name='photoURL'  onClick={this.handleChange} value="http://mariopartylegacy.com/wp-content/uploads/2011/08/peachprofile.png" id="myCheckbox3" />
                <label className="imagelabel" htmlFor="myCheckbox3">
                  <img src="http://mariopartylegacy.com/wp-content/uploads/2011/08/peachprofile.png"/>
                </label>
                </Col><Col style={{display:"inline-block"}} xs ="12" sm="6" md="3" lg="3" xl="3"><input type="radio" name='photoURL'  onClick={this.handleChange} value="http://mariopartylegacy.com/wp-content/uploads/2011/08/yoshiprofile.png" id="myCheckbox4" />
                <label className="imagelabel" htmlFor="myCheckbox4">
                  <img src="http://mariopartylegacy.com/wp-content/uploads/2011/08/yoshiprofile.png"/>
                </label>
                </Col><Col style={{display:"inline-block"}} xs ="12" sm="6" md="3" lg="3" xl="3"><input type="radio" name='photoURL'  onClick={this.handleChange} value="http://mariopartylegacy.com/wp-content/uploads/2011/08/warioprofile.png" id="myCheckbox5" />
                <label className="imagelabel" htmlFor="myCheckbox5">
                  <img src="http://mariopartylegacy.com/wp-content/uploads/2011/08/warioprofile.png"/>
                </label>
                </Col><Col style={{display:"inline-block"}} xs ="12" sm="6" md="3" lg="3" xl="3"><input type="radio" name='photoURL'  onClick={this.handleChange} value="http://mariopartylegacy.com/wp-content/uploads/2011/08/daisyprofile.png" id="myCheckbox6" />
                <label className="imagelabel" htmlFor="myCheckbox6">
                  <img src="http://mariopartylegacy.com/wp-content/uploads/2011/08/daisyprofile.png"/>
                </label>
                </Col><Col style={{display:"inline-block"}} xs ="12" sm="6" md="3" lg="3" xl="3"><input type="radio" name='photoURL'  onClick={this.handleChange}  value="http://mariopartylegacy.com/wp-content/uploads/2011/08/waluigiprofile.png" id="myCheckbox7" />
                <label className="imagelabel" htmlFor="myCheckbox7">
                  <img src="http://mariopartylegacy.com/wp-content/uploads/2011/08/waluigiprofile.png"/>
                </label>
                </Col><Col style={{display:"inline-block"}} xs ="12" sm="6" md="3" lg="3" xl="3"><input type="radio" name='photoURL'  onClick={this.handleChange} value="http://mariopartylegacy.com/wp-content/uploads/2011/08/toadprofile.png" id="myCheckbox8" />
                <label className="imagelabel" htmlFor="myCheckbox8">
                  <img src="http://mariopartylegacy.com/wp-content/uploads/2011/08/toadprofile.png"/>
                </label>
                </Col><Col style={{display:"inline-block"}} xs ="12" sm="6" md="3" lg="3" xl="3"><input type="radio" name='photoURL'  onClick={this.handleChange}  value="http://mariopartylegacy.com/wp-content/uploads/2011/08/booprofile.png" id="myCheckbox9" />
                <label className="imagelabel" htmlFor="myCheckbox9">
                  <img src="http://mariopartylegacy.com/wp-content/uploads/2011/08/booprofile.png"/>
                </label>
                </Col><Col style={{display:"inline-block"}} xs ="12" sm="6" md="3" lg="3" xl="3"><input type="radio" name='photoURL'  onClick={this.handleChange} value="http://mariopartylegacy.com/wp-content/uploads/2011/08/koopakidprofile.png" id="myCheckbox10" />
                <label className="imagelabel" htmlFor="myCheckbox10">
                  <img src="http://mariopartylegacy.com/wp-content/uploads/2011/08/koopakidprofile.png"/>
                </label>
                </Col><Col style={{display:"inline-block"}} xs ="12" sm="6" md="3" lg="3" xl="3"><input type="radio" name='photoURL'  onClick={this.handleChange} value="http://mariopartylegacy.com/wp-content/uploads/2011/08/toadetteprofile.png" id="myCheckbox11" />
                <label className="imagelabel" htmlFor="myCheckbox11">
                  <img src="http://mariopartylegacy.com/wp-content/uploads/2011/08/toadetteprofile.png"/>
                </label>
                </Col><Col style={{display:"inline-block"}} xs ="12" sm="6" md="3" lg="3" xl="3"><input type="radio" name='photoURL'  onClick={this.handleChange} value="http://mariopartylegacy.com/wp-content/uploads/2011/08/birdoprofile.png" id="myCheckbox12" />
                <label className="imagelabel" htmlFor="myCheckbox12">
                  <img src="http://mariopartylegacy.com/wp-content/uploads/2011/08/birdoprofile.png"/>
                </label>
                </Col><Col style={{display:"inline-block"}} xs ="12" sm="6" md="3" lg="3" xl="3"><input type="radio" name='photoURL'  onClick={this.handleChange}  value="http://mariopartylegacy.com/wp-content/uploads/2011/08/drybonesprofile.png" id="myCheckbox13" />
                <label className="imagelabel" htmlFor="myCheckbox13">
                  <img src="http://mariopartylegacy.com/wp-content/uploads/2011/08/drybonesprofile.png"/>
                </label>
                </Col><Col style={{display:"inline-block"}} xs ="12" sm="6" md="3" lg="3" xl="3"><input type="radio" name='photoURL'  onClick={this.handleChange}  value="http://mariopartylegacy.com/wp-content/uploads/2011/08/blooperprofile.png" id="myCheckbox14" />
                <label className="imagelabel" htmlFor="myCheckbox14">
                  <img src="http://mariopartylegacy.com/wp-content/uploads/2011/08/blooperprofile.png"/>
                </label>
                </Col><Col style={{display:"inline-block"}} xs ="12" sm="6" md="3" lg="3" xl="3"><input type="radio" name='photoURL'  onClick={this.handleChange}  value="http://mariopartylegacy.com/wp-content/uploads/2011/08/hammerbroprofile.png" id="myCheckbox15" />
                <label className="imagelabel" htmlFor="myCheckbox15">
                  <img src="http://mariopartylegacy.com/wp-content/uploads/2011/08/hammerbroprofile.png"/>
                </label>
                </Col><Col style={{display:"inline-block"}} xs ="12" sm="6" md="3" lg="3" xl="3"><input type="radio" name='photoURL'  onClick={this.handleChange}  value="http://mariopartylegacy.com/wp-content/uploads/2011/08/koopatroopaprofile.png" id="myCheckbox16" />
                <label className="imagelabel" htmlFor="myCheckbox16">
                  <img src="http://mariopartylegacy.com/wp-content/uploads/2011/08/koopatroopaprofile.png"/>
                </label>
                </Col><Col style={{display:"inline-block"}} xs ="12" sm="6" md="3" lg="3" xl="3"><input type="radio" name='photoURL'  onClick={this.handleChange}  value="http://mariopartylegacy.com/wp-content/uploads/2011/08/shyguyprofile.png" id="myCheckbox17" />
                <label className="imagelabel" htmlFor="myCheckbox17">
                  <img src="http://mariopartylegacy.com/wp-content/uploads/2011/08/shyguyprofile.png"/>
                </label>
                </Col><Col style={{display:"inline-block"}} xs ="12" sm="6" md="3" lg="3" xl="3"><input type="radio" name='photoURL'  onClick={this.handleChange} value="http://mariopartylegacy.com/wp-content/uploads/2011/08/kamekprofile.png" id="myCheckbox18" />
                <label className="imagelabel" htmlFor="myCheckbox18">
                  <img src="http://mariopartylegacy.com/wp-content/uploads/2011/08/kamekprofile.png"/>
                </label>
                </Col><Col style={{display:"inline-block"}} xs ="12" sm="6" md="3" lg="3" xl="3"><input type="radio" name='photoURL'  onClick={this.handleChange} value="http://mariopartylegacy.com/wp-content/uploads/2011/08/bowserjrprofile.png" id="myCheckbox19" />
                <label className="imagelabel" htmlFor="myCheckbox19">
                  <img src="http://mariopartylegacy.com/wp-content/uploads/2011/08/bowserjrprofile.png"/>
                </label>
                </Col><Col style={{display:"inline-block"}} xs ="12" sm="6" md="3" lg="3" xl="3"><input type="radio" name='photoURL'  onClick={this.handleChange}  value="http://mariopartylegacy.com/wp-content/uploads/2011/08/rosalinaprofile.png" id="myCheckbox20" />
                <label className="imagelabel" htmlFor="myCheckbox20">
                  <img src="http://mariopartylegacy.com/wp-content/uploads/2011/08/rosalinaprofile.png"/>
                </label>
                </Col><Col style={{display:"inline-block"}} xs ="12" sm="6" md="3" lg="3" xl="3"><input type="radio" name='photoURL'  onClick={this.handleChange} value="http://mariopartylegacy.com/wp-content/uploads/2011/08/spikeprofile.png" id="myCheckbox21" />
                <label className="imagelabel" htmlFor="myCheckbox21">
                  <img src="http://mariopartylegacy.com/wp-content/uploads/2011/08/spikeprofile.png"/>
                </label>
                </Col><Col style={{display:"inline-block"}} xs ="12" sm="6" md="3" lg="3" xl="3"><input type="radio" name='photoURL'  onClick={this.handleChange}  value="http://mariopartylegacy.com/wp-content/uploads/2011/08/diddykongprofile.png" id="myCheckbox22" />
                <label className="imagelabel" htmlFor="myCheckbox22">
                  <img src="http://mariopartylegacy.com/wp-content/uploads/2011/08/diddykongprofile.png"/>
                </label>
                </Col><Col style={{display:"inline-block"}} xs ="12" sm="6" md="3" lg="3" xl="3"><input type="radio" name='photoURL'  onClick={this.handleChange} value="http://mariopartylegacy.com/wp-content/uploads/2018/07/goombaprofile.png" id="myCheckbox23" />
                <label className="imagelabel" htmlFor="myCheckbox23">
                  <img src="http://mariopartylegacy.com/wp-content/uploads/2018/07/goombaprofile.png"/>
                </label>
                </Col><Col style={{display:"inline-block"}} xs ="12" sm="6" md="3" lg="3" xl="3"><input type="radio" name='photoURL'  onClick={this.handleChange} value="http://mariopartylegacy.com/wp-content/uploads/2018/07/montymoleprofile.png" id="myCheckbox24" />
                <label className="imagelabel" htmlFor="myCheckbox24">
                  <img src="http://mariopartylegacy.com/wp-content/uploads/2018/07/montymoleprofile.png"/>
                </label>
                </Col><Col style={{display:"inline-block"}} xs ="12" sm="6" md="3" lg="3" xl="3"><input type="radio" name='photoURL'  onClick={this.handleChange}  value="http://mariopartylegacy.com/wp-content/uploads/2018/07/pompomprofile.png" id="myCheckbox25" />
                <label className="imagelabel" htmlFor="myCheckbox25">
                  <img src="http://mariopartylegacy.com/wp-content/uploads/2018/07/pompomprofile.png"/>
                </label>
                </Col><Col style={{display:"inline-block"}} xs ="12" sm="6" md="3" lg="3" xl="3"><input type="radio" name='photoURL'  onClick={this.handleChange}  value="http://mariopartylegacy.com/wp-content/uploads/2018/07/bowserprofile-275x275.png" id="myCheckbox26" />
                <label className="imagelabel" htmlFor="myCheckbox26">
                  <img src="http://mariopartylegacy.com/wp-content/uploads/2018/07/bowserprofile-275x275.png"/>
                </label>
                </Col>
            </Row>
          </Container>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0" onClick={this.handleSignUp}>Sign Up</button>
            <button className="btn blue lighten-1 z-depth-0" onClick={this.handleSignFacebookLogin}> Facebook </button>
            <div className="center red-text">
              {!this.facebookClicked && authError ? <p>{authError}</p> : null}
            </div>
          </div>
        </form>
      </div>
      </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    signIn: creds => dispatch(signIn(creds)),
    facebookLogin: creds => dispatch(facebookLogin(creds)),
    signOut : () => dispatch(signOut()),
    signUp : newUser => dispatch(signUp(newUser)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);