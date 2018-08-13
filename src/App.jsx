import React, { Component } from 'react';
import ResultsPanel from './ResultsPanel';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentResult: 0
    }
  }

  roll20() {
    const roll = Math.ceil((Math.random() * 100) / 5);
    this.setState({currentResult: roll});
  }

  render() {
    return (
      <div className="App">
        <button onClick={ () => this.roll20() }>roll a 20</button>
        <ResultsPanel result={this.state.currentResult}/>
      </div>
    );
  }
}

export default App;
