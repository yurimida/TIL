import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateProject } from '../../store/actions/projectActions'
import { Redirect } from 'react-router-dom'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import {Link} from 'react-router-dom'
import axios from 'axios'
class UpdateProject extends Component {
  constructor(props){
    super(props);
    this.state={
      title:'',
      content:'',
      image:'',
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  uploadImage() {
    const formData = new FormData()
    const file = document.getElementsByClassName('input-image')[0].files[0]
    if (file == null) {
      alert("이미지를 선택해 주세요.")
    }
    else {
      formData.append("image", file)
      axios({
        method: "POST",
        url: "https://api.imgur.com/3/image",
        timeout: 0,
        headers: {
          "Authorization": "Client-ID acd50197869043a"
        },
        processData: false,
        mimeType: "multipart/form-data",
        contentType: false,
        data: formData
      })
        .then(res => {
          this.setState({
            image: res.data.data.link,
          });
        })
        .catch(e => {
          console.log(e);
        })
    }
  }
  render() {
    const { project, auth, updateProject, id } = this.props;
    if(project){
      if(this.state.title == ''&&this.state.content == '' &&this.state.image == '')
      {
        this.setState({
          title:project.title,
          content:project.content,
          image:project.image
        })
      }
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Update Project</h5>
          <div className="input-field">
            <textarea className="materialize-textarea" type="text" id='title' onChange={this.handleChange} value={this.state.title}/>
            <label htmlFor="title" className="active">Project Title</label>
          </div>
          <div className="input-field">
            <textarea id="content" className="materialize-textarea" onChange={this.handleChange} value={this.state.content}/>
            <label htmlFor="content" className="active">Project Content</label>
          </div>
          <input type='file' className='input-image' onChange={() => this.uploadImage()} />
          <div>
            <img src={this.state.image} alt=""></img>
          </div>
          <Link to={'/projectList'}>
            <div className="input-field">
              <button className="btn pink lighten-1" onClick={ updateProject.bind(this,this.state,id) }>Update</button>
            </div>
          </Link>
        </form>
      </div>
    )
  }else {
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
    updateProject: (project,id) => dispatch(updateProject(project,id))
  }
}
const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const projects = state.firestore.data.projects;
  const project = projects ? projects[id] : null
  return {
    id: id,
    project: project,
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(UpdateProject);
