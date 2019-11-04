import React, { Component } from 'react'
import ProjectList from './ProjectList'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import './project.css'
class ProjectListPage extends Component{
  state = {
    keyword:''
  };
  handleValueChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
    }

    render(){
        const {projects , auth} = this.props;
        return(
            <div className="" style={{backgroundColor: "#548CFF"}}>
              {!auth.isEmpty ?    <Link to="/createProject">
              <button type="button" className="nes-btn is-warning postbutton">NewProject</button>
            </Link> : null}
                <ProjectList projects={projects}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      projects: state.firestore.ordered.projects,
      auth: state.firebase.auth,
    }
  }
  export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'projects', orderBy: ['createdAt', 'desc'] },
    ])
  )(ProjectListPage)