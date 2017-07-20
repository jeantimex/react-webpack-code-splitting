import React, { Component } from 'react';
import _ from 'lodash';

class Home extends Component {
  handleClick = () => {
    console.log(_.chunk([1, 2, 3], 1));
  };

  render() {
    return (
      <div>
        <p>Home</p>
        <button onClick={ this.handleClick }>Join Array</button>
      </div>
    );
  }
}

export default Home;
