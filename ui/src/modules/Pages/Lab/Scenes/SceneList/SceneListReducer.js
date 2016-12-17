import { combineReducers } from 'redux';
import { createReducer } from '../../../../../utils/Functions';

import {
  SCENE_EDIT_NAME_INPUT,
  SCENE_EDIT_DESCRIPTION_INPUT,
  SCENE_EDIT_STATUS_INPUT,
  SCENE_EDIT_LOCK_INPUT,
  SCENE_EDIT_FILEDROP,
  SCENEADD_UPLOAD_REQUEST,
  SCENEADD_UPLOAD_SUCCESS,
  SCENEADD_UPLOAD_FAILURE,
  SCENE_EDIT_OPEN_DIALOG_CREATE,
  SCENE_EDIT_OPEN_DIALOG_DELETE,
  SCENE_EDIT_OPEN_DIALOG_MODIFY,
  SCENE_EDIT_OPEN_ALERT,
  SCENE_EDIT_SET_EDITED,
  SCENE_EDIT_RESET,
  SCENE_EDIT_CAN_SUBMIT,
  SCENELIST_RESET,
  SCENE_CARD_SHOW_DESCRITION
} from './SceneListActions';

const initialState = {
  isFetching: false,
  isPosting: false,
  isUploading: false,
  canSubmit: false,
  sceneNameInput: '',
  sceneDescriptionInput: '',
  sceneStatusInput: false,
  sceneLockInput: false,
  droppedFile: null,
  validDroppedFile: false,
  openedCreateDialog: false,
  openedDeleteDialog: false,
  openedModifyDialog: false,
  openedAlert: false,
  editedScene: null,
  showedDescriptionId: null
};

const sceneListReducer = createReducer(initialState, {
  [SCENEADD_UPLOAD_REQUEST]: (state) => Object.assign({}, state, {
    isUploading: true
  }),
  [SCENEADD_UPLOAD_SUCCESS]: (state) => Object.assign({}, state, {
    isUploading: false
  }),
  [SCENEADD_UPLOAD_FAILURE]: (state) => Object.assign({}, state, {
    isUploading: false
  }),
  [SCENE_EDIT_NAME_INPUT]: (state, payload) => Object.assign({}, state, {
    sceneNameInput: payload.input
  }),
  [SCENE_EDIT_DESCRIPTION_INPUT]: (state, payload) => Object.assign({}, state, {
    sceneDescriptionInput: payload.input
  }),
  [SCENE_EDIT_STATUS_INPUT]: (state, payload) => Object.assign({}, state, {
    sceneStatusInput: payload.input
  }),
  [SCENE_EDIT_LOCK_INPUT]: (state, payload) => Object.assign({}, state, {
    sceneLockInput: payload.input
  }),
  [SCENE_EDIT_FILEDROP]: (state, payload) => Object.assign({}, state, {
    droppedFile: payload.droppedFile,
    validDroppedFile: payload.droppedFile ?
      payload.droppedFile.type === 'video/mp4' && payload.droppedFile.size < 20000000 :
      false
  }),
  [SCENE_EDIT_RESET]: (state) => Object.assign({}, state, {
    sceneNameInput: '',
    sceneDescriptionInput: '',
    sceneStatusInput: false,
    sceneLockInput: false,
    droppedFile: null,
    validDroppedFile: false,
    canSubmit: false,
    editedScene: null
  }),
  [SCENE_EDIT_CAN_SUBMIT]: (state, payload) => Object.assign({}, state, {
    canSubmit: payload.valid,
  }),
  [SCENE_EDIT_SET_EDITED]: (state, payload) => Object.assign({}, state, {
    editedScene: payload.scene
  }),
  [SCENE_CARD_SHOW_DESCRITION]: (state, payload) => Object.assign({}, state, {
    showedDescriptionId: payload.sceneId
  }),
  [SCENE_EDIT_OPEN_DIALOG_CREATE]: (state, payload) => Object.assign({}, state, {
    openedCreateDialog: payload.opened
  }),
  [SCENE_EDIT_OPEN_DIALOG_DELETE]: (state, payload) => Object.assign({}, state, {
    openedDeleteDialog: payload.opened
  }),
  [SCENE_EDIT_OPEN_DIALOG_MODIFY]: (state, payload) => Object.assign({}, state, {
    openedModifyDialog: payload.opened
  }),
  [SCENE_EDIT_OPEN_ALERT]: (state, payload) => Object.assign({}, state, {
    openedAlert: payload.opened
  }),
  [SCENELIST_RESET]: (state) => Object.assign({}, state, initialState)
});

export default combineReducers({
  main: sceneListReducer
});
