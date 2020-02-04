import styled from 'styled-components';
import * as colors from 'src/assets/styles/colors';
import WithDirection from 'containers/layouts/withDirection';

const PrivateWrapper = styled.div`
    direction: ltr;
    .size-alert {
        background-image: linear-gradient(to right bottom, #5670b9, #485c9d, #3a4982, #2c3768, #1e264f);
        color: ${colors.orange};
        z-index: 100000;
        height: 100vh;
        width: 100%;
        text-align: center;
        padding-top: 25%;
        .text {
            margin: 20px 25%;
            width: 50%;
        }
    }
    .move-on {
        opacity: 0;
        transition: 20ms;
    }
    .move-back {
        opacity: 1;
        transition: 300ms;
    }
    .inner-layout {
        margin-left: 200px;
        height: 100vh;
    }
    .show-map {
        opacity: .1 !important;
    }
    .content {
        margin: ${props => props.fullPage ? "80px 0 0 0" :  '80px 6% 0 6%'};
        border-radius: 20px;
     }
     .sidebar {
        min-width: 200px!important;
     }
    .profile-back {
       background: #141f45 ;
    }
    .map {
        margin: 8% 20% 5.5%;
        z-index: 1000;
        width: 80%;
        position: absolute;
        .map-image {
            margin: 3% 7% 0;
            width: 80%;
        }
        .pins {
            position: absolute;
            width: 10px;
            z-index: 2;
        }
        .pins-shadow {
            width: 10px;
            position: absolute;
            color: white;
            z-index: 20;
        }
        .text-section {
            font-size: 1.3em;
            width: 50%;
            margin: 0 30px;
            .ant-btn {
                margin-top: 10px;
            }
        }
        .pulse {
            width: 10px;
            position: absolute;
            -webkit-animation: pulseAndGo 2s;
            -moz-animation: pulseAndGo 2s;
            -o-animation: pulseAndGo 2s;
            animation: pulseAndGo 2s;
        }
        .one {
            top: 29%;
            left: 35%;
        }
        .two {
            top: 55%;
            left: 54%;
        }
        .three {
            top: 75%;
            left: 31%;
        }
        .four {
            top: 53%;
            left: 56%;
        }
        .five {
            top: 42%;
            left: 52%;
        }
        @media(max-width: 1100px){
            .one {
                top: 35%;
                left: 35%;
            }
            .two {
                top: 60%;
                left: 54%;
            }
            .three {
                top: 80%;
                left: 31%;
            }
            .four {
                top: 58%;
                left: 56%;
            }
            .five {
                top: 50%;
                left: 52%;
            }
        }
        @media(min-width: 1600px){
            .one {
                top: 24%;
                left: 35%;
            }
            .two {
                top: 53%;
                left: 54.5%;
            }
            .three {
                top: 70%;
                left: 31%;
            }
            .four {
                top: 52%;
                left: 55.5%;
            }
            .five {
                top: 42%;
                left: 52%;
            }
        
        }
    }
    @-webkit-keyframes pulseAndGo {
        0% {-webkit-transform: scale(1);}
        50% {-webkit-transform: scale(5);}
        100% {
        -webkit-transform: scale(7);
        opacity: 0;
        }
    }
    @-o-keyframes pulseAndGo {
        0% {-webkit-transform: scale(1);}
        50% {-webkit-transform: scale(5);}
        100% {
        -webkit-transform: scale(7);
        opacity: 0;
        }
    }
    @keyframes pulseAndGo {
        0% {-webkit-transform: scale(1);}
        50% {-webkit-transform: scale(5);}
        100% {
        -webkit-transform: scale(7);
        opacity: 0;
        }
    }
`;

const PrivateStyle = WithDirection(PrivateWrapper);
export default PrivateStyle;
