import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import moment from 'moment'
import { deletePost } from '../../store/actions/PostActions'
import { Link } from 'react-router-dom'
import PostComments from './PostComments'
import { createComment } from '../../store/actions/commentActions'
import './post.css'

class PostDetails extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    content: '',
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createComment(this.state, this.props.id);
  }
  render() {
    const { post, deletePost, id, user, auth } = this.props;
    let deleteUpdate;
    if(user && (user.firstName === post.authorFirstName ) &&  (user.lastName === post.authorLastName)){
      deleteUpdate = (
        <span>
          <span>
            <Link to={'/updatePost/' + id}>
              <button className="nes-btn is-warning">Update</button>
            </Link>
          </span>
          <span>
            <Link to={'/postList/'}>
              <button className="nes-btn is-error" onClick={deletePost.bind(this, id)}>Delete</button>
            </Link>
          </span>
        </span>
      );
    }
    if (post) {
      return (
        <div className="" style={{backgroundColor: "#548CFF"}}>
        <div className="container section project-details">
        <div className="card z-depth-0" style={{ border: '10px black double', borderRadius: '10px' }}>
          <div className="card-content">
            <span className="card-title">{post.title}</span>
            <p>{post.content}</p>
          </div>
  
          <div className="card-action grey lighten-4 grey-text">
            <div>
              Projected by {post.authorFirstName} {post.authorLastName}
            </div>
            <div>{moment(post.createdAt.toDate()).calendar()}</div>
            {deleteUpdate}
         </div>
         { auth.isEmpty ? <p>로그인을 해주세요</p>:  <div className="comment">
          <form className="commentSubmit" onSubmit={ this.handleSubmit}>
            <div className="input-field">
              <textarea id="content" className="materialize-textarea" onChange={this.handleChange}></textarea>
              <label htmlFor="content" className="active">Comment</label>
            </div>
            <div className="input-field">
              <button className="btn pink lighten-1">Add</button>
            </div>
          </form>
          <div>
          <PostComments comments={post.comments} postId = {id}/>
          </div>
          </div>}
        </div>
      </div>
      </div>
      );
    } else {
      return (
        <div className="container center">
          <p>Loading post...</p>
        </div>
      );
    }
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    deletePost: (postId) => dispatch(deletePost(postId)),
    createComment: (comment, postId) => dispatch(createComment(comment, postId))
  };
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const posts = state.firestore.data.posts;
  const post = posts ? posts[id] : null;
  const uid = state.firebase.auth.uid;
  const users = state.firestore.data.users;
  const user = users ? users[uid] : null;
  return {
    id: id,
    post: post,
    auth: state.firebase.auth,
    user: user,
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => [
    { collection: 'posts', doc: props.match.params.id },
    { collection: 'posts', doc: props.match.params.id, subcollections: [{ collection: 'comments' }] },
  ])
)(PostDetails)

