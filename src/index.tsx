import React from 'react';
import Page01 from './pages/page01/index';

import { createRoot } from 'react-dom/client';
const container = document.getElementById('app');
const root = createRoot(container!);    // createRoot(container!) if you use TypeScript

import '@/styles/style.scss';

const App: React.FC = () => {
  return (
    <div id='main'>
      <Page01 />
    </div>
  )
}

root.render(<App />);
