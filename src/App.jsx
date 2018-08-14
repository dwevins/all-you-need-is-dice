import React, { Component } from 'react';
import DiceSet from './DiceSet';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      diceSets: [
        {key: 1}
      ]
    }
  }

  addSet() {
    const setsCopy = this.state.diceSets.slice();
    const numSets = setsCopy.length;
    const newKey = setsCopy[numSets - 1].key + 1
    setsCopy.push({key: newKey})
    this.setState({diceSets: setsCopy});
  }

  dropSet(key) {
    if (this.state.diceSets.length === 1) return false;

    const setsCopy = this.state.diceSets.slice();
    const targetSet = setsCopy.filter((set) => set.key === key)[0];
    if (targetSet) {
      setsCopy.splice(setsCopy.indexOf(targetSet), 1);
      this.setState({diceSets: setsCopy});
    }
  }

  render() {
    return (
      <div className="App">
      <button onClick={ () => this.addSet() }>add a set</button>
      <div className="sets-container">
        { this.state.diceSets.map((set) =>
          <DiceSet key={ set.key } drop={() => this.dropSet(set.key)}/>
        )}
      </div>
      </div>
    );
  }
}

export default App;
