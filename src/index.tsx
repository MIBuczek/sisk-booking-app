import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import PrepareStore from 'components/molecules/PrepareStore';
import { store } from 'store/rootReducer';
import Root from 'views/Root';
import { theme } from 'theme/mainTheme';
import reportWebVitals from 'reportWebVitals';

const GlobalStyle = createGlobalStyle`  
  *, *::before, *::after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    outline:none
  };
  
  html {
    font-size: 62.5%; 
  };
  
  body {
    margin: 0;
    padding: 0;
    font-size: 1.6rem;
    font-family: 'Oswald', sans-serif;
    input,textarea{
      font-family: 'Oswald', sans-serif;
    }
  };
`;

ReactDOM.render(
   <React.StrictMode>
      <Provider store={store}>
         <PrepareStore>
            <ThemeProvider theme={theme}>
               <GlobalStyle />
               <Root />
            </ThemeProvider>
         </PrepareStore>
      </Provider>
   </React.StrictMode>,
   document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
