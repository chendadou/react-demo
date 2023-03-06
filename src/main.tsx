import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import Index from '@routes/index';
import Root, {
  loader as rootLoader,
  action as rootAction,
} from '@routes/root';
import ErrorPage from '@src/error-page';
import Contact, {loader as contactLoader,} from '@src/routes/contact';
import EditContact, {action as editAction,} from "./routes/edit";
import { action as destroyAction } from "./routes/destroy";

import '@src/index.css';

const container = document.getElementById('root');

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      { index: true, element: <Index /> },
      {
        path: 'contacts/:contactId',
        element: <Contact />,
        loader: contactLoader,
      },
      {
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        loader: contactLoader,
        action: editAction,
      },
      {
        path: "contacts/:contactId/destroy",
        action: destroyAction,
        errorElement: <div>Oops! There was an error.</div>,
      },
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
