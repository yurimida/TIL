import React , {useState} from 'react'
import PostSummary from './PostSummary'
import { Link } from 'react-router-dom'
import { compose } from 'redux'

const PostList = ({posts}) => {
  const [count , setCount] = useState(4);
  return (
    <div>
    <div style={{display: "flex", width: "90%", marginLeft: "auto", marginRight: "auto"}}>
      <div className="post-list section"  >
        <div style={{marginLeft: "auto", marginRight: "auto"}}>
        { posts && posts.slice(0,count).map((post,index) => {
          return (
            <Link to={'/post/' + post.id
          } key={post.id} style={{textDecoration:"none", height: "250px", alignItems: "center", display: "inline-block", width: "23%", marginLeft: "1%", marginRight: "1%", marginBottom:"3%",overflow: "hidden", textOverflow: "ellipsis", }}>
                <PostSummary post={post}/>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
    <div style={{textAlign:"center"}}>
      <button className="nes-btn is-warning postbutton" onClick={() => setCount(count + 4)}>More</button>
    </div>
    </div>
  )
}
  export default compose(
  )(PostList)
