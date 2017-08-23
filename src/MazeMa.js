/**
 * Created by sma on 8/18/17.
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Button} from 'antd'
class Maze extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      maze:[]
    }

  }

  componentDidMount(){
    this.maze(91);
  }

  maze(n) {
    var maze = [];
    for(var i = 0; i < n; i++){
      maze[i] = [];
      for(var j = 0; j < n; j++){
        maze[i][j] = 1;
      }
    }
    maze[0][0] = 0;
    var walker = [[2,0],[0,2],[-2,0],[0,-2]];
    this.helper(maze, 0, 0, walker,n);
    for(var i = 0; i<maze.length; i++){
      maze[i].unshift(1);
      maze[i].push(1);
    }
    var row0=[];
    var rown=[];
    for(var i = 0; i<maze.length+2; i++){
      row0[i]=1;
      rown[i]=1;
    }
    maze.unshift(row0);
    maze.push(rown);
    maze[0][1]=0;
    maze[maze.length-1][maze.length-2]=0;

    this.setState({maze:maze});

    return maze;
  }

  helper(maze, x, y, walker, len){
    if((x + 2 > len || maze[x+walker[0][0]][y+walker[0][1]] == 0 ) && (y + 2 > len || maze[x+walker[1][0]][y+walker[1][1]] == 0 )
      && (x - 2 < 0 || maze[x+walker[2][0]][y+walker[2][1]] == 0 ) && (y - 2 < 0 || maze[x+walker[3][0]][y+walker[3][1]] == 0 )){
      return;
    }
    while(true){
      var idx = parseInt((4 * Math.random()));
      var newX = walker[idx][0] + x;
      var newY = walker[idx][1] + y;
      if(newX >= 0 && newX < len && newY >= 0 && newY < len && maze[newX][newY] != 0){
        if(walker[idx][0]>0){
          maze[x+1][y] = 0;
        }else if(walker[idx][0] < 0){
          maze[x-1][y] = 0;
        }else if(walker[idx][1] >0){
          maze[x][y+1] = 0;
        }else{
          maze[x][y-1] = 0;
        }
        maze[newX][newY] = 0;
        this.helper(maze, newX, newY, walker, len);
        break;
      }
    }
    for(var k=0; k<walker.length; k++){
      var walk = walker[k];
      var newX = walk[0] + x;
      var newY = walk[1] + y;
      if(newX >= 0 && newX < len && newY >= 0 && newY < len && maze[newX][newY] != 0){
        if(walk[0]>0){
          maze[x+1][y] = 0;
        }else if(walk[0] < 0){
          maze[x-1][y] = 0;
        }else if(walk[1] >0){
          maze[x][y+1] = 0;
        }else{
          maze[x][y-1] = 0;
        }
        maze[newX][newY] = 0;
        this.helper(maze, newX, newY, walker, len);
      }
    }

}

  render() {
    return (
      <div style={{margin:"400px"}}>
        <span>
          {
            this.state.maze.map((row, idx)=> {
              return <div key={idx} style={{ height:"6px",padding:"0px", margin:"0px"}}>
                {
                  row.map((col, idx2)=>{
                    return col==0? <div key={idx+idx2} style={{width:"6px", height:"6px", backgroundColor:"#CDDC39", display:"inline-block", padding:"0px", margin:"0px"}}></div>
                      :
                      <div key={idx+idx2} style={{width:"6px", height:"6px", backgroundColor:"#424242",display:"inline-block",padding:"0px", margin:"0px"}}></div>;
                  })
                }
              </div>
            })
          }
        </span>
        <span>
          <Button style={{margin:"30px 0px 0px 400px"}} type="danger" onClick={()=>{ this.maze(91)}}>Generate new</Button>
        </span>
      </div>
    );
  }
}
export default Maze;



