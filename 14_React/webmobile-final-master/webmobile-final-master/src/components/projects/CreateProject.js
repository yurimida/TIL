import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createProject } from '../../store/actions/projectActions'
import { Redirect } from 'react-router-dom'
import axios from 'axios';

class CreateProject extends Component {
  state = {
    title: '',
    content: '',
    image: '',
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createProject(this.state);
    this.props.history.push('/main'); 
  }
    uploadImage(){
      const formData = new FormData()
      const file = document.getElementById('ex_file').files[0]
      if(file==null){
        alert("이미지를 선택해 주세요.")
      }
      else{
        formData.append("image",file)
        axios({
          method : "POST",
          url : "https://api.imgur.com/3/image",
          timeout: 0,
          headers: {
            "Authorization": "Client-ID acd50197869043a"
          },
          processData: false,
          mimeType: "multipart/form-data",
          contentType: false,
          data: formData
        })
        .then(res=> {
          this.setState({
            image : res.data.data.link,
          });
        })
        .catch(e=>{
          console.log(e);
        })
      }
    }
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/signin' /> 
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit} style={{margin:"0px"}}>
          <h5 className="grey-text text-darken-3">Create a New Project</h5>
          <div className="input-field">
            <input type="text" id='title' onChange={this.handleChange} />
            <label htmlFor="title"  className="active">Project Title</label>
          </div>
          <div className="input-field">
            <textarea id="content" className="materialize-textarea" onChange={this.handleChange}></textarea>
            <label htmlFor="content"  className="active">Project Content</label>
          </div>
          <div className="input-field">
            <label htmlFor="content">Project Image</label>
            <div>
              <img src={this.state.image} alt="" style={{width:"350px",height:"200px"}}></img>
            </div>
            <input id="ex_file" type='file' onChange={()=>this.uploadImage()} />
          </div>
          <div className="input-field">
          <button className="nes-btn is-success" >Create</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createProject: (project) => dispatch(createProject(project))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject)
