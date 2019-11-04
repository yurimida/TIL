import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import { deleteProject } from '../../store/actions/projectActions'
import { Link } from 'react-router-dom'
import { map } from '@firebase/util';
import  ProjectComments  from './ProjectComments'
import { projectCreateComment } from '../../store/actions/commentActions'
import firebase from "firebase"
import './project.css'
class ProjectDetails extends Component {
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
    this.props.projectCreateComment(this.state,this.props.id);
  }
  render() {
    const { project, auth, deleteProject, id, comments , user} = this.props;
    let deleteUpdate;
    if(user && (user.firstName === project.authorFirstName ) &&  (user.lastName === project.authorLastName)){
      deleteUpdate = (
        <span>
          <span>
            <Link to={'/updateProject/' + id}>
              <button className="nes-btn is-warning">Update</button>
            </Link>
          </span>
          <span>
            <Link to={'/projectList/'}>
              <button className="nes-btn is-error" onClick={deleteProject.bind(this, id)}>Delete</button>
            </Link>
          </span>
        </span>
      );
    }
    if (project) {
      return (
        <div className="" style={{backgroundColor: "#548CFF"}}>
        <div className="container section project-details">
          <div className="card z-depth-0" style={{ border: '10px black double', borderRadius: '10px' }}>
            <div className="card-content">
              <span className="card-title">{project.title}</span>
              <p>{project.content}</p>
            </div>
            <div className="card-content">
              <img className="projectimage"src={project.image} alt=""></img>
            </div>
            <div className="card-action grey lighten-4 grey-text">
              <div>
                Projected by {project.authorFirstName} {project.authorLastName}
              </div>
              <div>{moment(project.createdAt.toDate()).calendar()}</div>
              {deleteUpdate}
           </div>
            {auth.isEmpty ? <p>로그인을 해주세요</p>:<div className="comment">
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
            <ProjectComments comments={project.comments} projectId = {id}/>
            </div>
          </div>}
          </div>
        </div>
        </div>
      );
    } else {
      return (
        <div className="container center">
          <p>Loading project...</p>
        </div>
      );
    }
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    deleteProject: (projectId) => dispatch(deleteProject(projectId)),
    projectCreateComment: (comment,postId) => dispatch(projectCreateComment(comment,postId))
  };
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const projects = state.firestore.data.projects;
  const project = projects ? projects[id] : null;
  const uid = state.firebase.auth.uid;
  const users = state.firestore.data.users;
  const user = users ? users[uid] : null;
  return {
    id: id,
    project: project,
    auth: state.firebase.auth,
    user : user,
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => [
    { collection: 'projects', doc: props.match.params.id },
    { collection: 'projects', doc: props.match.params.id, subcollections: [{ collection: 'comments'}]},
  ])
)(ProjectDetails)

