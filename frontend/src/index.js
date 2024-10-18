import axios from 'axios';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './app/store';
import './index.css';

axios.defaults.baseURL = 'http://localhost:8000/';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <App />
    </Provider>,
);
