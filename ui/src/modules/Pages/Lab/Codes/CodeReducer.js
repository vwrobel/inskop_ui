import { combineReducers } from 'redux';
import codeListReducer from './CodeList/CodeListReducer';
import codeDetailReducer from './CodeDetail/CodeDetailReducer';

export default combineReducers({
  list: codeListReducer,
  detail: codeDetailReducer
});
