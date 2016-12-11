import { renderToString } from 'react-dom/server';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ApolloProvider } from 'react-apollo';
import { StyleSheetServer } from 'aphrodite';
import React from 'react';
import cookie from 'react-cookie';
import fs from 'fs';
import path from 'path';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Store from '../store/store';
import wrap from './wrap';
import renderIndex from './renderIndex';
import MuiTheme from '../styles/MuiTheme';
import { logInSuccess } from '../modules/Auth/AuthActions';
import routes from '../app/routes';
import ApolloClientSingleton from '../network/apollo-client-singleton';

export default wrap(async(req, res) => {
  const memoryHistory = createMemoryHistory(req.url);
  const store = new Store(memoryHistory);
  const history = syncHistoryWithStore(memoryHistory, store.data);
  const assetMap = JSON.parse(
    fs.readFileSync(
      path.resolve(process.env.PUBLIC_DIR, 'assets', process.env.ASSETS_MAP_FILE)
    )
  );
  const muiTheme = getMuiTheme(MuiTheme, { userAgent: req.headers['user-agent'] });
  global.navigator = {
    userAgent: req.headers['user-agent']
  };

  cookie.plugToRequest(req, res);
  if (req.cookies.profile) {
    const idToken = req.cookies.idToken;
    const profile = req.cookies.profile;
    store.data.dispatch(logInSuccess(JSON.parse(profile), idToken));
  }

  match({
    history,
    routes: routes(store.data),
    location: req.url
  }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const { html, css } = StyleSheetServer.renderStatic(() => renderToString(
        <MuiThemeProvider muiTheme={muiTheme}>
          <ApolloProvider store={store.data} client={ApolloClientSingleton}>
            <RouterContext {...renderProps} />
          </ApolloProvider>
        </MuiThemeProvider>
        )
      );
      res.send(renderIndex(html, css, assetMap, store.data));
    } else {
      res.status(404).send('Not found');
    }
  });
});

