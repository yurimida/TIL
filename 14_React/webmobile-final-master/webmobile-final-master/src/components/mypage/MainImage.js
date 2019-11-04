import React ,{ Component } from 'react';
import { Row } from 'reactstrap';
import './Mypage.css';
import axios from 'axios';

class MainImage extends Component {
  constructor(props){
    super(props);
    this.state = {
      charPoses : {
        exit: { y: 20, opacity: 0 },
        enter: {
          y: 0,
          opacity: 1,
          transition: ({ charInWordIndex }) => ({
            type: 'spring',
            delay: charInWordIndex * 30,
            stiffness: 500 + charInWordIndex * 150,
            damping: 10 - charInWordIndex * 1
          })
        }
      },
      image : 'https://source.unsplash.com/random/1600x900',
      file : null,
      selectedFile: null,
    }
  }
  changeImageImgur(){
    axios({
      method: 'get',
      url: 'https://api.imgur.com/3/account/me/images/',
      headers: { 'authorization': 'Bearer 045fb3f88f948ffbd5a1c6d20584167bd30e2e17' }
    })
    .then(res=> {
      this.setState({
        image : res.data.data[Math.floor(Math.random()*res.data.data.length)].link
      })
    })
    .catch(function(error) {
        console.log(error);
    });
  }
  changeImageUnsplash = () => {
    this.setState({
      image : 'https://source.unsplash.com/random/1600x900'
    })
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
    resetInput(){
      document.getElementsById('ex_file').reset();
    }
    render(){
      console.log(this.state.image)
    return(
      <Row style={{ marginBottom: "2%"}}>
      <div className="container" >
        <div className="unsplashImage mt-5">
          <img src={this.state.image} alt=""></img>
        </div>
      </div>
        <div className="mt-3 imageUpload" style={{margin:"auto"}}>
          <p>나의 이미지 고르기</p>
            <button className="waves-effect waves-light btn-small" type="submit" onClick={()=> this.changeImageUnsplash()}>Unsplash Image</button>
            <button className="waves-effect waves-light btn-small" onClick={()=> this.changeImageImgur()}>Imgur Image</button>
            <div className="filebox waves-effect waves-light btn-small"> <label htmlFor="ex_file">Upload Image</label>
            <input id="ex_file" type='file' onChange={()=>this.uploadImage()} /> 
            </div>
        </div>
    </Row>
    );
  }
} 
export default MainImage;