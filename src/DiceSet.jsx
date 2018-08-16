import React from 'react';

export default function DicePanel(props) {
    return (
        <div className="dice-set">
            <div className="controls">
                <div className="dice-menu">
                    {Object.keys(props.rollData).map((die, key) =>
                        <div className="die-container" key={key}>
                            <button onClick={ () => props.addDie(die) }>Add</button>
                            <button onClick={ () => props.dropDie(die) }>Drop</button>
                            <p className="count">d{ die } x {props.rollData[die]}</p>
                        </div>
                    )}
                </div>
                <button onClick={ () => props.roll() }>Roll</button>
                <button onClick={ () => props.drop() }>Drop Set</button>
            </div>
            <section className="results">
                <h3 className="result">{ props.result }</h3>
            </section>
        </div>
    )
}
