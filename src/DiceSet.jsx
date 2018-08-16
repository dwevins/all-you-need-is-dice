import React from 'react';

export default class DicePanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
    }

    addDie(die) {
        const rollDataCopy = this.state.rollData;
        rollDataCopy[die] += 1;
        this.setState({rollData: rollDataCopy});
    }

    dropDie(die) {
        const rollDataCopy = this.state.rollData;
        rollDataCopy[die] = rollDataCopy[die] > 0 ? rollDataCopy[die] - 1 : 0;
        this.setState({rollData: rollDataCopy});
    }

    renderDie(die, key) {
        return (
            <div className="die-container" key={key}>
                <button onClick={ () => this.addDie(die) }>Add</button>
                <button onClick={ () => this.dropDie(die) }>Drop</button>
                <p className="count">d{ die } x {this.state.rollData[die]}</p>
            </div>
        )
    }

    roll(rollData) {
        const keys = Object.keys(rollData);
        let total = 0;

        for (let i = 0; i < keys.length; i++) {
          const curDie = keys[i];
          const numRolls = rollData[curDie];
          const mod = Math.floor(100 / curDie);

          for (let j = 1; j <= numRolls; j++) {
            let roll = Math.ceil((Math.random() * 100) / mod);
            total += roll;
          }
        }
        this.setState({currentResult: total});
      }

    render() {
        return (
            <div className="dice-set">
                <div className="controls">
                    <div className="dice-menu">
                        {Object.keys(this.state.rollData).map((die, key) => this.renderDie(die, key))}
                    </div>
                    <button onClick={ () => this.roll(this.state.rollData) }>Roll</button>
                    <button onClick={ () => this.props.drop() }>Drop Set</button>
                </div>
                <section className="results">
                    <h3 className="result">{ this.state.currentResult }</h3>
                </section>
            </div>
        )
    }
}
