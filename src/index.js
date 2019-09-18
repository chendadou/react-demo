import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import img from './img.jpg';

ReactDOM.render(
  <div className="index">
    <div>hello world!</div>
    <img src={img} />
  </div>,
  document.getElementById('app')
);