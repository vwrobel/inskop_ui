import { FILE_TRANSFER_API } from '../../../../../middlewares/fileTransferApi';

export const SCENE_EDIT_NAME_INPUT = 'SCENE_EDIT_NAME_INPUT';
export const SCENE_EDIT_DESCRIPTION_INPUT = 'SCENE_EDIT_DESCRIPTION_INPUT';
export const SCENE_EDIT_STATUS_INPUT = 'SCENE_EDIT_STATUS_INPUT';
export const SCENE_EDIT_LOCK_INPUT = 'SCENE_EDIT_STATUS_INPUT';
export const SCENE_EDIT_FILEDROP = 'SCENE_EDIT_FILEDROP';
export const SCENE_EDIT_OPEN_DIALOG_CREATE = 'SCENE_EDIT_OPEN_DIALOG_CREATE';
export const SCENE_EDIT_OPEN_DIALOG_MODIFY = 'SCENE_EDIT_OPEN_DIALOG_MODIFY';
export const SCENE_EDIT_OPEN_DIALOG_DELETE = 'SCENE_EDIT_OPEN_DIALOG_DELETE';
export const SCENE_EDIT_OPEN_ALERT = 'SCENE_EDIT_OPEN_ALERT';
export const SCENE_EDIT_SET_EDITED = 'SCENE_EDIT_SET_EDITED';
export const SCENE_EDIT_RESET = 'SCENE_EDIT_RESET';
export const SCENE_EDIT_CAN_SUBMIT = 'SCENE_EDIT_CAN_SUBMIT';

export const SCENE_CARD_SHOW_DESCRITION = 'SCENE_CARD_SHOW_DESCRITION';

export const SCENEADD_UPLOAD_REQUEST = 'SCENEADD_UPLOAD_REQUEST';
export const SCENEADD_UPLOAD_SUCCESS = 'SCENEADD_UPLOAD_SUCCESS';
export const SCENEADD_UPLOAD_FAILURE = 'SCENEADD_UPLOAD_FAILURE';

export const SCENELIST_RESET = 'SCENELIST_RESET';


export const sceneAddUpload = (authenticated, token, title, video) => ({
  [FILE_TRANSFER_API]: {
    types: [SCENEADD_UPLOAD_REQUEST, SCENEADD_UPLOAD_SUCCESS, SCENEADD_UPLOAD_FAILURE],
    payload: {
      endpoint: `file_transfer/upload/scenes/${title}`,
      body: video,
      contentType: 'multipart/form-data',
      method: 'put',
      authenticated,
      token
    }
  }
});

export const sceneEditNameInput = (input) => ({
  type: SCENE_EDIT_NAME_INPUT,
  payload: {
    input
  }
});

export const sceneEditDescriptionInput = (input) => ({
  type: SCENE_EDIT_DESCRIPTION_INPUT,
  payload: {
    input
  }
});

export const sceneEditStatusInput = (input) => ({
  type: SCENE_EDIT_STATUS_INPUT,
  payload: {
    input
  }
});

export const sceneEditLockInput = (input) => ({
  type: SCENE_EDIT_LOCK_INPUT,
  payload: {
    input
  }
});

export const sceneEditFileDrop = (droppedFile) => ({
  type: SCENE_EDIT_FILEDROP,
  payload: {
    droppedFile
  }
});

export const sceneEditReset = () => ({
  type: SCENE_EDIT_RESET,
  payload: {}
});

export const sceneEditOpenDialogCreate = (opened) => ({
  type: SCENE_EDIT_OPEN_DIALOG_CREATE,
  payload: { opened }
});

export const sceneEditOpenDialogModify = (opened) => ({
  type: SCENE_EDIT_OPEN_DIALOG_MODIFY,
  payload: { opened }
});

export const sceneEditOpenDialogDelete = (opened) => ({
  type: SCENE_EDIT_OPEN_DIALOG_DELETE,
  payload: { opened }
});

export const sceneEditOpenAlert = (opened) => ({
  type: SCENE_EDIT_OPEN_ALERT,
  payload: { opened }
});

export const sceneEditSetEdited = (scene) => ({
  type: SCENE_EDIT_SET_EDITED,
  payload: { scene }
});

export const sceneCardShowDescription = (sceneId) => ({
  type: SCENE_CARD_SHOW_DESCRITION,
  payload: { sceneId }
});

export const sceneListReset = () => ({
  type: SCENELIST_RESET,
  payload: {}
});

export const sceneEditCanSubmit = (valid) => ({
  type: SCENE_EDIT_CAN_SUBMIT,
  payload: { valid }
});
