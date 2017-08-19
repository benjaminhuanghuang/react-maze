import { CREATE_MAZE } from "./types";

export function createMaze(size) {
  const mazeData = createMazeData(size);
  return {
    type: CREATE_MAZE,
    payload: mazeData
  };
}

function createMazeData(size) {
  let mazeMap = initMatrix(size, 1);

  mazeMap[0][0] = 0;
  mazeMap[size - 1][size - 1] = 0;
  
  let pathStack = [{row:0, col:0}];
  let solution = [];
  while(pathStack.length > 0)
  {
    let currPos = pathStack.pop();
    let nextPos = getNextPositionRandomly(mazeMap, currPos);
    if (nextPos)
    { 
      pathStack.push(currPos);
      pathStack.push(nextPos);
      if(nextPos.col === mazeMap[0].length-1 && nextPos.row === mazeMap.length-1)
      {
        solution= [...pathStack];
        break;  
      }
    }
  }
  return { mazeMap, solution};
}

function initMatrix(size, value) {
  let matrix = [];
  for (let row = 0; row < size; row++) {
    let cells = [];

    for (let col = 0; col < size; col++) {
      cells.push(value);
    }
    matrix.push(cells);
  }
  return matrix;
}

function getNextPositionRandomly(mazeMap, pos)
{
  let dirs = shuffleArray([0,1,2,3]);

  for(let dir of dirs){
    let nextPos = getNextPosition(pos, dir);
    if (checkPosition(mazeMap, pos, nextPos))
    {
      mazeMap[nextPos.row][nextPos.col] = 0;
      return nextPos;
    }
  }
  return null;
}

function getNextPosition(pos, direction)
{
  let { row, col } = pos;
  if (direction === 0)  // Top
      row -= 1;
  else if (direction === 1)  // Right
      col += 1;
  else if (direction === 2)  // Bottom
      row += 1;
  else if (direction === 3)  // Left
      col -= 1;
  return { row, col };
}

function checkPosition(mazeMap, pos, nexPos) {
  let {row, col} = nexPos;

  if (row === mazeMap.length-1 && col === mazeMap[0].length-1)
    return true;
  
  if (row <0 || row > mazeMap.length-1 || col <0 || col > mazeMap[0].length-1)
    return false;
  
  if (mazeMap[row][col] === 0) {
    return false;
  }

  let offsets = [[-1,0], // Top
                [0,-1], // Left
                [0,1],  // right
                [1,0]]; // Bottom

  for (let offset of offsets)
  {
    let adjacentRow = row + offset[0];
    let adjacentCol = col + offset[1];
    if (adjacentRow === mazeMap.length-1 && adjacentCol === mazeMap[0].length-1)
      return true;
    if (adjacentRow<0 || adjacentRow > mazeMap.length-1 || adjacentCol <0 || adjacentCol > mazeMap[0].length-1)
      continue;
    if(adjacentRow === pos.row && adjacentCol=== pos.col)
      continue;
    if (mazeMap[adjacentRow][adjacentCol] === 0)
      return false;
  }
  return true;
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array;
}