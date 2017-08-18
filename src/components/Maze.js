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
          <h1>Buttons</h1>
        </div>
        <div>
          {this.renderMaze()}
        </div>
      </div>
    );
  }
}

export default Maze;
