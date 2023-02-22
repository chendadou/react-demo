import React from 'react';
import ReactDom from 'react-dom';

import './styles/style.css';
import './styles/style.less';
import './styles/style.scss';

import imgSrc from './assets/images/icon01.png';

const App: React.FC = () => {
  const title: string = 'Hello World';
  return (
    <div id='test' className='less-test'>
      <div className='font-40'>{title}</div>
      <img src={imgSrc} className='img' />
    </div>
  )
}

ReactDom.render(<App />, document.getElementById('app'));
