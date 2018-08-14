import React from 'react';
import { Object } from 'core-js';

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
            }
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
                <button onClick={ () => this.addDie(die) }>Add a D{ die }</button>
                <button onClick={ () => this.dropDie(die) }>Drop a D{ die }</button>
                <p className="count">D{ die } x {this.state.rollData[die]}</p>
            </div>
        )
    }

    render() {
        return (
            <section id="dice-panel">
                <div className="dice-controls">
                    {Object.keys(this.state.rollData).map((die, key) => this.renderDie(die, key))}
                </div>
                <button onClick={ () => this.props.roll(this.state.rollData) }>Roll!</button>
            </section>
        )
    }

}
