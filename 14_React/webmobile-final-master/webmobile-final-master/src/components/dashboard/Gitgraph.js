import React, { Component } from  'react' ;
import axios from  'axios' ;
import Chart from "react-apexcharts";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
} from 'reactstrap';

class Gitgraph extends Component {
  constructor(props){
    super(props);
    this.state = {
      options: {
        stroke: {
          width: [5, 7, 5],
          curve: 'straight',
          dashArray: [0, 8, 5]
        },
        zoom: {
          enabled: false
        },
        markers: {
          size: 0
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: []
        },
        title: {
          text: '',
          align: 'left'
        },
        toolbar:{
          download : false,
        }
      },
      KSJ : {name:'K S J' , data : []},
      KJR : {name:'K J R' , data : []},
      HES : {name:'H E S' , data : []},
      LYR : {name:'L Y R' , data : []}   
    }
  }
  componentDidMount(){
    axios.get("https://api.github.com/repos/kim-sung-joong/kim-sung-joong.github.io/stats/participation")
    .then(res =>{
      this.setState({
        KSJ : {
          ...this.state.KSJ , data : res.data.all
        }
      })
    })
    axios.get("https://api.github.com/repos/doorisun/ssafy_bot/stats/participation")
    .then(res =>{
      this.setState({
        KJR : {
          ...this.state.KJR , data : res.data.all
        }
      })
    })
    axios.get("https://api.github.com/repos/kim-sung-joong/kim-sung-joong.github.io/stats/participation")
    .then(res =>{
      this.setState({
        HES : {
          ...this.state.HES , data : res.data.all
        }
      })
    })
    axios.get("https://api.github.com/repos/yurimida/yurimida.github.io/stats/participation")
    .then(res =>{
      this.setState({
        LYR : {
          ...this.state.LYR , data : res.data.all
        }
      })
    })  
}
render(){
  return (
    <Row lg="12" xl="12" md="12" className="d-md-down-none">
          <Col>
            <Card>
              <CardHeader>
                Git Graph
              </CardHeader>
              <CardBody>
                <div className="nametag">
                  <span>
                    <a href="https://github.com/kim-sung-joong/kim-sung-joong.github.io">김성중</a>
                  </span>
                  <span>
                    <a href="https://github.com/doorisun/ssafy_bot">김재룡</a>
                  </span>
                  <span>
                    <a href="https://github.com/kim-sung-joong/kim-sung-joong.github.io">황은석</a>
                  </span>
                  <span>
                    <a href="https://github.com/yurimida/yurimida.github.io">이유림</a>
                  </span>
                </div>
                <Chart
                  options={this.state.options}
                  series={[
                    this.state.KSJ,
                    this.state.KJR,
                    this.state.HES,
                    this.state.LYR,
                  ]}
                  type="line"
                  width="100%"
                  >
                </Chart>
              </CardBody>
            </Card>
          </Col>
        </Row>
  );
}
}

export default Gitgraph;
