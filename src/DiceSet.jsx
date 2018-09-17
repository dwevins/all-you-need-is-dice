import React from 'react';

export default function DicePanel(props) {
    return (
        <div className="dice-set">
            <div className="dice-menu">
                <button className="drop-btn" onClick={ () => props.drop() }>X</button>
                {Object.keys(props.rollData).map((die, key) =>
                    <div className="die-container" key={key}>
                        <p className="count">d{ die } x {props.rollData[die]}</p>
                        <button className="die-control" onClick={ () => props.addDie(die) }><span>+</span></button>
                        <button className="die-control" onClick={ () => props.dropDie(die) }><span>-</span></button>
                    </div>
                )}
            </div>
            <section className="results">
                <h2 className="result">{ props.result }</h2>
                <button onClick={ () => props.roll() }><span>Roll</span></button>
            </section>
        </div>
    )
}
