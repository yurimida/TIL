import React, { Component } from 'react'
import moment from 'moment'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { deleteComment, updateComment } from '../../store/actions/commentActions'
import './post.css'
class PostComments extends Component {
  state = {
    content: '',
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  editbutton(key) {
    if (document.getElementById(key).style.display === "block") {
      document.getElementById(key).style.display = "none";
    } else {
      document.getElementById(key).style.display = "block";
    }
  }
  render() {
    const { comments, deleteComment, postId, updateComment, auth } = this.props;

    return (
      <div>
        {comments && Object.keys(comments).map(key => {
          const comId = "commentEdit" + key;
          return (
            <div key={key}>
              <div className="module-comment-block">
                <div style={{ display: "flex", justifyContent: "start" }}>
                  {comments[key]? <div className="module-comment-avatar">
                    <img src={comments[key].photoURL} alt="My Name" width="50"></img>
                  </div>:null}
                  <div className="module-comment-text">
                    <div><strong>{comments[key].authorFirstName}{comments[key].authorLastName}</strong></div>
                    <div><em>{moment(comments[key].createdAt.toDate()).calendar()}</em></div>
                  </div>
                  {comments[key].authorId === auth.uid ?   
                  <div className="btnset">
                    <button onClick={this.editbutton.bind(this, comId)} style={{ background: "transparent", border: "transparent", boxShadow: "none" }}><i className="small material-icons">edit</i></button>
                    <button onClick={deleteComment.bind(this, key, postId)} style={{ background: "transparent", border: "transparent", boxShadow: "none" }}><i className="small material-icons">delete</i></button>
                  </div> : null}
                </div>
                <div style={{ marginLeft: "60px" }}>
                  <p style={{ textAlign: "left" }}>{comments[key].content}</p>
                </div>
              </div>
              <form className="editContainer" style={{ marginTop: "0px", paddingTop: "0px" }} onSubmit={this.handleSubmit}>
                <div className="row" id={comId} style={{ display: "none" }}>
                  <div className="col s12">
                    <div className="row">
                      <div className="input-field col s12">
                        <i className="material-icons prefix">textsms</i>
                        <input onChange={this.handleChange} style={{ zIndex: "8", position: "sticky" }} type="text" id="content" className="autocomplete"></input>
                        <label htmlFor="autocomplete-input" className="active" style={{ zIndex: "5" }}>Autocomplete</label>
                      </div>
                      <button className="btn pink lighten-1" onClick={updateComment.bind(this, this.state, key, postId)}>Edit</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )
        })}
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    deleteComment: (commentId, postId) => dispatch(deleteComment(commentId, postId)),
    updateComment: (comment, commentId, postId) => dispatch(updateComment(comment, commentId, postId))
  };
};

const mapStateToProps = (state, ownProps) => {
  const comments = ownProps
  const postId = ownProps.id
  return {
    auth: state.firebase.auth,
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(PostComments)

