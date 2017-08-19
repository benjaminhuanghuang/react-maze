import React, { Component } from "react";
import { connect } from "react-redux";
//
import { createMaze } from "../actions/index";

class MazeCanvas extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      size: 3,
      running: false,
      currentPos: [0, 0]
    }

    this.onCreateClick = this.onCreateClick.bind(this);
    this.onResolveClick = this.onResolveClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  
  renderMaze() {
    return <h2>Please init the maze </h2>;
  }
  renderRow(row)
  { 
    return (
      row.map((cell, colIndex)=>{
        if(cell===1)
          return (<div key={colIndex} style={{backgroundColor:'black'}}/>);
        else
          return (<div key={colIndex} style={{backgroundColor:'white'}}/>);
      })
    );
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
          {this.renderMaze()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { mazeData: state.mazeData };
}

export default connect(mapStateToProps, {createMaze})(MazeCanvas);
