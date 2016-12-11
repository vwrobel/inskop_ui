export const CODE_EDIT_NAME_INPUT = 'CODE_EDIT_NAME_INPUT';
export const CODE_EDIT_DESCRIPTION_INPUT = 'CODE_EDIT_DESCRIPTION_INPUT';
export const CODE_EDIT_CATEGORY_INPUT = 'CODE_EDIT_CATEGORY_INPUT';
export const CODE_EDIT_OPEN_DIALOG_CREATE = 'CODE_EDIT_OPEN_DIALOG_CREATE';
export const CODE_EDIT_OPEN_DIALOG_MODIFY = 'CODE_EDIT_OPEN_DIALOG_MODIFY';
export const CODE_EDIT_OPEN_DIALOG_DELETE = 'CODE_EDIT_OPEN_DIALOG_DELETE';
export const CODE_EDIT_OPEN_ALERT = 'CODE_EDIT_OPEN_ALERT';
export const CODE_EDIT_SET_EDITED = 'CODE_EDIT_SET_EDITED';
export const CODE_EDIT_RESET = 'CODE_EDIT_RESET';
export const CODELIST_RESET = 'CODELIST_RESET';

export const codeEditNameInput = (input) => ({
  type: CODE_EDIT_NAME_INPUT,
  payload: {
    input
  }
});

export const codeEditDescriptionInput = (input) => ({
  type: CODE_EDIT_DESCRIPTION_INPUT,
  payload: {
    input
  }
});

export const codeEditCategoryInput = (input) => ({
  type: CODE_EDIT_CATEGORY_INPUT,
  payload: {
    input
  }
});

export const codeEditReset = () => ({
  type: CODE_EDIT_RESET,
  payload: {}
});

export const codeEditOpenDialogCreate = (opened) => ({
  type: CODE_EDIT_OPEN_DIALOG_CREATE,
  payload: { opened }
});

export const codeEditOpenDialogModify = (opened) => ({
  type: CODE_EDIT_OPEN_DIALOG_MODIFY,
  payload: { opened }
});

export const codeEditOpenDialogDelete = (opened) => ({
  type: CODE_EDIT_OPEN_DIALOG_DELETE,
  payload: { opened }
});

export const codeEditOpenAlert = (opened) => ({
  type: CODE_EDIT_OPEN_ALERT,
  payload: { opened }
});

export const codeEditSetEdited = (code) => ({
  type: CODE_EDIT_SET_EDITED,
  payload: { code }
});

export const codeListReset = () => ({
  type: CODELIST_RESET,
  payload: {}
});

