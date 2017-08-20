import React from "react";
import {Layer, Line, Rect, Stage, Group} from 'react-konva';
//
const BLOCK_SIZE = 15;
export default class MazeBoard extends React.Component {
  renderMaze() {
    if(this.props.mazeMap)
    {
      let size = this.props.mazeMap.length;
      let cells = [];
      for (let row = 0; row< size; row++)
      {
        for(let col = 0; col< size; col++)
        {
          let color = this.props.mazeMap[row][col] === 1? "black":"white";
          let x = BLOCK_SIZE * col;
          let y = BLOCK_SIZE * row;
          cells.push(
            <Rect x={x+1} y={y+1} width={BLOCK_SIZE} height={BLOCK_SIZE}
            fill={color}
            key={`${x}-${y}`}/>
          )
        }
      }
      let lines =[];
      lines.push(<Line
				points={[0, 0, 0, size*BLOCK_SIZE]}
				stroke={"black"}
				strokeWidth={2}
        key="1"
      />);
      lines.push(<Line
				points={[size*BLOCK_SIZE, 0 , size*BLOCK_SIZE, size*BLOCK_SIZE]}
				stroke={"black"}
				strokeWidth={2}
        key="2"
      />);
      lines.push(<Line
				points={[0, 0, size*BLOCK_SIZE, 0]}
				stroke={"black"}
				strokeWidth={2}
        key="3"
      />);
      lines.push(<Line
				points={[0, size*BLOCK_SIZE, size*BLOCK_SIZE, size*BLOCK_SIZE]}
				stroke={"black"}
				strokeWidth={2}
        key="4"
			/>);

      return [...lines, ...cells];
    }
  }

  render() {
    return (
      <Stage width={this.props.boardSize} height={this.props.boardSize}>
        <Layer>
          {this.renderMaze()}
        </Layer>
    </Stage>
    );
  }
}