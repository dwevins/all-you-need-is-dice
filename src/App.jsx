import React, { Component } from 'react';
import ResultsPanel from './ResultsPanel';
import DicePanel from './DicePanel';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentResult: 0
    }
  }

  roll(rollData) {
    const keys = Object.keys(rollData);
    let total = 0;

    for (let i = 0; i < keys.length; i++) {
      const curDie = keys[i];
      const numRolls = rollData[curDie];
      const mod = Math.floor(100 / curDie);
      console.log('curTotal', total);
      console.log('curDie', curDie);
      console.log('numRolls', numRolls);
      console.log('mod', mod);

      for (let j = 1; j <= numRolls; j++) {
        let roll = Math.ceil((Math.random() * 100) / mod);
        total += roll;
        console.log('roll', roll);
        console.log('new total', total);

      }
    }
    this.setState({currentResult: total});
  }

  render() {
    return (
      <div className="App">
        <DicePanel roll={(rollData) => this.roll(rollData)}/>
        <ResultsPanel result={this.state.currentResult}/>
      </div>
    );
  }
}

export default App;
