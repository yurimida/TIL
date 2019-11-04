import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createPost } from '../../store/actions/PostActions'
import { Redirect , Link } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import './post.css'
class CreatePost extends Component {
  state = {
    title: '',
    content: '',
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    this.props.createPost(this.state);
  }
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/signin' />
    return (
      <div className="container postcreate">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3 ">Create a New Post</h5>
          <div className="input-field">
            <input type="text" id="title" onChange={this.handleChange} />
            <label htmlFor="title" className="active">Post Title</label>
          </div>
          <div className="input-field">
            <textarea
              id="content"
              className="materialize-textarea"
              onChange={this.handleChange}></textarea>
            <label htmlFor="content" className="active">Post Content</label>
          </div>
          <Link to={'/postList/'}>
            <div className="input-field">
            <button className="nes-btn is-success" onClick={this.handleSubmit}>Create</button>
            </div>
          </Link>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}
const mapDispatchToProps = dispatch => {
  return {
    createPost: (post) => dispatch(createPost(post))
  }
}
export default compose(
  connect(mapStateToProps,mapDispatchToProps),
  firestoreConnect()
)(CreatePost)
