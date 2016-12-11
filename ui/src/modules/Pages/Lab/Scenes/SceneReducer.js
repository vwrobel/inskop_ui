import { combineReducers } from 'redux';
import sceneListReducer from './SceneList/SceneListReducer';
import sceneDetailReducer from './SceneDetail/SceneDetailReducer';

export default combineReducers({
  list: sceneListReducer,
  detail: sceneDetailReducer
});
