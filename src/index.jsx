import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const body = ReactDOM.createRoot(document.querySelector('body'));
body.render(<BrowserRouter><App/></BrowserRouter>);