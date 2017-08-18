import React, { Component } from "react";

class Maze extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      size: 1,
      mazeData: {},
      running: false,
      currentPos: [0, 0]
    }

    this.onInitClick = this.onInitClick.bind(this);
    this.onResolveClick = this.onResolveClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  initMaze() {
    console.log("size", this.state.size);
    let newMaze = {};
    this.setState({mazeData:newMaze});
  }

  resolveMaze()
  {
    this.setState({running:true});

    let x = 0;
    let y = 0;
    this.setState({currentPos:[x, y]});
    
  }
  renderMaze() {
    return <h1>Test</h1>;
  }

  onInputChange(event) {
    this.setState({ size: event.target.value });
  }
  
  onInitClick()
  {
    console.log("onInitClick ", this.state);
    this.initMaze()
  }

  onResolveClick()
  {
    console.log("onResolveClick ", this.state);
    this.resolveMaze();
  }

  render() {
    return (
      <div className="container">
        <div style={{display:'flex', justifyContent:'center', alignItems:"center"}}>
          <div className="input-field" style={{flex:"1", marginRight:"1em"}}>
            <input id="size" type="number" min="1" max="100" value={this.state.size} onChange={this.onInputChange}/>
            <label htmlFor="size" className="active">Maze size:</label>
          </div>
          <div style={{flex:"1"}}>
            <button className="waves-effect waves-light btn" onClick={this.onInitClick}>Init</button>
          </div>
          <div style={{flex:"5"}}>
            <button className="waves-effect waves-light btn" onClick={this.onResolveClick}>Resolve</button>
          </div>
        </div>
        <div>
          {this.renderMaze()}
        </div>
      </div>
    );
  }
}

export default Maze;
