import React from 'react'
import moment from 'moment'
import '../../index.css'

const PostSummary = ({post}) => {
  return (
    
    <div className="card z-depth-0 listcard post-summary" style={{ border:"10px black double", borderRadius:"10px", textAlign:"center"}}>
      <div className="card-content listcard-content grey-text text-darken-3" style={{ width:"100%"}}>
        <span className="listcard-title" style={{textOverflow: "ellipsis",}}>{post.title}</span>
        <p className="" style={{marginTop:'10px'}}>{post.authorFirstName} {post.authorLastName}</p>
        <p className="grey-text">{moment(post.createdAt.toDate()).format('L')}</p>
      </div>
    </div>
  )
}

export default PostSummary
