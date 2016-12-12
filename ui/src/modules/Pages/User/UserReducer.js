import { createReducer } from '../../../utils/Functions';


import {
  USER_BIO_IS_EDITING,
  USER_BIO_INPUT,
  USER_RESET
} from './UserActions';

const initialState = {
  bioIsEditing: false,
  bioInput: ''
};

export default createReducer(initialState, {
  [USER_BIO_IS_EDITING]: (state, payload) => Object.assign({}, state, {
    bioIsEditing: payload.isEditing
  }),
  [USER_BIO_INPUT]: (state, payload) => Object.assign({}, state, {
    bioInput: payload.input
  }),
  [USER_RESET]: (state, payload) => Object.assign({}, initialState)
});
