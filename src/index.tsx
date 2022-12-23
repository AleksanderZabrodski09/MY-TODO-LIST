import React from 'react';
// import ReactDOM from 'react-dom';
import {createRoot} from 'react-dom/client';
import './index.css';
import * as serviceWorker from './serviceWorker';
import AppWithReducer from './AppWithReducer';
import {Provider} from 'react-redux';
import {store} from './state/store';

// ReactDOM.render(<App />,  document.getElementById('root'));

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
  <Provider store={store}>
    <AppWithReducer/>
  </Provider>);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
