import React, { Component } from 'react';

export default class Home extends Component {
  constructor(props) {
  super(props);
  this.state={
    color: "255",
    rgb : `rgb(250, 250,250)`
  }
  this.fetchData=this.fetchData.bind(this)
}
  componentDidMount(){
    setInterval(this.fetchData, 1500)
  }
  changeColor(){
    console.log(this.props);
    const params = new URLSearchParams(this.props.location.search);
    let newColor = params.get('color')
    console.log(newColor)
    this.setState({
      color : newColor,
      rgb : `rgb(0, ${newColor}, 0)`
    }, ()=>{console.log(this.state.rgb)});
  }
  fetchData(){
    const me = this
    fetch("http://localhost:3001/color", {
      method : 'get'
      })
      .then(function(response){
        return response.json()
      })
      .then(function(data){
        me.setState({
          color : data.color,
          rgb : `rgb(75, ${data.color}, 75)`
        })
      })
      .catch(console.log);
  }
  render() {
    return (
      <div style={{backgroundColor: this.state.rgb, width:"100%", height:"100vh"}}>
       <p style={{textAlign: "center", padding: "50px"}}><b>{`this RGB color is:  ${this.state.rgb}`}</b></p>
      </div>
    );
  }
}
