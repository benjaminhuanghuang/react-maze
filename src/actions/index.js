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
  
  let pathStack = [{x:0, y:0}];
  while(pathStack.length > 0)
  {
    let currPos = pathStack.pop();
    let nextPos = getNextPositionRandomly(mazeMap, currPos);
    if (nextPos)
    { 
      pathStack.push(currPos);
      pathStack.push(nextPos);
      if(nextPos.x === mazeMap[0].length-1 && nextPos.y === mazeMap.length)
        {
          break;  
        }
    }
  }
  return { mazeMap, solution: pathStack };
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
    if (checkPosition(mazeMap, nextPos))
    {
      mazeMap[nextPos.y][nextPos.x] = 0;
      return nextPos
    }
  }
  return null;
}

function getNextPosition(pos, direction)
{
  let { x, y } = pos;
  if (direction === 0)  // Top
      y -= 1;
  else if (direction === 1)  // Right
      x += 1;
  else if (direction === 2)  // Bottom
      y += 1;
  else if (direction === 3)  // Left
      x -= 1;
  return { x, y };
}

function checkPosition(mazeMap, pos) {
  let row = pos.y;
  let col = pos.x;

  if (row <=0 || row >= mazeMap.length-1 || col <=0 || col >= mazeMap[0].length-1)
    return false;

  if (mazeMap[row][col] === 0) {
    // already visited
    return false;
  }

  if (mazeMap[row-1][col-1] === 0 ||
      mazeMap[row-1][col] === 0 ||
      mazeMap[row-1][col+1] === 0 ||
      mazeMap[row][col-1] === 0 ||
      mazeMap[row][col+1] === 0 ||
      mazeMap[row+1][col+1] === 0 ||
      mazeMap[row+1][col] === 0 ||
      mazeMap[row+1][col+1] === 0)
    {
      return false;
    }
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