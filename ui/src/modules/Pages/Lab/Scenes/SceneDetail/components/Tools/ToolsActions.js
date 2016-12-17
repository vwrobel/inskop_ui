import { push } from 'react-router-redux';
import { FILE_TRANSFER_API } from '../../../../../../../middlewares/fileTransferApi';

export const TOOLBAR_DOCK = 'TOOLBAR_DOCK';
export const TOOLBAR_SELECT = 'TOOLBAR_SELECT';
export const SCENE_EDIT_NAME = 'SCENE_EDIT_NAME';
export const SCENE_EDIT_DESCRIPTION = 'SCENE_EDIT_DESCRIPTION';
export const FILTER_SELECT = 'FILTER_SELECT';
export const FILTER_PARAM_INPUT = 'FILTER_PARAM_INPUT';
export const TAG_NAME_INPUT = 'TAG_NAME_INPUT';
export const TAG_SELECT = 'TAG_SELECT';
export const SELECTION_NAME_INPUT = 'SELECTION_NAME_INPUT';
export const SELECTION_SELECT = 'SELECTION_SELECT';
export const TRACKER_SELECT = 'TRACKER_SELECT';
export const TRACKER_PARAM_INPUT = 'TRACKER_PARAM_INPUT';
export const SKETCHPAD_ADD_ITEM = 'SKETCHPAD_ADD_ITEM';
export const SKETCHPAD_LOAD_ITEMS = 'SKETCHPAD_LOAD_ITEMS';
export const SKETCHPAD_DISPLAY = 'SKETCHPAD_DISPLAY';
export const WINDOW_SET_COLOR = 'WINDOW_SET_COLOR';
export const WINDOW_SET_TOOL = 'WINDOW_SET_TOOL';
export const WINDOW_SET_MODE = 'WINDOW_SET_MODE';
export const WINDOW_ERASE = 'WINDOW_ERASE';
export const WINDOW_TRANSFORM_ITEM = 'WINDOW_TRANSFORM_ITEM';
export const WINDOW_REMOVE_ITEM = 'WINDOW_REMOVE_ITEM';
export const WINDOW_DRAG_ITEM = 'WINDOW_DRAG_ITEM';
export const WINDOW_CLEAR_ALL = 'WINDOW_CLEAR_ALL';
export const WINDOW_DOWNLOAD_REQUEST = 'WINDOW_DOWNLOAD_REQUEST';
export const WINDOW_DOWNLOAD_SUCCESS = 'WINDOW_DOWNLOAD_SUCCESS';
export const WINDOW_DOWNLOAD_FAILURE = 'WINDOW_DOWNLOAD_FAILURE';
export const TOOLS_RESET_STATE = 'TOOLS_RESET_STATE';
export const PROCESS_WAITING = 'PROCESS_WAITING';

export const sketchpadAddItem = (item) => ({
  type: SKETCHPAD_ADD_ITEM,
  payload: {
    item
  }
});

export const sketchpadLoadItems = (items) => ({
  type: SKETCHPAD_LOAD_ITEMS,
  payload: {
    items
  }
});

export const sketchpadDisplay = (visible) => ({
  type: SKETCHPAD_DISPLAY,
  payload: {
    visible
  }
});

export const windowSetColor = (color) => ({
  type: WINDOW_SET_COLOR,
  payload: {
    color
  }
});

export const windowSetMode = (mode) => ({
  type: WINDOW_SET_MODE,
  payload: {
    mode
  }
});

export const windowTransformItem = (transformation) => ({
  type: WINDOW_TRANSFORM_ITEM,
  payload: {
    transformation
  }
});

export const windowDragItem = (draggedItemId) => ({
  type: WINDOW_DRAG_ITEM,
  payload: {
    draggedItemId
  }
});

export const windowErase = () => ({
  type: WINDOW_ERASE,
  payload: {
  }
});

export const tagNameInputSet = (input) => ({
  type: TAG_NAME_INPUT,
  payload: {
    input
  }
});

export const tagSelect = (selectedItem) => ({
  type: TAG_SELECT,
  payload: {
    selectedItem
  }
});

export const selectionNameInputSet = (input) => ({
  type: SELECTION_NAME_INPUT,
  payload: {
    input
  }
});

export const selectionSelect = (selectedItem) => ({
  type: SELECTION_SELECT,
  payload: {
    selectedItem
  }
});

export const toolBarDock = (docked) => ({
  type: TOOLBAR_DOCK,
  payload: {
    docked
  }
});

export const toolBarSelect = (value) => ({
  type: TOOLBAR_SELECT,
  payload: {
    value
  }
});

export const sceneEditName = (name) => ({
  type: SCENE_EDIT_NAME,
  payload: {
    name
  }
});

export const sceneEditDescription = (description) => ({
  type: SCENE_EDIT_DESCRIPTION,
  payload: {
    description
  }
});

export const filterParamInputSet = (input) => ({
  type: FILTER_PARAM_INPUT,
  payload: {
    input
  }
});

export const filterSelect = (selectedItem) => ({
  type: FILTER_SELECT,
  payload: {
    selectedItem
  }
});

export const toolsResetState = () => ({
  type: TOOLS_RESET_STATE,
  payload: {
  }
});

export const trackerSelect = (selectedItem) => ({
  type: TRACKER_SELECT,
  payload: {
    selectedItem
  }
});

export const trackerParamInputSet = (input) => ({
  type: TRACKER_PARAM_INPUT,
  payload: {
    input
  }
});

export const processWaiting = (isProcessing) => ({
  type: PROCESS_WAITING,
  payload: {
    isProcessing
  }
});

export const toolBarActionSelect = (value, dispatch, scene, analysis, video) => {
  const currentSceneUrl = analysis ?
    `/lab/scenes/${scene.slug}/analyses/${analysis.slug}/videos/${video.slug}/tools` : `/lab/scenes/${scene.slug}`;
  switch (value) {
    case 'scenes':
      dispatch(push('/lab/scenes'));
      break;
    case 'codes':
      dispatch(push('/lab/codes'));
      break;
    case 'view-analysis':
      dispatch(push(`${currentSceneUrl}/view-analysis`));
      break;
    case 'comment':
      dispatch(push(`${currentSceneUrl}/comment`));
      break;
    case 'select':
      dispatch(push(`${currentSceneUrl}/select`));
      break;
    case 'table':
      dispatch(push(`${currentSceneUrl}/table`));
      break;
    default:
  }
  dispatch(toolBarSelect(value));
};

    export const windowsDownload = (authenticated, token) => ({
      [FILE_TRANSFER_API]: {
        types: [WINDOW_DOWNLOAD_REQUEST, WINDOW_DOWNLOAD_SUCCESS, WINDOW_DOWNLOAD_FAILURE],
        payload: {
          endpoint: 'file_transfer/download/windows',
          contentType: 'text/csv',
          method: 'get',
          body: null,
          authenticated,
          token
        }
      }
    });
