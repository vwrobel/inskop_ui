import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

export const AUTH_LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST';
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_ERROR = 'AUTH_LOGIN_ERROR';
export const AUTH_LOAD_AUTH_COOKIE = 'AUTH_LOAD_AUTH_COOKIE';
export const AUTH_LOGOUT_SUCCESS = 'AUTH_LOGOUT_SUCCESS';
export const AUTH_LOCK_CREATED = 'AUTH_LOCK_CREATED';
export const AUTH_SAVE_USER_DATA = 'AUTH_SAVE_USER_DATA';


export function logInRequest(request) {
  return {
    type: AUTH_LOGIN_REQUEST,
    payload: {
      request
    }
  };
}

export function logInSuccess(profile, idToken) {
  return {
    type: AUTH_LOGIN_SUCCESS,
    payload: {
      profile,
      idToken
    }
  };
}

export function logInError(err) {
  return {
    type: AUTH_LOGIN_ERROR,
    payload: {
      err
    }
  };
}

export function loadAuthCookie(profile, idToken) {
  return {
    type: AUTH_LOAD_AUTH_COOKIE,
    payload: {
      profile,
      idToken
    }
  };
}

export function logOutSuccess() {
  return {
    type: AUTH_LOGOUT_SUCCESS,
    payload: {
    }
  };
}

export function lockCreated(lock) {
  return {
    type: AUTH_LOCK_CREATED,
    payload: {
      lock
    }
  };
}

export function saveUserData(userData) {
  return {
    type: AUTH_SAVE_USER_DATA,
    payload: {
      userData
    }
  };
}

export function login(profile, idToken) {
  return (dispatch) => {
    cookie.save('idToken', idToken);
    cookie.save('profile', JSON.stringify(profile));
    dispatch(logInSuccess(profile, idToken));
  };
}

export function loadAuth() {
  return (dispatch) => {
    const profile = cookie.load('profile') || null;
    const idToken = cookie.load('idToken') || null;
    dispatch(loadAuthCookie(profile, idToken));
  };
}

export function logout() {
  return (dispatch) => {
    dispatch(logOutSuccess());
    cookie.remove('idToken', { path: '/' });
    cookie.remove('profile', { path: '/' });
    browserHistory.push('/');
  };
}
