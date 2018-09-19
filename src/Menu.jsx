import React, { Component, Fragment } from 'react';
import { registerCallback, getScreenMode } from './screenResizeHelpers';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navMode: 'desktop',
            mobileMenuOpen: false
        }
    }

    toggleMobileMenu() {
        this.setState({mobileMenuOpen: !this.state.mobileMenuOpen});
    }

    componentDidMount() {
        registerCallback('mobile', () => this.setState({navMode: 'mobile'}))
        registerCallback('desktop', () => this.setState({navMode: 'desktop'}))
        this.setState({navMode: getScreenMode()});
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
                <div className={`mobile-nav ${this.state.mobileMenuOpen ? 'menu-open' : ''}`}>
                    <button className="roll-all-btn" onClick={ () => this.props.rollAll() }><span>R</span></button>
                    <button className="add-set-btn" onClick={ () => this.props.addEmptySet() }><span>+</span></button>
                    <button className="menu-btn" onClick={ () => this.toggleMobileMenu() }>
                        <span>{ this.state.mobileMenuOpen ? 'X' : 'M'}</span>
                    </button>
                </div>
            }
            </div>
        )
    }
}

export default Menu
