import { combineReducers } from 'redux';
//
import MazeReducer from './MazeReducer';

// maps state and reducer
const reducers = combineReducers({
  mazeData: MazeReducer,
});

export default reducers; 