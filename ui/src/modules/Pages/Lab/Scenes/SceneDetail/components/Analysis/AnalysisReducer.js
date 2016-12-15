import { createReducer } from '../../../../../../../utils/Functions';

import {
  ANALYSIS_EDIT_OPEN_DIALOG_DELETE,
  ANALYSIS_EDIT_OPEN_DIALOG_MODIFY,
  ANALYSIS_EDIT_OPEN_DIALOG_CREATE,
  ANALYSIS_EDIT_OPEN_ALERT,
  ANALYSIS_EDIT_NAME_INPUT,
  ANALYSIS_EDIT_DESCRIPTION_INPUT,
  ANALYSIS_SELECT,
  ANALYSIS_EDIT_RESET,
  ANALYSIS_FULL_RESET,
  ANALYSIS_EDIT_SET_EDITED,
  ANALYSIS_EDIT_CAN_SUBMIT,
  VIDEO_TIME_CHANGE,
  VIDEO_PLAYING,
  VIDEO_SLIDING,
  VIDEO_SLIDED,
  VIDEO_SELECT,
  VIDEO_FRAME_CHANGE,
  VIDEO_INIT,
  VIDEO_EDIT_OPEN_DIALOG_DELETE,
  VIDEO_EDIT_OPEN_DIALOG_MODIFY,
  VIDEO_EDIT_OPEN_DIALOG_CREATE,
  VIDEO_EDIT_OPEN_SNACKBAR,
  VIDEO_EDIT_NAME_INPUT,
  VIDEO_EDIT_DESCRIPTION_INPUT,
  VIDEO_EDIT_CATEGORY_INPUT,
  VIDEO_EDIT_PROCESS_INPUT,
  VIDEO_EDIT_RESET,
  VIDEO_EDIT_CAN_SUBMIT,
  VIDEO_EDIT_SET_EDITED,
  VIDEO_PROCESS_SET_STAGE
} from './AnalysisActions';

const initialState = {
  analysisNameInput: '',
  analysisDescriptionInput: '',
  analysisOpenedCreateDialog: false,
  analysisOpenedDeleteDialog: false,
  analysisOpenedModifyDialog: false,
  analysisOpenedAlert: false,
  analysisSelected: null,
  analysisEdited: null,
  analysisCanSubmit: false,
  videoCurrentTime: 0,
  videoPlaying: false,
  videoSliding: false,
  videoSlided: false,
  videoSelected: null,
  videoInit: true,
  videoNameInput: '',
  videoCategoryInput: '',
  videoDescriptionInput: '',
  videoProcessInput: '',
  videoOpenedCreateDialog: false,
  videoOpenedDeleteDialog: false,
  videoOpenedModifyDialog: false,
  videoOpenedSnackBar: false,
  videoEdited: null,
  videoCanSubmit: false,
  videoProcessStage: ''
};

export default createReducer(initialState, {
  [ANALYSIS_FULL_RESET]: (state) => Object.assign({}, state, initialState),
  [ANALYSIS_EDIT_OPEN_DIALOG_DELETE]: (state, payload) => Object.assign({}, state, {
    analysisOpenedDeleteDialog: payload.opened
  }),
  [ANALYSIS_EDIT_OPEN_DIALOG_MODIFY]: (state, payload) => Object.assign({}, state, {
    analysisOpenedModifyDialog: payload.opened
  }),
  [ANALYSIS_EDIT_OPEN_DIALOG_CREATE]: (state, payload) => Object.assign({}, state, {
    analysisOpenedCreateDialog: payload.opened
  }),
  [ANALYSIS_EDIT_OPEN_ALERT]: (state, payload) => Object.assign({}, state, {
    analysisOpenedAlert: payload.opened
  }),
  [ANALYSIS_EDIT_NAME_INPUT]: (state, payload) => Object.assign({}, state, {
    analysisNameInput: payload.input
  }),
  [ANALYSIS_EDIT_DESCRIPTION_INPUT]: (state, payload) => Object.assign({}, state, {
    analysisDescriptionInput: payload.input
  }),
  [ANALYSIS_EDIT_RESET]: (state, payload) => Object.assign({}, state, {
    analysisNameInput: '',
    analysisDescriptionInput: '',
    videoCategoryInput: '',
    analysisOpenedCreateDialog: false,
    analysisOpenedDeleteDialog: false,
    analysisOpenedModifyDialog: false,
    analysisOpenedAlert: false,
    analysisEdited: null,
    analysisCanSubmit: false
  }),
  [ANALYSIS_EDIT_CAN_SUBMIT]: (state, payload) => Object.assign({}, state, {
    analysisCanSubmit: payload.valid
  }),
  [ANALYSIS_SELECT]: (state, payload) => Object.assign({}, state, {
    analysisSelected: payload.selectedItem
  }),
  [ANALYSIS_EDIT_SET_EDITED]: (state, payload) => Object.assign({}, state, {
    analysisEdited: payload.analysis
  }),
  [VIDEO_TIME_CHANGE]: (state, payload) => Object.assign({}, state, {
    videoCurrentTime: payload.currentTime
  }),
  [VIDEO_PLAYING]: (state, payload) => Object.assign({}, state, {
    videoPlaying: payload.playing
  }),
  [VIDEO_SLIDING]: (state, payload) => Object.assign({}, state, {
    videoSliding: payload.sliding
  }),
  [VIDEO_SLIDED]: (state, payload) => Object.assign({}, state, {
    videoSlided: payload.slided
  }),
  [VIDEO_SELECT]: (state, payload) => Object.assign({}, state, {
    videoSelected: payload.selectedItem
  }),
  [VIDEO_INIT]: (state, payload) => Object.assign({}, state, {
    videoInit: payload.init
  }),
  [VIDEO_FRAME_CHANGE]: (state, payload) => Object.assign({}, state, {
    videoCurrentTime: Math.min(
        Math.max(state.videoCurrentTime + (payload.forward ? 1 : -1) * payload.ratio, 0), 1)
  }),
  [VIDEO_EDIT_OPEN_DIALOG_DELETE]: (state, payload) => Object.assign({}, state, {
    videoOpenedDeleteDialog: payload.opened
  }),
  [VIDEO_EDIT_OPEN_DIALOG_MODIFY]: (state, payload) => Object.assign({}, state, {
    videoOpenedModifyDialog: payload.opened
  }),
  [VIDEO_EDIT_OPEN_DIALOG_CREATE]: (state, payload) => Object.assign({}, state, {
    videoOpenedCreateDialog: payload.opened
  }),
  [VIDEO_EDIT_OPEN_SNACKBAR]: (state, payload) => Object.assign({}, state, {
    videoOpenedSnackBar: payload.opened
  }),
  [VIDEO_EDIT_NAME_INPUT]: (state, payload) => Object.assign({}, state, {
    videoNameInput: payload.input
  }),
  [VIDEO_EDIT_DESCRIPTION_INPUT]: (state, payload) => Object.assign({}, state, {
    videoDescriptionInput: payload.input
  }),
  [VIDEO_EDIT_CATEGORY_INPUT]: (state, payload) => Object.assign({}, state, {
    videoCategoryInput: payload.input
  }),
  [VIDEO_EDIT_PROCESS_INPUT]: (state, payload) => Object.assign({}, state, {
    videoProcessInput: payload.input
  }),
  [VIDEO_EDIT_CAN_SUBMIT]: (state, payload) => Object.assign({}, state, {
    videoCanSubmit: payload.valid
  }),
  [VIDEO_EDIT_SET_EDITED]: (state, payload) => Object.assign({}, state, {
    videoEdited: payload.video
  }),
  [VIDEO_EDIT_RESET]: (state, payload) => Object.assign({}, state, {
    videoNameInput: '',
    videoDescriptionInput: '',
    videoProcessInput: '',
    videoOpenedCreateDialog: false,
    videoOpenedDeleteDialog: false,
    videoOpenedModifyDialog: false,
    videoEdited: null,
    videoCanSubmit: false
  }),
  [VIDEO_PROCESS_SET_STAGE]: (state, payload) => Object.assign({}, state, {
    videoProcessStage: payload.stage,
  }),
});

