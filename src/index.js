import React from 'react';
import ReactDom from 'react-dom';

import './style.css';
import './style.less';
import './style.scss';

const App = () => (
  <div id='test' className='less-test'>
    <span className='font-40'>Hello World</span>
  </div>
)

ReactDom.render(<App />, document.getElementById('app'));
