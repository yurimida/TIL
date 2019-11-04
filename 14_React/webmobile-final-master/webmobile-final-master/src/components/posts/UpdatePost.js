import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updatePost } from '../../store/actions/PostActions'
import { Redirect } from 'react-router-dom'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import {Link} from 'react-router-dom'

class UpdatePost extends Component {
  constructor(props){
    super(props);
    this.state={
      title:'',
      content:''
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  render() {
    const { post, auth, updatePost, id } = this.props;
    // if (!auth.uid) return <Redirect to='/signin' /> 
 
    if(post){
      if(this.state.title == '' && this.state.content == '')
      {
        this.setState({title:post.title,content:post.content})
      }
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Update Post</h5>
          <div className="input-field">
            <input type="text" id='title'  onChange={this.handleChange} value={this.state.title}/>
            <label htmlFor="title" className="active">Post Title</label>
          </div>
          <div className="input-field">
            <textarea id="content" className="materialize-textarea" onChange={this.handleChange} value={this.state.content}>
            </textarea>
            <label htmlFor="content" className="active">Post Content</label>
          </div>
          <Link to={'/postList'}>
          <div className="input-field">
            <button className="btn pink lighten-1" onClick={ updatePost.bind(this,this.state,id) }>Update</button>
          </div>
          </Link>
        </form>
      </div>
    )
  }else {
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
    updatePost: (post,id) => dispatch(updatePost(post,id))
  }
}
const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const posts = state.firestore.data.posts;
  const post = posts ? posts[id] : null;
  return {
    id: id,
    post: post,
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(UpdatePost);
