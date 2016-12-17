import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';
import App from './App';
import Auth from '../modules/Auth/AuthPage';
import NavWrapper from '../modules/Navigation/NavWrapper';
import Main from '../modules/Pages/Main';
import Home from '../modules/Pages/Home/Home';
import About from '../modules/Pages/About/About';
import CodeList from '../modules/Pages/Lab/Codes/CodeList/CodeList';
import CodeDetail from '../modules/Pages/Lab/Codes/CodeDetail/CodeDetail';
import SceneList from '../modules/Pages/Lab/Scenes/SceneList/SceneList';
import SceneDetail from '../modules/Pages/Lab/Scenes/SceneDetail/SceneDetail';
import Docs from '../modules/Pages/Lab/Docs/Docs';
import Pricing from '../modules/Pages/Pricing/Pricing';
import User from '../modules/Pages/User/User';

const requireAuth = (store) => (
    (nextState, replace) => {
      if (!store.getState().auth.isAuthenticated) {
        replace({ pathname: '/login' });
      }
    }
  );

const alreadyAuth = (store) => (
    (nextState, replace) => {
      if (store.getState().auth.isAuthenticated) {
        replace({ pathname: '/' });
      }
    }
  );

const routes = (store) => (
  <Route path='/' component={App} >
    <Route component={NavWrapper} >
      <Route path='login' component={Auth} onEnter={alreadyAuth(store)} />
      <Route component={Main} >
        <IndexRoute component={Home} />
        <Route path='users'>
          <Route path=':userSlug' component={User} />
        </Route>
        <Route path='about' component={About} />
        <Route path='pricing' component={Pricing} />
        <Route path='lab' onEnter={requireAuth(store)}>
          <IndexRedirect to='scenes' />
          <Route path='scenes'>
            <IndexRoute component={SceneList} />
            <Route path=':sceneSlug'>
              <IndexRoute component={SceneDetail} />
              <Route path='analyses/:analysisSlug'>
                <IndexRoute component={SceneDetail} />
                <Route path='videos/:videoSlug' component={SceneDetail}>
                  <IndexRoute component={SceneDetail} />
                  <Route path='tools/:toolSlug' component={SceneDetail} />
                </Route>
              </Route>
            </Route>
          </Route>
          <Route path='codes'>
            <IndexRoute component={CodeList} />
            <Route name=':codeSlug' path=':codeSlug' component={CodeDetail} />
          </Route>
          <Route path='docs' component={Docs} />
        </Route>
      </Route>
    </Route>
  </Route>
);

export default routes;

