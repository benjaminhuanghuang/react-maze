import React, { Component } from "react";
import { connect } from "react-redux";
import { createMaze } from "../actions/index";

class Maze extends Component {
  constructor(props) {
    super(props);

    this.state = {
      size: 3,
      running: false,
      currentPos: [0, 0]
    };

    this.onInitClick = this.onInitClick.bind(this);
    this.onResolveClick = this.onResolveClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  resolveMaze() {
    this.setState({ running: true });

    let x = 0;
    let y = 0;
    this.setState({ currentPos: [x, y] });
  }

  renderMaze() {
    if (this.props.mazeData) {
      return this.props.mazeData.map((row, rowIndex) => {
        return (
          <div key={rowIndex} style={{ display: "inline"}}>
            {this.renderRow(row)}
          </div>
        );
      });
    }
    return <h2>Please init the maze </h2>;
  }
  renderRow(row) {
    return row.map((cell, colIndex) => {
      if (cell === 1)
        return <div key={colIndex} style={{ backgroundColor: "black", width:"20px", height:"20px" }} />;
      else return <div key={colIndex} style={{ backgroundColor: "red" , width:"20px", height:"20px" }} />;
    });
  }

  onInputChange(event) {
    this.setState({ size: event.target.value });
  }

  onInitClick() {
    //console.log("onInitClick ", this.state);
    this.props.createMaze(this.state.term);
  }

  onResolveClick() {
    //console.log("onResolveClick ", this.state);
    this.resolveMaze();
  }

  render() {
    return (
      <div className="container">
        <div style={{ display:"flex", justifyContent: "center", alignItems: "center" }}>
          <div className="input-field" style={{ flex: "1", marginRight: "1em" }}>
            <input id="size" type="number" min="3" step="2" max="100" value={this.state.size}
              onChange={this.onInputChange} />
            <label htmlFor="size" className="active"> Maze size:</label>
          </div>
          <div style={{ flex: "1" }}>
            <button className="waves-effect waves-light btn" onClick={this.onInitClick}>
              Init
            </button>
          </div>
          <div style={{ flex: "5" }}>
            <button className="waves-effect waves-light btn" onClick={this.onResolveClick}>
              Resolve
            </button>
          </div>
        </div>
        <div>
          {this.renderMaze()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { mazeData: state.mazeData };
}

export default connect(mapStateToProps, {createMaze})(Maze);