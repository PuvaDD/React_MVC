import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import 'rsuite/dist/styles/rsuite-default-rtl.css'
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore } from 'redux';
import { Provider } from 'react-redux'; 

import rootReducer from "./Reducers/RootReducer"

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

const store = createStore(rootReducer);

ReactDOM.render(
    <BrowserRouter basename={baseUrl}>
        <Provider store={store}><App /></Provider>
  </BrowserRouter>,
  rootElement);

registerServiceWorker();

