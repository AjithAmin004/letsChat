import { Provider } from './components/ui/provider';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ChatProvider from './context/chatProvider.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider>
      <ChatProvider>
        <App />
      </ChatProvider>
    </Provider>
  </BrowserRouter>
);
