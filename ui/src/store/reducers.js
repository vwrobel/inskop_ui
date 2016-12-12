import { combineReducers } from 'redux'; // TODO: check 'redux-immutablejs'
import { routerReducer } from 'react-router-redux';
import ApolloClientSingleton from '../network/apollo-client-singleton';
import navReducer from '../modules/Navigation/NavReducer';
import authReducer from '../modules/Auth/AuthReducer';
import sceneReducer from '../modules/Pages/Lab/Scenes/SceneReducer';
import codeReducer from '../modules/Pages/Lab/Codes/CodeReducer';
import userReducer from '../modules/Pages/User/UserReducer';

export default combineReducers({
  routing: routerReducer,
  apollo: ApolloClientSingleton.reducer(),
  navigation: navReducer,
  auth: authReducer,
  scene: sceneReducer,
  code: codeReducer,
  user: userReducer
});

