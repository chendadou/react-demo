import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import Index from '@src/routes/index';
import Root from '@src/routes/root';
import ErrorPage from './error-page';
import Contact from './routes/contact';

import './index.css';

const container = document.getElementById('app');

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      {
        path: 'contacts/:contactId',
        element: <Contact />,
      }
    ]
  },
]);

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

if (container) {
  createRoot(container).render(<App />);
}
