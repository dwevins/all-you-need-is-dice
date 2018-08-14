import React, { Component } from 'react';
import DiceSet from './DiceSet';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <DiceSet />
      </div>
    );
  }
}

export default App;
