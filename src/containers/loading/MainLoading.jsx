import React, { Component } from 'react';
import LoadingStyle from 'containers/loading/assets/styles/loading.style';

export class LandingPage extends Component {
    render() {
        return (
            <div>
                <LoadingStyle>
                    <div className="preloader-wrapper">
                        <div className="preloader-container">
                            <div className="dot dot-1">
                                <div className="dot dot-2" />
                                <div className="dot dot-3" />
                            </div>
                        </div>
                    </div>
                </LoadingStyle>
            </div>
        );
    }
};

export default LandingPage;
