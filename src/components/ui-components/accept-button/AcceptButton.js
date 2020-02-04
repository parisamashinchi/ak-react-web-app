import React, { Component } from 'react';

export class AcceptButton extends Component {
    render() {
        return (
            <button className=" btn accept-button" onClick={this.props.onClick}>
                {this.props.children}
            </button>
        );
    }
}
