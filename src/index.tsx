import React from 'react';
import { createRoot } from 'react-dom/client';
import Page01 from '@pages/page01';

import '@styles/style.scss';

const container = document.getElementById('app');
const root = createRoot(container!);    // createRoot(container!) if you use TypeScript

const App: React.FC = () => {
  console.log('111');
  return (
    <div id='main'>
      <Page01 />
    </div>
  )
}

root.render(<App />);
