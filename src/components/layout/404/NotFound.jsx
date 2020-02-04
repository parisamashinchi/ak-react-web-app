import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { NavLink } from 'react-router-dom';
import { history } from "src/routers/AppRouter";
import CustomButton from 'components/ui-components/button/Button';
import NotFoundStyle from './assets/notFound.style';
import mah from './assets/images/mah.png';
import ghabr from './assets/images/ghabr.png';

export class NotFound extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (document.querySelector('body') !== null) {
            document.querySelector('body').addEventListener('mousemove', (e) => {
                const clientWidth = document.querySelector('.stars').clientWidth;
                const clientHeight = document.querySelector('.stars').clientHeight;
                document.querySelector('.stars').style.transform = `translate3d(${((clientWidth / 2) - e.clientX) / 7}px, ${((clientHeight / 2) - e.clientY) / 20}px, 0)`;
            }, false);
        }
    }

    componentWillUnmount() {
        document.querySelector('body').addEventListener('mousemove', (e) => {
            const clientWidth = document.querySelector('.stars').clientWidth;
            const clientHeight = document.querySelector('.stars').clientHeight;
            document.querySelector('.stars').style.transform = `translate3d(${((clientWidth / 2) - e.clientX) / 7}px, ${((clientHeight / 2) - e.clientY) / 20}px, 0)`;
        }, false);
    }

    render() {
        return(
            <NotFoundStyle>
                <div>
                    <Helmet>
                        <title>Not Found</title>
                    </Helmet>
                    <img src={mah} alt="404" className="stars" />
                    <img src={ghabr} alt="404" className="grave" />
                    <h1>This page is no longer with us.</h1>
                    <span>
                        We couldn't find this page among the planets. Please check out our
                        <a href="/faq/list/full"> FAQs </a>
                        for help,
                        <br />
                        or see
                        <a href="/#services"> Services </a>
                        to know the solutions we provide;
                        otherwise, you may go to:
                    </span>
                    <div>
                        <CustomButton onClick={() => window.location.replace('/')}>
                            Homepage
                        </CustomButton>
                    </div>
                </div>
            </NotFoundStyle>
        )
    }
}
export default NotFound;
