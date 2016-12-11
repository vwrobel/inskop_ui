import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import ReduxThunk from 'redux-thunk';
import ApolloClientSingleton from '../network/apollo-client-singleton';
import fileTransferApi from '../middlewares/fileTransferApi';

import reducer from './reducers';

export default class Store {
  constructor(history, initialState = {}) {
    this.data = createStore(
      reducer,
      initialState,
      compose(
        applyMiddleware(
          fileTransferApi,
          ReduxThunk.withExtraArgument(ApolloClientSingleton),
          routerMiddleware(history),
          ApolloClientSingleton.middleware()
        ),
        typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
          ? window.devToolsExtension() : (f) => f
      )
    );
  }
}
