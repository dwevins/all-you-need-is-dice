import React, { Component, Fragment } from 'react';
import { registerCallback } from './screenResizeHelpers';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navMode: 'desktop'
        }
    }

    componentDidMount() {
        registerCallback('mobile', () => this.setState({navMode: 'mobile'}))
        registerCallback('desktop', () => this.setState({navMode: 'desktop'}))
    }


    render() {
        return (
            <div className="set-controls">
            {this.state.navMode === 'desktop' && (
                <Fragment>
                    <button onClick={ () => this.props.addEmptySet() }><span>Add a Set</span></button>
                    <button onClick={ () => this.props.rollAll() }><span>Roll All</span></button>
                </Fragment>

            )}
            {this.state.navMode === 'mobile' &&
                <Fragment>
                    <button onClick={ () => this.props.addEmptySet() }><span>MOBILE Add a Set</span></button>
                    <button onClick={ () => this.props.rollAll() }><span>MOBILE Roll All</span></button>
                </Fragment>
            }
            </div>
        )
    }
}

export default Menu
