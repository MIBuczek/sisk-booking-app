import React, {Suspense} from 'react';
import {HashRouter, Route, Routes} from 'react-router-dom';
import styled from 'styled-components';

import Cookies from 'components/molecules/Cookies';
import Loading from 'components/molecules/Loading';
import ServerError from 'views/user-view/ServerError';

const Main = React.lazy(() => import('./user-view/Main'));
const Login = React.lazy(() => import('./admin-view/Login'));
const Admin = React.lazy(() => import('./admin-view/Admin'));
const NoMatch = React.lazy(() => import('./user-view/NoMatch'));
const Contact = React.lazy(() => import('./user-view/Contact'));
const TopNav = React.lazy(() => import('components/organisms/TopNav'));
const Footer = React.lazy(() => import('components/organisms/Footer'));

const AppWrapper = styled.div`
   width: 100%;
   min-height: 100vh;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: flex-start;
`;

const App: React.FC = (): JSX.Element => (
   <HashRouter>
      <AppWrapper>
         <Suspense fallback={<Loading />}>
            <TopNav />
         </Suspense>
         <Routes>
            <Route
               path="/"
               element={
                  <Suspense fallback={<Loading />}>
                     <Main />
                  </Suspense>
               }
            />
            <Route
               path="login"
               element={
                  <Suspense fallback={<Loading />}>
                     <Login />
                  </Suspense>
               }
            />
            <Route
               path="admin"
               element={
                  <Suspense fallback={<Loading />}>
                     <Admin />
                  </Suspense>
               }
            />
            <Route
               path="contact"
               element={
                  <Suspense fallback={<Loading />}>
                     <Contact />
                  </Suspense>
               }
            />
            <Route
               path="server-error"
               element={
                  <Suspense fallback={<Loading />}>
                     <ServerError />
                  </Suspense>
               }
            />
            <Route
               element={
                  <Suspense fallback={<Loading />}>
                     <NoMatch />
                  </Suspense>
               }
            />
         </Routes>
         <Cookies />
         <Suspense fallback={<Loading />}>
            <Footer />
         </Suspense>
      </AppWrapper>
   </HashRouter>
);

export default App;
