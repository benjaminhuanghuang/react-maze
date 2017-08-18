import React, { Component } from "react";

class Maze extends Component {
  
  constructor(props) {
    super(props);

    this.state ={
      size:1,
      mazeData: {},
      running: false,
      currentPos: [0,0]
    }
  
    this.onInitClick = this.onInitClick.bind(this);
    this.onResolveClick = this.onResolveClick.bind(this);
}

  initMaze() {
    let newMaze = {};
    let size = 0;

    this.setState({mazeData:newMaze, size:size});
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
        <div className="row">
          <div className="col s2">
            <input type="number" ref="input_size" />
          </div>
          <div className="col s2">
            <button className="waves-effect waves-light btn" onClick={this.onInitClick}>Init</button>
          </div>
          <div className="col s2">
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
