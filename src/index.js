import { StrictMode } from 'react';

import ReactDOM from 'react-dom';
import 'url-search-params-polyfill';
import InitialConfig from './InitialConfig';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import GlobalStyle from './GlobalStyle';
ReactDOM.render(
  <StrictMode>
    <InitialConfig />
    <GlobalStyle />
    <App />
  </StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
