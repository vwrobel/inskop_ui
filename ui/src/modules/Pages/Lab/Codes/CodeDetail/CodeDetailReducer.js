import { createReducer } from '../../../../../utils/Functions';

import {
  CODE_DETAIL_CODE_INPUT,
  CODE_DETAIL_README_INPUT,
  CODE_DETAIL_EDITING,
  CODE_DETAIL_RESET
} from './CodeDetailActions';

const initialState = {
  codeInput: '',
  readMeInput: '',
  isEditing: false
};

const codeDetailReducer = createReducer(initialState, {
  [CODE_DETAIL_CODE_INPUT]: (state, payload) => Object.assign({}, state, {
    codeInput: payload.input
  }),
  [CODE_DETAIL_README_INPUT]: (state, payload) => Object.assign({}, state, {
    readMeInput: payload.input
  }),
  [CODE_DETAIL_EDITING]: (state, payload) => Object.assign({}, state, {
    isEditing: payload.isEditing
  }),
  [CODE_DETAIL_RESET]: (state) => Object.assign({}, state, initialState)
});

export default codeDetailReducer;
