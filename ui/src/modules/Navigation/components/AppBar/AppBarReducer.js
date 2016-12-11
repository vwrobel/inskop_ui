import { createReducer } from '../../../../utils/Functions';

import { APPBAR_USERMENU_OPEN, APPBAR_USERMENU_ANCHOR } from './AppBarActions';

const initialState = {
  userMenuOpen: false,
  userMenuAnchor: null
};

export default createReducer(initialState, {
  [APPBAR_USERMENU_OPEN]: (state, payload) => Object.assign({}, state, {
    userMenuOpen: payload.open
  }),
  [APPBAR_USERMENU_ANCHOR]: (state, payload) => Object.assign({}, state, {
    userMenuAnchor: payload.anchor
  })
});

