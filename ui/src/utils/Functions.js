export const createReducer = (initialState, reducerMap) => (state = initialState, action) => {
  const reducer = reducerMap[action.type];

  return reducer
    ? reducer(state, action.payload)
    : state;
};

export const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
