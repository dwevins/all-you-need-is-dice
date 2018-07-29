import React, { Component } from 'react';
import './App.css';

class App extends Component {
  roll20() {
    const roll = Math.ceil((Math.random() * 100) / 5);
    console.log(roll);

  }
  render() {
    return (
      <div className="App">
        <button onClick={ () => this.roll20() }>roll a 20</button>
      </div>
    );
  }
}

export default App;
