export const ANALYSIS_EDIT_NAME_INPUT = 'ANALYSIS_EDIT_NAME_INPUT';
export const ANALYSIS_EDIT_DESCRIPTION_INPUT = 'ANALYSIS_EDIT_DESCRIPTION_INPUT';
export const ANALYSIS_EDIT_OPEN_DIALOG_CREATE = 'ANALYSIS_EDIT_OPEN_DIALOG_CREATE';
export const ANALYSIS_EDIT_OPEN_DIALOG_MODIFY = 'ANALYSIS_EDIT_OPEN_DIALOG_MODIFY';
export const ANALYSIS_EDIT_OPEN_DIALOG_DELETE = 'ANALYSIS_EDIT_OPEN_DIALOG_DELETE';
export const ANALYSIS_EDIT_OPEN_ALERT = 'ANALYSIS_EDIT_OPEN_ALERT';
export const ANALYSIS_SELECT = 'ANALYSIS_SELECT';
export const ANALYSIS_EDIT_RESET = 'ANALYSIS_EDIT_RESET';
export const ANALYSIS_EDIT_CAN_SUBMIT = 'ANALYSIS_EDIT_CAN_SUBMIT';
export const ANALYSIS_FULL_RESET = 'ANALYSIS_FULL_RESET';
export const ANALYSIS_EDIT_SET_EDITED = 'ANALYSIS_EDIT_SET_EDITED';

export const VIDEO_TIME_CHANGE = 'VIDEO_TIME_CHANGE';
export const VIDEO_PLAYING = 'VIDEO_PLAYING';
export const VIDEO_SLIDING = 'VIDEO_SLIDING';
export const VIDEO_SLIDED = 'VIDEO_SLIDED';
export const VIDEO_SELECT = 'VIDEO_SELECT';
export const VIDEO_FRAME_CHANGE = 'VIDEO_FRAME_CHANGE';
export const VIDEO_INIT = 'VIDEO_INIT';
export const VIDEO_EDIT_RESET = 'VIDEO_EDIT_RESET';
export const VIDEO_EDIT_CAN_SUBMIT = 'VIDEO_EDIT_CAN_SUBMIT';
export const VIDEO_EDIT_NAME_INPUT = 'VIDEO_EDIT_NAME_INPUT';
export const VIDEO_EDIT_DESCRIPTION_INPUT = 'VIDEO_EDIT_DESCRIPTION_INPUT';
export const VIDEO_EDIT_CATEGORY_INPUT = 'VIDEO_EDIT_CATEGORY_INPUT';
export const VIDEO_EDIT_PROCESS_INPUT = 'VIDEO_EDIT_PROCESS_INPUT';
export const VIDEO_EDIT_OPEN_DIALOG_CREATE = 'VIDEO_EDIT_OPEN_DIALOG_CREATE';
export const VIDEO_EDIT_OPEN_DIALOG_MODIFY = 'VIDEO_EDIT_OPEN_DIALOG_MODIFY';
export const VIDEO_EDIT_OPEN_DIALOG_DELETE = 'VIDEO_EDIT_OPEN_DIALOG_DELETE';
export const VIDEO_EDIT_OPEN_SNACKBAR = 'VIDEO_EDIT_OPEN_SNACKBAR';
export const VIDEO_EDIT_SET_EDITED = 'VIDEO_EDIT_SET_EDITED';

export const analysisEditNameInput = (input) => ({
  type: ANALYSIS_EDIT_NAME_INPUT,
  payload: {
    input
  }
});

export const analysisEditDescriptionInput = (input) => ({
  type: ANALYSIS_EDIT_DESCRIPTION_INPUT,
  payload: {
    input
  }
});

export const analysisEditCanSubmit = (valid) => ({
  type: ANALYSIS_EDIT_CAN_SUBMIT,
  payload: {
    valid
  }
});

export const analysisEditOpenDialogCreate = (opened) => ({
  type: ANALYSIS_EDIT_OPEN_DIALOG_CREATE,
  payload: {
    opened
  }
});

export const analysisEditOpenDialogModify = (opened) => ({
  type: ANALYSIS_EDIT_OPEN_DIALOG_MODIFY,
  payload: {
    opened
  }
});

export const analysisEditOpenDialogDelete = (opened) => ({
  type: ANALYSIS_EDIT_OPEN_DIALOG_DELETE,
  payload: {
    opened
  }
});

export const analysisEditOpenAlert = (opened) => ({
  type: ANALYSIS_EDIT_OPEN_ALERT,
  payload: {
    opened
  }
});

export const analysisSelect = (selectedItem) => ({
  type: ANALYSIS_SELECT,
  payload: {
    selectedItem
  }
});

export const videoTimeChange = (currentTime) => ({
  type: VIDEO_TIME_CHANGE,
  payload: {
    currentTime
  }
});

export const videoSlidingSet = (sliding) => ({
  type: VIDEO_SLIDING,
  payload: {
    sliding
  }
});

export const videoSlidedSet = (slided) => ({
  type: VIDEO_SLIDED,
  payload: {
    slided
  }
});

export const videoPlayingSet = (playing) => ({
  type: VIDEO_PLAYING,
  payload: {
    playing
  }
});

export const videoSelect = (selectedItem) => ({
  type: VIDEO_SELECT,
  payload: {
    selectedItem
  }
});

export const videoFrameChange = (forward, ratio) => ({
  type: VIDEO_FRAME_CHANGE,
  payload: {
    ratio,
    forward
  }
});

export const videoInitLaunch = (init) => ({
  type: VIDEO_INIT,
  payload: {
    init
  }
});

export const analysisEditReset = () => ({
  type: ANALYSIS_EDIT_RESET,
  payload: {
  }
});

export const analysisFullReset = () => ({
  type: ANALYSIS_FULL_RESET,
  payload: {
  }
});

export const analysisEditSetEdited = (analysis) => ({
  type: ANALYSIS_EDIT_SET_EDITED,
  payload: {
    analysis
  }
});

export const videoEditNameInput = (input) => ({
  type: VIDEO_EDIT_NAME_INPUT,
  payload: {
    input
  }
});

export const videoEditProcessInput = (input) => ({
  type: VIDEO_EDIT_PROCESS_INPUT,
  payload: {
    input
  }
});

export const videoEditDescriptionInput = (input) => ({
  type: VIDEO_EDIT_DESCRIPTION_INPUT,
  payload: {
    input
  }
});

export const videoEditCategoryInput = (input) => ({
  type: VIDEO_EDIT_DESCRIPTION_INPUT,
  payload: {
    input
  }
});

export const videoEditCanSubmit = (valid) => ({
  type: VIDEO_EDIT_CAN_SUBMIT,
  payload: {
    valid
  }
});

export const videoEditOpenDialogCreate = (opened) => ({
  type: VIDEO_EDIT_OPEN_DIALOG_CREATE,
  payload: {
    opened
  }
});

export const videoEditOpenDialogModify = (opened) => ({
  type: VIDEO_EDIT_OPEN_DIALOG_MODIFY,
  payload: {
    opened
  }
});

export const videoEditOpenDialogDelete = (opened) => ({
  type: VIDEO_EDIT_OPEN_DIALOG_DELETE,
  payload: {
    opened
  }
});

export const videoEditOpenSnackBar = (opened) => ({
  type: VIDEO_EDIT_OPEN_SNACKBAR,
  payload: {
    opened
  }
});

export const videoEditReset = () => ({
  type: VIDEO_EDIT_RESET,
  payload: {
  }
});

export const videoEditSetEdited = (video) => ({
  type: VIDEO_EDIT_SET_EDITED,
  payload: {
    video
  }
});
