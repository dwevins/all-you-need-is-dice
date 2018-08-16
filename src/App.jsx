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
    const numSets = setsCopy.length;
    const newKey = numSets > 0 ? this.state.diceSets[numSets - 1].key + 1 : 1;
    const newSet = {
      key: newKey,
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
    const targetSet = this.getSet(setsCopy, key);
    if (targetSet) {
      setsCopy.splice(setsCopy.indexOf(targetSet), 1);
      this.setState({diceSets: setsCopy});
    }
  }

  getSet(sets, key) {
    console.log(sets);

    const targetSet = sets.filter((set) => set.key === key)
    return targetSet.length ? targetSet[0] : null;
  }

  roll(key) {
    const setsCopy = this.state.diceSets.slice();
    const targetSet = this.getSet(setsCopy, key);
    const newSet = {};
    if (targetSet) {
      let total = 0;
      const keys = Object.keys(targetSet.rollData);

      for (let i = 0; i < keys.length; i++) {
        const curDie = keys[i];
        const numRolls = targetSet.rollData[curDie];
        const mod = Math.floor(100 / curDie);

        for (let j = 1; j <= numRolls; j++) {
          let roll = Math.ceil((Math.random() * 100) / mod);
          total += roll;
        }
      }

      newSet.key = targetSet.key;
      newSet.rollData = targetSet.rollData;
      newSet.currentResult = total;
    }

    setsCopy.splice(setsCopy.indexOf(targetSet), 1, newSet);
    this.setState({diceSets: setsCopy});
  }

  addDie(key, die) {
    const setsCopy = this.state.diceSets.slice();
    const targetSet = this.getSet(setsCopy, key);
    if (targetSet) {
      setsCopy[setsCopy.indexOf(targetSet)].rollData[die] += 1;
      this.setState({diceSets: setsCopy});
    }
  }

  dropDie(key, die) {
      const setsCopy = this.state.diceSets.slice();
      const targetSet = this.getSet(setsCopy, key);
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
          </div>
        </header>
        <div className="sets-container content-container">
          { this.state.diceSets.map((set) =>
            <DiceSet
              key={ set.key }
              rollData={ set.rollData }
              result={ set.currentResult }
              drop={ () => this.dropSet(set.key) }
              roll={ () => this.roll(set.key) }
              addDie={ (die) => this.addDie(set.key, die) }
              dropDie={ (die) => this.dropDie(set.key, die) }
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
