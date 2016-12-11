import _ from 'underscore';
import { createReducer } from '../../../../../../../utils/Functions';
import { scopethisPink } from '../../../../../../../styles/MuiTheme';

import {
  TOOLBAR_DOCK,
  TOOLBAR_SELECT,
  SCENE_EDIT_NAME,
  SCENE_EDIT_DESCRIPTION,
  FILTER_SELECT,
  FILTER_PARAM_INPUT,
  TAG_SELECT,
  TAG_NAME_INPUT,
  SELECTION_SELECT,
  SELECTION_NAME_INPUT,
  TRACKER_SELECT,
  TRACKER_PARAM_INPUT,
  SKETCHPAD_ADD_ITEM,
  SKETCHPAD_LOAD_ITEMS,
  SKETCHPAD_DISPLAY,
  WINDOW_SET_COLOR,
  WINDOW_SET_TOOL,
  WINDOW_SET_MODE,
  WINDOW_TRANSFORM_ITEM,
  WINDOW_REMOVE_ITEM,
  WINDOW_DRAG_ITEM,
  WINDOW_CLEAR_ALL,
  WINDOW_DOWNLOAD_FAILURE,
  WINDOW_DOWNLOAD_REQUEST,
  WINDOW_DOWNLOAD_SUCCESS,
  TOOLS_RESET_STATE,
  PROCESS_WAITING
} from './ToolsActions';

const initialState = {
  toolBarDocked: false,
  toolBarSelection: null,
  sceneNameInput: '',
  sceneDescriptionInput: '',
  filterSelected: null,
  filterParamInput: '',
  trackerSelected: null,
  trackerParamInput: '',
  windowTool: 'rectangle',
  windowSize: 2,
  windowColor: scopethisPink,
  windowFill: false,
  windowFillColor: '#444444',
  windowMode: null,
  windowIsDownloading: false,
  tagInput: '',
  tagSelected: null,
  selectionInput: '',
  selectionSelected: null,
  sketchpadItems: [],
  sketchpadDraggedItemId: null,
  sketchpadAddedItemId: null,
  sketchpadIsTransforming: false,
  sketchpadVisible: false,
  processProcessing: false
};

export default createReducer(initialState, {
  [TOOLBAR_DOCK]: (state, payload) => Object.assign({}, state, {
    toolBarDocked: payload.docked
  }),
  [TOOLBAR_SELECT]: (state, payload) => Object.assign({}, state, {
    toolBarSelection: payload.value
  }),
  [SCENE_EDIT_NAME]: (state, payload) => Object.assign({}, state, {
    sceneNameInput: payload.name
  }),
  [SCENE_EDIT_DESCRIPTION]: (state, payload) => Object.assign({}, state, {
    sceneDescriptionInput: payload.description
  }),
  [FILTER_SELECT]: (state, payload) => Object.assign({}, state, {
    filterSelected: payload.selectedItem
  }),
  [FILTER_PARAM_INPUT]: (state, payload) => Object.assign({}, state, {
    filterParamInput: payload.input
  }),
  [WINDOW_DOWNLOAD_REQUEST]: (state) => Object.assign({}, state, {
    windowIsDownloading: true
  }),
  [WINDOW_DOWNLOAD_SUCCESS]: (state) => Object.assign({}, state, {
    windowIsDownloading: false
  }),
  [WINDOW_DOWNLOAD_FAILURE]: (state) => Object.assign({}, state, {
    windowIsDownloading: false
  }),
  [TRACKER_SELECT]: (state, payload) => Object.assign({}, state, {
    trackerSelected: payload.selectedItem
  }),
  [TRACKER_PARAM_INPUT]: (state, payload) => Object.assign({}, state, {
    trackerParamInput: payload.input
  }),
  [SKETCHPAD_ADD_ITEM]: (state, payload) => Object.assign({}, state, {
    sketchpadItems: payload.item ?
        state.sketchpadItems.concat([payload.item]) : state.sketchpadItems,
    sketchpadAddedItemId: payload.item ? payload.item.itemId : null
  }),
  [SKETCHPAD_LOAD_ITEMS]: (state, payload) => Object.assign({}, state, {
    sketchpadItems: payload.items
  }),
  [SKETCHPAD_DISPLAY]: (state, payload) => Object.assign({}, state, {
    sketchpadVisible: payload.visible
  }),
  [WINDOW_SET_COLOR]: (state, payload) => Object.assign({}, state, {
    windowColor: payload.color
  }),
  [WINDOW_SET_TOOL]: (state, payload) => Object.assign({}, state, {
    windowTool: payload.tool
  }),
  [WINDOW_SET_MODE]: (state, payload) => Object.assign({}, state, {
    windowMode: payload.mode
  }),
  [WINDOW_TRANSFORM_ITEM]: (state, payload) => {
    let newItems = state.sketchpadItems;
    const transformation = payload.transformation;
    if (transformation) {
      const { itemId, x, y, width, height } = transformation;
      const transformedItem = _.find(state.sketchpadItems, (item) => item.itemId === itemId);
      switch (state.windowMode) {
        case 'transform':
          transformedItem.x = x;
          transformedItem.y = y;
          break;
        case 'add':
          transformedItem.width = width;
          transformedItem.height = height;
          break;
        default:
      }
      newItems = _.without(newItems, _.findWhere(newItems, { itemId }));
      newItems.push(transformedItem);
    }
    return Object.assign({}, state, {
      sketchpadIsTransforming: !_.isEmpty(transformation),
      sketchpadItems: newItems
    });
  },
  [WINDOW_REMOVE_ITEM]: (state, payload) => Object.assign({}, state, {
    sketchpadItems: _.without(state.sketchpadItems,
        _.findWhere(state.sketchpadItems, { key: payload.itemId }))
  }),
  [WINDOW_DRAG_ITEM]: (state, payload) => Object.assign({}, state, {
    sketchpadDraggedItemId: payload.draggedItemId
  }),
  [WINDOW_CLEAR_ALL]: (state) => Object.assign({}, state, initialState),
  [TAG_NAME_INPUT]: (state, payload) => Object.assign({}, state, {
    tagInput: payload.input
  }),
  [TAG_SELECT]: (state, payload) => Object.assign({}, state, {
    tagSelected: payload.selectedItem
  }),
  [SELECTION_NAME_INPUT]: (state, payload) => Object.assign({}, state, {
    selectionInput: payload.input
  }),
  [SELECTION_SELECT]: (state, payload) => Object.assign({}, state, {
    selectionSelected: payload.selectedItem
  }),
  [TOOLS_RESET_STATE]: (state) => Object.assign({}, state, initialState),
  [PROCESS_WAITING]: (state, payload) => Object.assign({}, state, {
    processProcessing: payload.isProcessing
  })
});
