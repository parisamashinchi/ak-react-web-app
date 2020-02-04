import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedMessage, FormattedNumber, IntlProvider } from 'react-intl';
import Swiper from 'react-id-swiper';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import InlineLoader from 'containers/loading/InlineLoader';
import * as modalActions from 'containers/modal/actions';
import * as actions from './actions';
import en from './translations/en.json';
import fa from './translations/fa.json';

/**
 @param messages is getting fa and en json files
 in case of using translation
 */
const messages = {
    'fa': fa,
    'en': en
};
/**
 * params is contains
 * @type {{slidesPerView: number, spaceBetween: number, centeredSlides: boolean, rtl: boolean, loop: boolean, navigation: {nextEl: string, prevEl: string}, breakpoints: {768: {slidesPerView: number, spaceBetween: number}}}}
 */
const params = {
    slidesPerView: 3,
    spaceBetween: 2,
    centeredSlides: true,
    rtl: true,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        // when window width is <= 320px
        768: {
            slidesPerView: 1,
            spaceBetween: 5,
        },
    },
};

class Carousel extends Component {

    /*
     getFlavors is an action to handle getting
     flavor list from server
     */
    componentDidMount() {
        const { getFlavors } = this.props;
        getFlavors();
    }

    /*
     selectFlavor is an action to set data of selected one to redux store
     */
    selectFlavor = (flavor) => {
        const { selectFlavor } = this.props;
        selectFlavor(flavor.id);
    };

    renderFlavorItem() {
        const { flavorList } = this.props;
        const flavors = map(flavorList, flavor => (
            <div className="swiper-slide" key={flavor.id}>
                <div className="slider-price text-center grey-text">
                    {/* 1111 */}
                    <div>
                        <p className="price-text"><FormattedMessage id="keyWord.resourcePrice" /></p>
                        <p className="price-number">
                            <FormattedNumber
                                value={flavor.resource_price}
                            />
                            <FormattedMessage id="keyWord.currency" />
                        </p>
                        <p className="price-text"><FormattedMessage id="keyWord.setupPrice" /></p>
                        <p className="price-number">
                            <FormattedNumber value={flavor.setup_price} />
                            <FormattedMessage
                                id="keyWord.currency"
                            />
                        </p>
                    </div>
                    {/* 1111 */}
                    <div dir="ltr">
                        <p>
                            Ram
                            {flavor.ram}
                            {' '}
                            MB
                            {' '}
                        </p>
                        <p>
                            Disk
                            {flavor.disk}
                            {' '}
                            GB SSD
                            {' '}
                        </p>
                        <p>
                            vCPUs
                            {flavor.cpu}
                            {' '}

                        </p>
                    </div>
                    {/* <p className="">{flavor.ram}GB memory</p> */}
                    {/* <p>{flavor.cpu} vCPU</p> */}
                    {/* <p>{flavor.disk}GB SSD disk</p> */}
                    {/* <p>{flavor.network}TB transfer</p> */}
                    <div className="">
                        <button
                            onClick={() => this.selectFlavor(flavor)}
                            className="btn btn-get-started"
                        >
                            <FormattedMessage id="keyword.getStarted" />
                        </button>
                    </div>
                </div>
            </div>
        ));
        return flavors;
    }

    render() {
        /*
         flavorList contains list of flavors to show in page
         lang contains selected language and IntlProvider use it to show needed language
         */
        const { flavorList, lang } = this.props;
        return (
            <IntlProvider locale={lang} messages={messages[lang]}>
                <div className="swiper-container pricing-swiper">
                    <InlineLoader />
                    {isEmpty(flavorList)
                        ? <div className="swiper-wrapper">
                            <FormattedMessage id="keyword.noData" />
                        </div>
                        : <Swiper {...params} className="swiper-wrapper">
                            {this.renderFlavorItem()}
                        </Swiper>
                    }
                </div>
            </IntlProvider>
        );
    }
}

/*
 mapDispatchToProps is a function that we
 use to dispatch actions from redux
 setShowModal is action to show modal on click
 */
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showModal: modalActions.showModal,
        selectFlavor: actions.selectFlavor,
        getFlavors: actions.getFlavors,
    }, dispatch);
}

/*
 mapStateToProps is a function that we
 use to get data from redux state
 */
const mapStateToProps = state => ({
    flavorList: get(state.FlavorsReducer, 'flavorList', []),
    lang: state.locale.lang,
});

Carousel.propTypes = {
    flavorList: PropTypes.arrayOf(PropTypes.object).isRequired,
    lang: PropTypes.string.isRequired,
    showModal: PropTypes.func.isRequired,
    selectFlavor: PropTypes.func.isRequired,
    getFlavors: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Carousel);
