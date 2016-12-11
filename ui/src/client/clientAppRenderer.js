import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import routes from '../app/routes';
import ApolloClientSingleton from '../network/apollo-client-singleton';
import Store from '../store/store';
import MuiTheme from '../styles/MuiTheme';

const clientAppRenderer = () => {
  const store = new Store(browserHistory, window.INITIAL_STATE);
  const history = syncHistoryWithStore(browserHistory, store.data);
  return (
    <MuiThemeProvider muiTheme={getMuiTheme(MuiTheme)}>
      <ApolloProvider store={store.data} client={ApolloClientSingleton} key='provider'>
        <Router key={Math.random()} history={history} routes={routes(store.data)} />
      </ApolloProvider>
    </MuiThemeProvider>
  );
};

export default clientAppRenderer;
