import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from 'react-auth-kit';
import { Provider } from 'react-redux';
import ToastProvider from './context/ToastContext';
import router from './router';
import store from './redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <ToastProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ToastProvider>
  </AuthProvider>
);
