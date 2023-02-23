import React from 'react';

interface Props {
  msg: string
}

export default class Page01 extends React.Component<any>{
  constructor(props: Props){
    super(props);
  }

  render() {
    const {msg} = this.props;
    return <div>page01 test, "{msg || '-'}" from props</div>
  }
}