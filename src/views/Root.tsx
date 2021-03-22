import React, { Suspense } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import bgMain from '../assets/images/background.jpg';
import TopNav from '../components/molecules/TopNav';
import Footer from '../components/organisms/Footer';
import ModalContextProvider from '../context/ModalContext';

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
`;

/* background-image: url(${bgMain});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover; */

const BGImage = styled.img`
  width: 100%;
  height: 100%;
  opacity: 0.7;
  position: fixed;
  z-index: -1;
`;

const App: React.FC = (): JSX.Element => (
  <HashRouter>
    <ModalContextProvider>
      <AppWrapper>
        <BGImage src={bgMain} alt="bgMain" />
        <TopNav />
        <Switch>
          <Route exact path={'/'}>
            <Suspense fallback={<div>Loading...</div>}>
              <Main />
            </Suspense>
          </Route>
          <Route path={'/login'}>
            <Suspense fallback={<div>Loading...</div>}>
              <Login />
            </Suspense>
          </Route>
          <Route path={'/admin'}>
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
        <Footer />
      </AppWrapper>
    </ModalContextProvider>
  </HashRouter>
);

export default App;
