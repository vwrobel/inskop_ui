import { combineReducers } from 'redux';
import { createReducer } from '../../../../../utils/Functions';

import {
  CODE_EDIT_NAME_INPUT,
  CODE_EDIT_DESCRIPTION_INPUT,
  CODE_EDIT_CATEGORY_INPUT,
  CODE_EDIT_OPEN_DIALOG_CREATE,
  CODE_EDIT_OPEN_DIALOG_DELETE,
  CODE_EDIT_OPEN_DIALOG_MODIFY,
  CODE_EDIT_OPEN_ALERT,
  CODE_EDIT_SET_EDITED,
  CODE_EDIT_RESET,
  CODELIST_RESET,
} from './CodeListActions';

const initialState = {
  codeNameInput: '',
  codeDescriptionInput: '',
  codeCategoryInput: '',
  openedCreateDialog: false,
  openedDeleteDialog: false,
  openedModifyDialog: false,
  openedAlert: false,
  editedCode: null
};

const codeListReducer = createReducer(initialState, {
  [CODE_EDIT_NAME_INPUT]: (state, payload) => Object.assign({}, state, {
    codeNameInput: payload.input
  }),
  [CODE_EDIT_DESCRIPTION_INPUT]: (state, payload) => Object.assign({}, state, {
    codeDescriptionInput: payload.input
  }),
  [CODE_EDIT_CATEGORY_INPUT]: (state, payload) => Object.assign({}, state, {
    codeCategoryInput: payload.input
  }),
  [CODE_EDIT_RESET]: (state) => Object.assign({}, state, {
    codeNameInput: '',
    codeDescriptionInput: '',
    editedCode: null
  }),
  [CODE_EDIT_SET_EDITED]: (state, payload) => Object.assign({}, state, {
    editedCode: payload.code
  }),
  [CODE_EDIT_OPEN_DIALOG_CREATE]: (state, payload) => Object.assign({}, state, {
    openedCreateDialog: payload.opened
  }),
  [CODE_EDIT_OPEN_DIALOG_DELETE]: (state, payload) => Object.assign({}, state, {
    openedDeleteDialog: payload.opened
  }),
  [CODE_EDIT_OPEN_DIALOG_MODIFY]: (state, payload) => Object.assign({}, state, {
    openedModifyDialog: payload.opened
  }),
  [CODE_EDIT_OPEN_ALERT]: (state, payload) => Object.assign({}, state, {
    openedAlert: payload.opened
  }),
  [CODELIST_RESET]: (state) => Object.assign({}, state, initialState)
});

export default codeListReducer;
