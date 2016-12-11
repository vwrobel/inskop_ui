export const SIDEBAR_DOCK = 'SIDEBAR_DOCK';
export const SIDEBAR_SELECT = 'SIDEBAR_SELECT';


export const sideBarDock = (docked) => ({
  type: SIDEBAR_DOCK,
  payload: {
    sideBarDocked: docked
  }
});


export const sideBarSelect = (value) => ({
  type: SIDEBAR_SELECT,
  payload: {
    sideBarSelection: value
  }
});
