export const APPBAR_USERMENU_OPEN = 'APPBAR_USERMENU_OPEN';
export const APPBAR_USERMENU_ANCHOR = 'APPBAR_USERMENU_ANCHOR';

export const setUserMenuOpen = (open) => ({
  type: APPBAR_USERMENU_OPEN,
  payload: {
    open
  }
});

export const setUserMenuAnchor = (anchor) => ({
  type: APPBAR_USERMENU_ANCHOR,
  payload: {
    anchor
  }
});
