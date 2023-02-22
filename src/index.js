import React from 'react';
import ReactDom from 'react-dom';

import './styles/style.css';
import './styles/style.less';
import './styles/style.scss';

import imgSrc from './assets/images/icon01.png';

const App = () => (
  <div id='test' className='less-test'>
    <div className='font-40'>Hello World</div>
    <img src={imgSrc} className='img' />
  </div>
)

ReactDom.render(<App />, document.getElementById('app'));
