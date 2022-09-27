import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/router/App';
import '~/styles/global.scss';
import { store } from '~/Context';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
