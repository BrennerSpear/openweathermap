import React from 'react';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: 'hello world'
    }
  }

  render () {
    return (
      <div>
        {this.state.data}
      </div>
    )
  }

}