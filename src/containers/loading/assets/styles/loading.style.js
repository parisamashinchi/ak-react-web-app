import styled from 'styled-components';

const LoadingStyle = styled.div`
.preloader-wrapper {
    direction: ltr;
    z-index: 10000;
    position: fixed;
    width: 100%;
    height: 100%;
    &:before {
      content: '';
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
    background-image: linear-gradient(to right bottom, black, purple, black);
    height:100vh;
    }
}

.preloader-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.preloader-container .dot-1 {
    display: block;
    position: relative;
    left: 50%;
    top: 50%;
    width: 150px;
    height: 150px;
    margin: -75px 0 0 -75px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: black;
    -webkit-animation: spin 2s linear infinite;
    -moz-animation: spin 2s linear infinite;
    -o-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;
}

.preloader-container .dot-2 {
    position: absolute;
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: black;
    -webkit-animation: spin 3s linear infinite;
    -moz-animation: spin 3s linear infinite;
    -o-animation: spin 3s linear infinite;
    animation: spin 3s linear infinite;
}

.preloader-container .dot-3 {
    position: absolute;
    top: 15px;
    left: 15px;
    right: 15px;
    bottom: 15px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: black;
    -webkit-animation: spin 1.5s linear infinite;
    -moz-animation: spin 1.5s linear infinite;
    -o-animation: spin 1.5s linear infinite;
    animation: spin 1.5s linear infinite;
}

@keyframes spin {
    0% {
        -webkit-transform: rotate(0);
        -ms-transform: rotate(0);
        -moz-transform: rotate(0);
        -o-transform: rotate(0);
        transform: rotate(0);
    }
    100% {
        -webkit-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
`;

export default LoadingStyle;
