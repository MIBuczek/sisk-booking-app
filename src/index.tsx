import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Root from './views/Root';
import reportWebVitals from './reportWebVitals';
import { store } from './store/rootReducer';
import PrepareStore from './components/molecules/PrepareStore';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
      <PrepareStore />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
