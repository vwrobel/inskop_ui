import { combineReducers } from 'redux';
import sideBarReducer from './components/SideBar/SideBarReducer';
import appBarReducer from './components/AppBar/AppBarReducer';

export default combineReducers({
  appBar: appBarReducer,
  sideBar: sideBarReducer
});
