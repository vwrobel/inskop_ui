const transformObjectValues = (obj, fn) => {
  const transformed = {};
  Object.keys(obj).forEach((key) => {
    transformed[key] = fn(obj[key]);
  });
  return transformed;
};

const bindActionCreator = (actionCreator, collectionIndex, cardIndex) =>
  (...args) => (
      Object.assign(actionCreator(...args), { collectionIndex, cardIndex })
    );

const bindActionCreatorMap = (creators, collectionIndex, cardIndex) =>
  transformObjectValues(creators, (actionCreator) => bindActionCreator(actionCreator, collectionIndex, cardIndex));

const bindIndexToActionCreators = (actionCreators, collectionIndex, cardIndex) => typeof actionCreators === 'function'
    ? bindActionCreator(actionCreators, collectionIndex, cardIndex)
    : bindActionCreatorMap(actionCreators, collectionIndex, cardIndex);

export default bindIndexToActionCreators;

