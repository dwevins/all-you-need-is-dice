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
    sets.map((set, index) => {
      setsCopy[index] = this.rollSet(set);
    })

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

  generateSave(sets) {
    const rollData = sets.map((set) => set.rollData);
    let shouldUpdateQuery = false;
    let queryString = '?sets';

    rollData.map((set, index) => {
      let setDataString = ''

      Object.keys(set).map((die) => {
        if (set[die] === 0) return false;

        shouldUpdateQuery = true;
        const dieHex = parseInt(die, 10).toString(16).padStart(2, '0');
        const countHex = set[die].toString(16).padStart(2, '0');
        setDataString += `${dieHex}${countHex}`;
      })

      queryString += index > 0 && setDataString.length ? `s` : '';
      queryString += setDataString;
    })

    if (shouldUpdateQuery && window.history.pushState) {
        var newurl = `${window.location.protocol}//${window.location.host}${window.location.pathname}${queryString}`;
        window.history.pushState({path:newurl},'',newurl);
    }
  }

  componentDidMount() {
    this.addSet();
  }

  render() {
    this.generateSave(this.state.diceSets);

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
