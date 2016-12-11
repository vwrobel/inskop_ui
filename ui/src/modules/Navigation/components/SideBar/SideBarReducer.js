import { createReducer } from '../../../../utils/Functions';

import { SIDEBAR_DOCK, SIDEBAR_SELECT } from './SideBarActions';

const initialState = {
  sideBarDocked: false,
  sideBarSelection: null
};

export default createReducer(initialState, {
  [SIDEBAR_DOCK]: (state, payload) => Object.assign({}, state, {
    sideBarDocked: payload.sideBarDocked
  }),
  [SIDEBAR_SELECT]: (state, payload) => Object.assign({}, state, {
    sideBarSelection: payload.sideBarSelection
  })
});

