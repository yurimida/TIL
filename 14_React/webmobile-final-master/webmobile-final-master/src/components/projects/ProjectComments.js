import React, { Component } from 'react'
import moment from 'moment'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { projectDeleteComment, projectUpdateComment } from '../../store/actions/commentActions'
class ProjectComments extends Component {
  state = {
    content: '',
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  editbutton(key) {
    if (document.getElementById(key).style.display == "block") {
      document.getElementById(key).style.display = "none";
    } else {
      document.getElementById(key).style.display = "block";
    }
  }
  render() {
    const { comments, projectDeleteComment, projectUpdateComment, projectId, auth } = this.props;
    return (
      <div>
        {comments && Object.keys(comments).map(key => {
          const comId = "commentEdit" + key;
          return (
            <div>
              <div class="module-comment-block">
                <div style={{ display: "flex", justifyContent: "start" }}>
                  {comments[key] ?
                    <div class="module-comment-avatar">
                      <img src={comments[key].photoURL} alt="My Name" width="50"></img>
                    </div> : null}

                  <div class="module-comment-text">
                    <div><strong>{comments[key].authorFirstName}{comments[key].authorLastName}</strong></div>
                    <div><em>{moment(comments[key].createdAt.toDate()).calendar()}</em></div>
                  </div>
                  {comments[key].authorId === auth.uid ?
                    <div className="btnset">
                      <button onClick={this.editbutton.bind(this, comId)} style={{ background: "transparent", border: "transparent", boxShadow: "none" }}><i className="small material-icons">edit</i></button>
                      <button onClick={projectDeleteComment.bind(this, key, projectId)} style={{ background: "transparent", border: "transparent", boxShadow: "none" }}><i className="small material-icons">delete</i></button>
                    </div> : null}
                </div>
                <div style={{ marginLeft: "60px" }}>
                  <p style={{ textAlign: "left" }}>{comments[key].content}</p>
                </div>
              </div>
              <form className="editContainer" style={{ marginTop: "0px", paddingTop: "0px" }} onSubmit={this.handleSubmit}>
                <div class="row" id={comId} style={{ display: "none" }}>
                  <div class="col s12">
                    <div class="row">
                      <div class="input-field col s12">
                        <i class="material-icons prefix"></i>
                        <input onChange={this.handleChange} style={{ zIndex: "8", position: "sticky" }} type="text" id="content" class="autocomplete"></input>
                        <label for="autocomplete-input" className="active" style={{ zIndex: "5" }}>Autocomplete</label>
                      </div>
                      <button className="btn pink lighten-1" onClick={projectUpdateComment.bind(this, this.state, key, projectId)}>Edit</button>
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
    projectDeleteComment: (commentId, projectId) => dispatch(projectDeleteComment(commentId, projectId)),
    projectUpdateComment: (comment, commentId, projectId) => dispatch(projectUpdateComment(comment, commentId, projectId))
  };
};

const mapStateToProps = (state, ownProps) => {
  const comments = ownProps
  const projectId = ownProps.id
  return {
    auth: state.firebase.auth,
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(ProjectComments)

