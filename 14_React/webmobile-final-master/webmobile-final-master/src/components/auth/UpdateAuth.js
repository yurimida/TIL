import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateAuth } from '../../store/actions/AuthActions'
import { firestoreConnect } from 'react-redux-firebase'
import { Link } from 'react-router-dom'
import Modal from '@material-ui/core/Modal';
import './LoginPage.css'
import {
  Container,
  Col,
  Row,
} from 'reactstrap';

class UpdateAuth extends Component{
constructor(props){
    super(props);
    this.state={
        photoURL:'',
        firstName:'',
        github:'',
        lastName:'',
    }
    
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
      [e.target.name] : e.target.value,
    })
  };
  handleUpdate = (e) => {
    e.preventDefault();
    this.props.updateAuth(this.state);
    this.props.history.push('/mypage'); 
  }


    render(){
        const {auth} = this.props;
        if(auth){
        return(
          <div className="" style={{backgroundColor: "#548CFF"}}>
            <div className="container">
            <form className="white" onSubmit={this.handleSubmit}>
              <h5 className="grey-text text-darken-3" style={{ marginTop: '5vw'}}>Character Change</h5>
             
              {/* <button style={{ color: "white", marginRight:"10%", marginTop:"2.5%" }}  onClick={this.handleImageOpen}>
        Character Change
      </button>
              <Modal 
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.state.imageOpen}
        onClose={this.handleClose}
      >  */}
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
            {/* <button onClick={this.handleClose}>Submit</button> */}
          </Container>
          {/* </Modal>   */}
          
              {/* <img src={auth.photoURL}></img> */}

              <div className="input-field">
                <button className="btn pink lighten-1" onClick={this.handleUpdate}>Update</button>
              </div>
            </form>
          </div>
          </div>
        )}
    }
}

const mapStateToProps = state => {
    return {
      auth: state.firebase.profile,
    };
  };
  const mapDispatchToProps = dispatch => {
    return {
      updateAuth: authdetail => dispatch(updateAuth(authdetail))
    };
  };

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(UpdateAuth);