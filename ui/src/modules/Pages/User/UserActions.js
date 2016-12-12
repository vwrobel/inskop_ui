export const USER_BIO_IS_EDITING = 'USER_BIO_IS_EDITING';
export const USER_BIO_INPUT = 'USER_BIO_INPUT';
export const USER_RESET = 'USER_RESET';

export const userBioIsEditing = (isEditing) => ({
  type: USER_BIO_IS_EDITING,
  payload: {
    isEditing
  }
});

export const userBioInput = (input) => ({
  type: USER_BIO_INPUT,
  payload: {
    input
  }
});

export const userReset = () => ({
  type: USER_RESET,
  payload: {
  }
});
