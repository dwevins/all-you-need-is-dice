import React, { Component } from 'react';
import DiceSet from './DiceSet';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      diceSets: []
    }
  }

  addSet() {
    const setsCopy = this.state.diceSets.slice();
    const newSet = {
      rollData: {
        2: 0,
        3: 0,
        4: 0,
        6: 0,
        8: 0,
        10: 0,
        12: 0,
        20: 0,
      },
      currentResult: 0
    }

    setsCopy.push(newSet)
    this.setState({diceSets: setsCopy});
  }

  dropSet(key) {
    if (this.state.diceSets.length === 1) return false;

    const setsCopy = this.state.diceSets.slice();
    const targetSet = setsCopy[key];
    if (targetSet) {
      setsCopy.splice(setsCopy.indexOf(targetSet), 1);
      this.setState({diceSets: setsCopy});
    }
  }

  rollSet(set) {
    const setCopy = {};
    const keys = Object.keys(set.rollData);
    let total = 0;

    for (let i = 0; i < keys.length; i++) {
      const curDie = keys[i];
      const numRolls = set.rollData[curDie];
      const mod = Math.ceil(100 / curDie);

      for (let j = 1; j <= numRolls; j++) {
        let roll = Math.ceil((Math.random() * 100) / mod);
        total += roll;
      }
    }

    setCopy.rollData = set.rollData;
    setCopy.currentResult = total;

    return setCopy;
  }

  roll(key) {
    const setsCopy = this.state.diceSets.slice();
    const targetSet = setsCopy[key];
    const newSet = this.rollSet(targetSet);

    setsCopy.splice(setsCopy.indexOf(targetSet), 1, newSet);
    this.setState({diceSets: setsCopy});
  }

  rollAll(sets) {
    let setsCopy = sets.slice();
    for (let i = 0; i < sets.length; i++) {
      setsCopy[i] = this.rollSet(sets[i]);
    }

    this.setState({diceSets: setsCopy});
  }

  addDie(key, die) {
    const setsCopy = this.state.diceSets.slice();
    const targetSet = setsCopy[key];

    if (targetSet) {
      setsCopy[setsCopy.indexOf(targetSet)].rollData[die] += 1;
      this.setState({diceSets: setsCopy});
    }
  }

  dropDie(key, die) {
      const setsCopy = this.state.diceSets.slice();
      const targetSet = setsCopy[key];

      if (targetSet) {
        const rollData = setsCopy[setsCopy.indexOf(targetSet)].rollData;
        setsCopy[setsCopy.indexOf(targetSet)].rollData[die] = rollData[die] > 0 ? rollData[die] - 1 : 0;
        this.setState({diceSets: setsCopy});
      }
  }

  componentDidMount() {
    this.addSet();
  }

  render() {
    return (
      <div className="App">
        <header>
          <div className="content-container">
            <button onClick={ () => this.addSet() }>Add a Set</button>
            <button onClick={ () => this.rollAll(this.state.diceSets) }>Roll All</button>
          </div>
        </header>
        <div className="sets-container content-container">
          { this.state.diceSets.map((set, index) =>
            <DiceSet
              key={ index }
              rollData={ set.rollData }
              result={ set.currentResult }
              drop={ () => this.dropSet(index) }
              roll={ () => this.roll(index) }
              addDie={ (die) => this.addDie(index, die) }
              dropDie={ (die) => this.dropDie(index, die) }
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
