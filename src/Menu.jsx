import React, { Component } from 'react';

class Menu extends Component {
    render() {
        return (
            <div className="set-controls">
                <button onClick={ () => this.props.addEmptySet() }><span>Add a Set</span></button>
                <button onClick={ () => this.props.rollAll() }><span>Roll All</span></button>
            </div>
        )
    }
}

export default Menu
