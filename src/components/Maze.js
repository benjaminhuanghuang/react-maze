import React, { Component } from "react";
import { connect } from "react-redux";
//
import { createMaze } from "../actions/index";

class Maze extends Component {
  constructor(props) {
    super(props);

    this.state = {
      size: 5,
      showPath: false,
      currentPos: [0, 0]
    };

    this.onCreateClick = this.onCreateClick.bind(this);
    this.onResolveClick = this.onResolveClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  resolveMaze() {
    this.setState({ showPath: true });
  }

  renderMaze() {
    if (this.props.mazeMap) {
      let rows =  this.props.mazeMap.map((row, rowIndex) => {
        return this.renderRow(row, rowIndex);
      });
      return [this.renderTopBorder(), ...rows, this.renderBottomBorder()];
    }
    return <h2>Please init the maze </h2>;
  }

  renderTopBorder() {
    let border = [0];
    for (let i = 0; i< this.props.mazeMap.length-1; i++)
      border.push(1);
    return this.renderRow(border, -1);
  }
  renderBottomBorder() {
    let border = [];
    for (let i = 0; i< this.props.mazeMap.length-1; i++)
      border.push(1);
    border.push(0);
    return this.renderRow(border, this.props.mazeMap.length);
  }
    
  renderRow(row, rowIndex) {
    let cells = row.map((cell, colIndex) => {
      if (cell === 1)
        return this.renderWall(colIndex);
      else 
      {
        if (this.inPath(rowIndex, colIndex) && this.state.showPath)
          return this.renderPath(colIndex);
        else
          return this.renderSpace(colIndex);
      } 
    });
    return( 
      <div key={rowIndex} style={{ display:"flex", justifyContent: "center", alignItems: "center" }}> 
        {[this.renderWall(-1), ...cells, this.renderWall(row.length)]}
      </div>);
  }
  inPath(row, col)
  {
    for (let cell of this.props.solution)
      {
        if(cell.row === row && cell.col===col)
          return true;
      }
      return false;
  }
  renderPath(key)
  {
    return <div key={key} style={{ backgroundColor: "blue", width:"20px", height:"20px", borderColor:"blue" }} />;
  }
  renderSpace(key)
  {
    return <div key={key} style={{ backgroundColor: "white", width:"20px", height:"20px", borderColor:"blue" }} />;
  }

  renderWall(key)
  {
    return <div key={key} style={{ backgroundColor: "black" , width:"20px", height:"20px" }} />;
  }

  onInputChange(event) {
    this.setState({ size: event.target.value });
  }

  onCreateClick() {
    //console.log("onInitClick ", this.state);
    this.setState({ showPath: false });
    this.props.createMaze(this.state.size);
  }

  onResolveClick() {
    //console.log("onResolveClick ", this.state);
    this.resolveMaze();
  }

  render() {
    return (
      <div>
        <div style={{ display:"flex", justifyContent: "center", alignItems: "center" }}>
          <div className="input-field" style={{ flex: "1", marginRight: "1em" }}>
            <input id="size" type="number" min="3" step="2" max="50" value={this.state.size}
              onChange={this.onInputChange} />
            <label htmlFor="size" className="active"> Maze size:</label>
          </div>
          <div style={{ flex: "2" }}>
            <button className="waves-effect waves-light btn" onClick={this.onCreateClick}>
              Crete Maze
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
  return { mazeMap: state.mazeData.mazeMap, solution: state.mazeData.solution};
}

export default connect(mapStateToProps, {createMaze})(Maze);