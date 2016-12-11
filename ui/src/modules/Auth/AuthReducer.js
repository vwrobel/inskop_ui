import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_ERROR,
  AUTH_LOAD_AUTH_COOKIE,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOCK_CREATED,
  AUTH_SAVE_USER_DATA
} from './AuthActions';
import { createReducer } from '../../utils/Functions';

const initialState = {
  idToken: null,
  profile: null,
  isAuthenticated: false,
  isAuthenticating: false,
  errorMessage: null,
  lock: false,
  userData: null
};

export default createReducer(initialState, {
  [AUTH_LOGIN_SUCCESS]: (state, payload) => (
    Object.assign({}, state, {
      idToken: payload.idToken,
      profile: payload.profile,
      isAuthenticated: true,
      isAuthenticating: false,
      errorMessage: ''
    })
  ),
  [AUTH_LOGIN_REQUEST]: (state, payload) => (
    Object.assign({}, state, {
      isAuthenticating: payload.request
    })
  ),
  [AUTH_LOGIN_ERROR]: (state, payload) => (
    Object.assign({}, state, {
      isAuthenticated: false,
      errorMessage: payload.err
    })
  ),
  [AUTH_LOAD_AUTH_COOKIE]: (state, payload) => (
    Object.assign({}, state, {
      idToken: payload.idToken,
      profile: payload.profile,
      isAuthenticated: payload.profile !== null
    })
  ),
  [AUTH_LOGOUT_SUCCESS]: (state) => (
    Object.assign({}, state, {
      idToken: null,
      isAuthenticated: false,
      token: null,
      profile: null
    })
  ),
  [AUTH_LOCK_CREATED]: (state) => (
    Object.assign({}, state, {
      lock: true
    })
  ),
  [AUTH_SAVE_USER_DATA]: (state, payload) => (
    Object.assign({}, state, {
      userData: payload.userData
    })
  )
});
