import { CREATE_MAZE } from "./types";

export function createMaze(size) {
  const mazeData = createMazeData(size);
  return {
    type: CREATE_MAZE,
    payload: mazeData
  };
}

function createMazeData(size) {
  return [
          [0, 1, 1, 1], 
          [0, 0, 0, 1], 
          [0, 1, 0, 1],
          [0, 1, 0, 0]
        ];
}
