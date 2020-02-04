import React, { Component } from 'react';

export class Error extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                {showError}
            </div>
        )
    }
}
export default Error;
