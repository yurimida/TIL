import React, { Component } from 'react'
import PostList from './PostList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Link } from 'react-router-dom'
import { limitInit } from '../../store/actions/PostActions'
class PostListPage extends Component{
  state = {
    keyword:''
  };
  handleValueChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
    }

    render(){
        const { auth,posts} = this.props;
        return(
            <div className="" style={{backgroundColor: "#548CFF"}}>
            {!auth.isEmpty ? <Link to="/createPost">
            <button type="button" class="nes-btn is-warning postbutton ">NewPost</button>
            </Link>: null}
                <PostList posts={posts}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      posts: state.firestore.ordered.posts,
      auth: state.firebase.auth,
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
    }
  }
  export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([
      { collection: 'posts', orderBy: ['createdAt', 'desc'] },
    ])
  )(PostListPage)
