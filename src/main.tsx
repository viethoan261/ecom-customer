import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import AppRoutes from './pages/routers';
import customTheme from './theme';
import { Notifications } from '@mantine/notifications';
import { Provider } from 'react-redux';
import store from './redux/store';
import { SocketProvider } from './contexts/SocketContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SocketProvider>
      <Provider store={store}>
        <BrowserRouter>
          <MantineProvider theme={customTheme}>
            <ModalsProvider>
              <Notifications position="top-right" />
              <AppRoutes />
            </ModalsProvider>
          </MantineProvider>
        </BrowserRouter>
      </Provider>
    </SocketProvider>
  </React.StrictMode>
);
