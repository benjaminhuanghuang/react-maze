import React, { Component } from "react";
import { connect } from "react-redux";
//
import { createMaze } from "../actions/index";
import MazeBoard from './MazeBoard';

class MazeCanvas extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      size: 3
    }

    this.onCreateClick = this.onCreateClick.bind(this);
    this.onResolveClick = this.onResolveClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  componentWillMount() {
    let height = window.innerHeight;
    let width = window.innerWidth;
    let boardSize = (height < width) ? height * .8 : width * .8;
    let unit = boardSize / this.state.size;
   
    this.setState({
      boardSize,
      unit
    })
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

  onInputChange(event) {
    this.setState({ size: event.target.value });
  }
  
  onCreateClick()
  {
    this.props.createMaze(this.state.size);
  }

  onResolveClick()
  {
    this.resolveMaze();
  }

  render() {
    return (
      <div className="container">
        <div style={{display:'flex', justifyContent:'center', alignItems:"center"}}>
          <div className="input-field" style={{flex:"1", marginRight:"1em"}}>
            <input id="size" type="number" min="3" step="2" max="100" value={this.state.size} onChange={this.onInputChange}/>
            <label htmlFor="size" className="active">Maze size:</label>
          </div>
          <div style={{flex:"2"}}>
            <button className="waves-effect waves-light btn" onClick={this.onCreateClick}>Init</button>
          </div>
          <div style={{flex:"5"}}>
            <button className="waves-effect waves-light btn" onClick={this.onResolveClick}>Resolve</button>
          </div>
        </div>
        <div>
          <MazeBoard mazeMap = {this.props.mazeMap} unit={this.state.unit} 
              size= {this.state.size} boardSize={this.state.boardSize}/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { mazeMap: state.mazeData.mazeMap, solution: state.mazeData.solution};
}
export default connect(mapStateToProps, {createMaze})(MazeCanvas);
