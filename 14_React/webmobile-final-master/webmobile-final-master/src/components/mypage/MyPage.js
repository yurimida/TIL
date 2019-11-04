import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect, Link } from 'react-router-dom'
import {ChatBot} from '../chatbot/ChatBot'
import './Mypage.css'
import {
  Container,
} from 'reactstrap';
class MyPage extends Component{
    render(){
        const { auth,posts} = this.props;
        console.log(auth)
        if (auth.isEmpty) return <Redirect to='/' />;
        return(
      
      <Container className="well card mypage">
        <div>
          <img src={auth.profile.photoURL} alt="mario" id="img-mario" className="img-circle image-profile"/>
          <div className="nes-balloon from-left">
            <p>Hello {auth.profile.firstName} <i className="nes-icon is-small heart"></i></p>
          </div>
        </div>
        <div>
          <div className="admin-list section centered">
            <table className="centered highlight mypagetable">
              <thead>
                <tr>
                  <th>{auth.profile.firstName}  {auth.profile.lastName}</th>
                </tr>
              </thead>
                    <tbody>
                      <tr>{auth.profile.email}</tr>
                    </tbody>
            </table>
          </div>
          <div>
            <Link to='/updateAuth'>
            <button type="button" class="nes-btn is-success" style={{ marginBottom: '1vw'}}>Character Change</button>
            </Link>
          </div>
          <ChatBot/>
          {/* <Gitgraph auth={auth}/>  */}
        </div>
      </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      posts: state.firestore.ordered.posts,
      auth: state.firebase,
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
      // ChangeImage: (creds, auth) => dispatch(ChangeImage(creds,auth)),
    };
  };

  export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      {collection: 'posts', orderBy: ['createdAt', 'desc']},
    ])
  )(MyPage)

