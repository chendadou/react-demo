import React from 'react';
import ReactDom from 'react-dom';
import Page01 from './pages/page01/index';

import './styles/style.scss';

const App: React.FC = () => {
  return (
    <div id='main'>
      <Page01 />
    </div>
  )
}

ReactDom.render(<App />, document.getElementById('app'));
