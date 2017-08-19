import { CREATE_MAZE, RESOLVE_MAZE } from "../actions/types";

export default function(state=null, action) {
  switch (action.type) {
    case CREATE_MAZE:
      return action.payload;
    
    case RESOLVE_MAZE:
      return state;
    
    default:
      return state;
  }
}