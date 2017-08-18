import React, { Component } from "react";

class Maze extends Component {
  componentDidMount() {}
  initMaze() {}
  renderMaze() {
    return <h1>Maze</h1>;
  }

  render() {
    return (
      <div className="container">
        <div className="row">
        <input type="number" ref="input_size"/>
        <button className="btn">Init Maze</button>
        <button className="btn">Resolve Maze</button>
        </div>
        <div>
          {this.renderMaze()}
        </div>
      </div>
    );
  }
}

export default Maze;
