import React from 'react'
import moment from 'moment'
import '../../index.css'
import './ProjectSummary.css'

const ProjectSummary = ({project}) => {
  const projectimg = "url("+project.image+")";
  return (
    <div className="card z-depth-0 listproject project-summary" style={{backgroundRepeat:"no-repeat",backgroundImage:projectimg,backgroundPosition:"center" ,border:"10px black double", borderRadius:"10px", textAlign:"center", height:"100%" , backgroundSize:"cover"}}>
      <div className="card-content listproject-content grey-text text-darken-3" style={{ width:"100%", visibility:"hidden"}}>
        <span className="listproject-title" style={{textOverflow: "ellipsis",}}>{project.title}</span>
        <p className="" style={{marginTop:'10px'}}>{project.authorFirstName} {project.authorLastName}</p>
        <p className="grey-text">{moment(project.createdAt.toDate()).format('L')}</p>
      </div>
    </div>
  )
}

export default ProjectSummary
