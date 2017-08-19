import { CREATE_MAZE } from "./types";

export function createMaze(size) {
  const mazeData = createMazeData(size);
  return {
    type: CREATE_MAZE,
    payload: mazeData
  };
}

function createMazeData(size) {
  let mazeData = initMatrix(size, 1);
  let visited = initMatrix(size, 0);
  mazeData[0][0] = 0;
  mazeData[size - 1][size - 1] = 0;
  visited[0][0] = 1;
  setPathDfs(mazeData, 0, 0, visited);
  return mazeData;
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

function setPathDfs(mazeData, row, col, visited) {

}
