export const CODE_DETAIL_EDITING = 'CODE_DETAIL_EDITING';
export const CODE_DETAIL_CODE_INPUT = 'CODE_EDIT_CODE_INPUT';
export const CODE_DETAIL_README_INPUT = 'CODE_DETAIL_README_INPUT';
export const CODE_DETAIL_RESET = 'CODE_DETAIL_RESET';


export const codeDetailEditing = (isEditing) => ({
  type: CODE_DETAIL_EDITING,
  payload: { isEditing }
});

export const codeDetailCodeInput = (input) => ({
  type: CODE_DETAIL_CODE_INPUT,
  payload: { input }
});

export const codeDetailReadMeInput = (input) => ({
  type: CODE_DETAIL_README_INPUT,
  payload: { input }
});

export const codeDetailReset = () => ({
  type: CODE_DETAIL_RESET,
  payload: {}
});

