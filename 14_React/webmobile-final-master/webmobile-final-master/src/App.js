import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import MyPage from './components/mypage/MyPage'
import UpdateAuth from './components/auth/UpdateAuth'

import PostDetails from './components/posts/PostDetails'
import PostListPage from './components/posts/PostListPage'
import CreatePost from './components/posts/CreatePost'
import UpdatePost from './components/posts/UpdatePost'

import UpdateProject from './components/projects/UpdateProject'
import CreateProject from './components/projects/CreateProject'
import ProjectListPage from './components/projects/ProjectListPage'
import ProjectDetails from './components/projects/ProjectDetails'

import Main from './components/main/Main'
import Admin from './components/admin/admin'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

import fbConfig from './config/fbConfig';

var agent = navigator.userAgent.toLowerCase();
if (agent.indexOf('edge') !== -1) {
  alert('해당 사이트는 크롬에 최적화 되어 있습니다.');
} else if (agent.indexOf('opr') !== -1) {
  alert('해당 사이트는 크롬에 최적화 되어 있습니다.');
} else if (agent.indexOf('firefox') !== -1) {
  alert('해당 사이트는 크롬에 최적화 되어 있습니다.');
}
class App extends Component {
  constructor(props){
    super(props)
    this.state={
      text :'',
    }
  }
  googleTranslateElementInit() {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: 'en',
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
      },
      'google_translate_element'
    );
  }
  componentDidMount() {
    const messaging = fbConfig.messaging();
    messaging.usePublicVapidKey("BI1wOhkCaUnqui8X3sVgte_2z9IJd5xyUBURu0zFMcHsyWPzP1VAci6lMzNsCuss-WhHE545vMvoGnJ9xjUdLZc");
    messaging.requestPermission()
      .then(function() {
        console.log('허가!');
        return messaging.getToken(); //토큰을 받는 함수를 추가!
      })
      .then(function(token) {
        const firestore = fbConfig.firestore();
        firestore.collection('tokens').doc(token).set({
          token
        })
      })
      .catch(function(err) {
        console.log('fcm에러 : ', err);
      })
    var addScript = document.createElement('script');
    addScript.setAttribute(
      'src',
      '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = this.googleTranslateElementInit;
  }
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.props.changeLimit(3)
    }
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div id="google_translate_element" style={{ visibility: 'hidden' }} />
          <Switch>
            <Route exact path = '/' component={Main} />
            <Route path='/main'component={Dashboard} />
            <Route path='/admin' component={Admin}/>>
            <Route path='/project/:id' component={ProjectDetails} />
            <Route path='/post/:id' component={PostDetails} />
            <Route path='/createProject' component={CreateProject} />
            <Route path='/createPost' component={CreatePost} />
            <Route path='/updatePost/:id' component={UpdatePost} />
            <Route path='/updateProject/:id' component={UpdateProject} />
            <Route path='/postList' component={PostListPage}/>
            <Route path='/projectList' component={ProjectListPage}/>
            <Route path='/mypage' component={MyPage}/>
            <Route path='/updateAuth' component={UpdateAuth}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.firestore.ordered.posts,
    projects: state.firestore.ordered.projects,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications,
    cpstate : state,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    // changeLimit: (limit) => dispatch(changeLimit(limit))
  }
}
export default compose(
  connect(mapStateToProps,mapDispatchToProps),
  firestoreConnect([
    { collection: 'posts', orderBy: ['createdAt', 'desc'] },
    { collection: 'projects', orderBy: ['createdAt', 'desc'] },
    { collection: 'notifications', limit: 3, orderBy: ['time', 'desc'] }
  ])
)(App)
