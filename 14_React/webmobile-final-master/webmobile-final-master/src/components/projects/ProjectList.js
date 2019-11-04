import React, { useState } from 'react'
import ProjectSummary from './ProjectSummary'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
const ProjectList = ({ projects }) => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <div style={{ display: "flex", width: "90%", marginLeft: "auto", marginRight: "auto" }}>
        <div className="project-list section"  style={{width:"100%"}}>
          <div style={{ marginLeft: "auto", marginRight: "auto" }}>
            {projects && projects.slice(0, 4+count).map(project => {
              return (
                <Link to={'/project/' + project.id
              } key={project.id} style={{ textDecoration: "none", height: "250px", alignItems: "center", display: "inline-block", width: "23%", marginLeft: "1%", marginRight: "1%", marginBottom: "3%", overflow: "hidden", textOverflow: "ellipsis", }}>
                  <ProjectSummary project={project} />
                </Link>
              )
            })}
          </div>
        </div>
      </div>
      <div style={{textAlign:"center"}}>
        <button className="nes-btn is-warning postbutton" onClick={() => setCount(count +4)}>More</button>
      </div>
      </div>
  )
}
export default compose(
)(ProjectList)
