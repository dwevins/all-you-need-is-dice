import React from 'react';

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

    render() {
        return (
            <section id="dice-panel">
                <button onClick={ () => this.addDie(20) }>Add a D20</button>
                <p className="count">{this.state.rollData[20]}</p>
                <button onClick={ () => this.props.roll(this.state.rollData) }>Roll!</button>
            </section>
        )
    }

}
