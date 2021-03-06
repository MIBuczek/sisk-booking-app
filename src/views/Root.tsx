import React, { Suspense } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import bg from '../assets/images/background.jpg';
import NavBar from '../components/molecules/NavBar';

const Main = React.lazy(() => import('./user-view/Main'));
const Login = React.lazy(() => import('./admin-view/Login'));
const Admin = React.lazy(() => import('./admin-view/Admin'));
const NoMatch = React.lazy(() => import('./user-view/NoMatch'));

const AppWrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-image: url(${bg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const App: React.SFC = (): JSX.Element => (
  <HashRouter>
    <AppWrapper>
      <NavBar />
      <Switch>
        <Route exact path={'/'} component={Main}>
          <Suspense fallback={<div>Loading...</div>}>
            <Main />
          </Suspense>
        </Route>
        <Route path={'/login'} component={Login}>
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        </Route>
        <Route path={'/admin'} component={Admin}>
          <Suspense fallback={<div>Loading...</div>}>
            <Admin />
          </Suspense>
        </Route>
        <Route>
          <Suspense fallback={<div>Loading...</div>}>
            <NoMatch />
          </Suspense>
        </Route>
      </Switch>
    </AppWrapper>
  </HashRouter>
);

export default App;
