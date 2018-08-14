import React from 'react';
import { Object } from 'core-js';

export default class DicePanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rollData: {
                20: 0,
                10: 0
            }
        }
    }

    addDie(die) {
        const rollDataCopy = this.state.rollData;
        rollDataCopy[die] += 1;
        this.setState({rollData: rollDataCopy});
    }

    renderDie(die) {
        return (
            <div className="button-container">
                <button onClick={ () => this.addDie(die) }>Add a D{ die }</button>
                <p className="count">{this.state.rollData[die]}</p>
            </div>
        )
    }

    render() {
        return (
            <section id="dice-panel">
                {Object.keys(this.state.rollData).map((die) => this.renderDie(die))}
                <button onClick={ () => this.props.roll(this.state.rollData) }>Roll!</button>
            </section>
        )
    }

}
