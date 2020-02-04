import styled from 'styled-components';
import WithDirection, { direction } from 'containers/layouts/withDirection';
import backCounter from '../images/back-counter.png';
import backBanner from '../images/elecomp-back.png';
import dot from '../images/dot.png';


const HeadWrapper = styled.div`
    .ant-row {
            max-width: 1300px;
            margin: auto;
        }
    .main-banner{
        background-image: ${direction === 'ltr'
                                ? `url(${dot}), linear-gradient(to right bottom, black, purple, gray, purple, black)`
                                : `url(${dot}), linear-gradient(to left bottom, black, purple, gray, purple, black)`};
        height:100vh;
        padding: 3% 6%;
        background-repeat: no-repeat, no-repeat;
        background-size: 40%, cover;    
        background-position: 50% 50%;
        direction: ${direction};
        width: 100%;
        // animation: head 1s;
         @media (max-width: 576px){
             padding: 0 25px;
             height: 50vh;
        }
         @media (max-width: 360px){
             height: 60vh;
        }
    }
    .alice-carousel {
        direction: ltr;
    }
    .alice-carousel__wrapper {
        .alice-carousel__stage-item {
          text-align: center;
          button {
            width: initial;
          }
          a {
            color:#FF5416;
            font-size:16px;
            i {
                margin-right: 3px;
            }
            @media (max-width: 576px){
                font-size: 1em;
           }
         
          i {
              margin-left: 5px;
              font-size: 11px;
              &:before {
                    content: ${direction === 'rtl' ? '\\\\f104' : '\\\\f105'};
              }
          }
        }
      }
    }
    .alice-carousel__prev-btn, .alice-carousel__next-btn {
        padding: 0;
        margin-top: -25px;
    }
    .alice-carousel__prev-btn-item{
        top: 42%;
        position: absolute;
        left: 3%;
        text-align: left;
        [data-area] {
            background-image: none !important;
            font-family: "Font Awesome 5 Free";
            font-weight: 600;
            color: #ababab;
            font-size: 24px;
            &:after {
                content: "104";
            }
        } 
    }     
    .alice-carousel__next-btn-item{
        top: 42%;
        position: absolute;
        right: 3%;
        text-align: right;
        [data-area] {
            background-image: none !important;
            font-family: "Font Awesome 5 Free";
            font-weight: 600;
            color: #ababab;
            font-size: 24px;
            &:after {
                content: "105";
            }
        } 
    }
    .alice-carousel__dots-item:hover, .alice-carousel__dots-item.__active {
        opacity: 1;
        background-color: #666666;
      }
    .alice-carousel__dots{
        list-style: none;
        position: absolute;
        text-align: center;
        background: transparent;
        border-color: transparent;
        color: #6272b4;
        font-size: 0.7em;
        margin: -100px 48.7%;
         @media(max-width: 576px){
          margin: 0 0 45px;
         }
        .alice-carousel__dots-item{
            background-color: #6272b4;
            vertical-align: middle;
        }
        .__active{
           background-color: #645ad0!important;
           width: 10px!important;
           height: 10px!important;
        }
    }
    .alice-carousel__dots-item {
          background-color: #c7c7c7;
      }
    .fa-angle-right:before {
        ${direction === 'rtl' ? {content: '"\\\\F104"'} : ''};
   }
    .align-center {
       text-align: center;
    } 
    .head {
      line-height: 1;
      margin-top: 30%;
      width: 80%;
      text-align: ${direction === 'rtl' ? 'right' : 'left'};
       .ant-row{
          margin: 10px 0;
        }
        .mt-30 {
           margin-top:30px; 
        }
        .ant-btn {
          margin: 30px 0;
          ${direction === 'rtl' ? { direction: 'rtl' } : ''};
            @media(max-width: 900px){
                font-size: 1em;
            }
            @media(max-width: 700px){
                font-size: .8em;
                margin-bottom: 10%;
                padding: 0 8px;
            }
            @media(max-width: 576px){
                font-size: .7em;
                margin-bottom: 10%;
                padding: 0 8px;
            }
        }
        
        h1 {
             color:white;
             margin: 0;
             font-weight: 800;
             font-stretch: expanded;
             font-size: 75px;
            @media (max-width: 1350px){ 
              font-size: 4em;
            };
             @media (max-width: 1110px){ 
              font-size: 3.5em;
            };
             @media (max-width: 952px){ 
              font-size: 3em;
            };
             @media(max-width: 768px){  
               font-size: 2.5em;
            };
           }
        p {
            color: #c1c6d9;
            font-weight: normal;
            margin: 0;
            line-height: 1.5;
            font-size: 2.5em;
            width: 90%;
            @media (max-width: 1350px){ 
              font-size: 2em;
            };
             @media (max-width: 1110px){ 
              font-size: 1.7em;
            };
             @media (max-width: 952px){ 
              font-size: 1.5em;
            };
             @media(max-width: 768px){  
               font-size: 1.3em;
            };
          }
        i {
          color:white;
          ${direction === 'rtl' ? { 'margin-right': '10px' } : { 'margin-left': '10px' }};
          font-size: 20px;
          }
        h6 {
           color:white;
             font-weight: bold;
             text-align: center;
             font-size: 18px;
              ${direction === 'rtl' ? { direction: 'rtl' } : ''}
              span {
                  color:#a6aac0;
                  font-size: 14px;
                  ${direction === 'rtl' ? { 'margin-right': '5px' } : { 'margin-left': '5px' }};
              }
          }
        .count-down-section{
            text-align: center;
         }
         .count-down-wrapper {
            margin-top: ${direction === 'rtl' ? '10%' : '15%'};
            background-image: url(${backCounter});
            text-align: center;
            border-radius: 20px;
            .counter-text {
                color: #BBBFD1;
                padding: 30px;
                font-size: 1.4em;
                line-height: 25px;
            }
            @media (max-width: 800px){
                .counter-text {
                    padding: 10px;
                    font-size: .9em!important;
                }
            }
            @media (max-width: 700px){
                .counter-text {
                    padding: 5px;
                    font-size: .7em!important;
                    line-height: 15px;
                }
            }
         }
         .count-down {
            direction: ltr;
            table {
                margin: auto;
            }
            .numbers {
                font-size: 2.7em;
                font-weight: bold;
                color: white;
            }
            .texts {
                font-size: 1em;
                color: #BBBFD1;
            }
            @media (max-width: 800px){
                .numbers {
                    font-size: 1.8em;
                }
                .texts {
                    font-size: .7em;
                }
            }
            @media (max-width: 700px){
                .numbers {
                    font-size: 1.3em;
                }
                .texts {
                    font-size: .5em;
                }
            }
         }
            
            @media (max-width: 1350px){ 
               margin-top: 25%;
            };
             @media (max-width: 1110px){ 
                 margin-top: 30%;
            };
             @media (max-width: 952px){ 
                margin-top: 35%;
            };
             @media(max-width: 768px){  
                 margin-top: 40%;
            }
    }
    .canvas {
       width: 750px!important;
       height: 750px!important;
       opacity: 0.5;
       top: 80px;
       margin: 0 auto;
       position: relative;
       display: block;
    }
    @media (max-width: 1600px){ 
        .canvas {
            width: 700px!important;
            height: 700px!important;
        }
        h1 {
            font-size: 4.5em!important;
        }
        p {
            font-size: 2.2em!important;
        }
       .head {
           margin-top: 20%!important;
           .count-down-wrapper .counter-text {
              padding: 30px;
              font-size: 1.4em;
           }
           .count-down .numbers {
              font-size: 3em;
           }
           .count-down .texts {
              font-size: 1em;
           }
           .ant-btn {
               font-size: 1.4em;
           }
       }
    };
    @media (max-width: 1500px){ 
            .canvas {
                width: 700px!important;
                height: 700px!important;
            }
            h1 {
                font-size: 4.5em!important;
            }
           .head {
              margin-top: 25%!important;
            };
        };
    @media (max-width: 1400px){ 
            .canvas {
                width: 650px!important;
                height: 650px!important;
            }
            h1 {
                font-size: 4em!important;
            }
            p {
                font-size: 2em!important;
            }
            .head {
                margin-top: 25%!important;
                .count-down .numbers {
                   font-size: 3em;
                }
           }
        };
    @media (max-width: 1300px){ 
               .canvas {
                  width: 550px!important;
                  height: 550px!important;
               }
               h1 {
                  font-size: 3.5em!important;
               }
               p {
                  font-size: 1.7em!important;
               }
               .head {
                  margin-top: 30%!important;
                .count-down .numbers {
                   font-size: 2.5em;
                }
               }
               .alice-carousel__dots {
                   margin: -100px 48.3%!important;
               }
            };
    @media (max-width: 1200px){
            .canvas {
                  width: 350px!important;
                  height: 350px!important;
                  top: 150px!important;
               }
               h1 {
                  font-size: 3em!important;
               }
               p {
                  font-size: 1.5em!important;
               }
               .head {
                  margin-top: 40%!important;
                  
                .count-down-wrapper .counter-text {
                   padding: 10px!important;
                   font-size: 1em!important;
               }
                .count-down-wrapper .count-down-section {
                   margin-top: 5%!important;
               }
               .count-down .numbers {
                   font-size: 1.5em!important;
               }
               .count-down .texts {
                  font-size: .7em!important;
               }
               .ant-btn {
                   font-size: .8em!important;
                   margin: 10px 0!important;
               }
               }
        @media (max-height: 800px){  
               .canvas {
                  width: 350px!important;
                  height: 350px!important;
                  top: 120px;
               }
               h1 {
                  font-size: 3em!important;
               }
               .head {
                  margin-top: 35%;
                  .count-down-wrapper .counter-text {
                      padding: 30px;
                      font-size: 1em;
                  }
                  .count-down .numbers {
                     font-size: 2em;
                  }
                  .count-down .texts {
                     font-size: .8em;
                  }
                  .ant-btn {
                     font-size: 1em;
                  }
               }
         }
        @media (max-height: 700px){  
               .canvas {
                  width: 350px!important;
                  height: 350px!important;
                  top: 70px
               }
               h1 {
                  font-size: 3em!important;
               }
               .head {
                  margin-top: 30%;
                  .ant-btn {
                      font-size: .8em!important;
                  }
                  .count-down {
                      .numbers {
                          font-size: 1.5em!important;
                      }
                      .texts {
                         font-size: .8em!important;
                      }
                      .counter-text {
                         font-size: .8em!important;
                      }
                  }
               }
         }
        @media (max-height: 600px){  
               .canvas {
                  width: 350px!important;
                  height: 350px!important;
               }
               h1 {
                  font-size: 3em!important;
               }
               p {
                  font-size: 1.5em!important;
               }
               .head {
                  margin-top: 40%;
               }
               .elecomp-banner .elecomp-graphic {
                  width: 80%!important;
               }
            };
    }
    @media (min-width: 1200px){
    .canvas {
                  width: 600px!important;
                  height: 600px!important;
                  top: 100px!important;
               }
               h1 {
                  font-size: 4em!important;
               }
               p {
                  font-size: 2em!important;
               }
               .head {
                  margin-top: 20%!important;
               }
        @media (max-height: 800px){  
               .canvas {
                  width: 600px!important;
                  height: 600px!important;
                  top: 50px!important;
               }
               h1 {
                  font-size: 3em!important;
               }
               p {
                  font-size: 1.5em!important;
               }
               .head {
                  margin-top: 15%!important;
               }
         }
        @media (max-height: 700px){  
               .canvas {
                  width: 550px!important;
                  height: 550px!important;
                  top: 50px!important;
               }
               h1 {
                  font-size: 2.5em!important;
               }
               p {
                  font-size: 1.3em!important;
               }
               .head {
                  margin-top: 15%!important;
               }
         }
        @media (max-height: 600px){  
               .canvas {
                  width: 450px!important;
                  height: 450px!important;
                  margin-top: 0!important;
               }
               h1 {
                  font-size: 2em!important;
               }
               p {
                  font-size: 1em!important;
               }
               .head {
                  margin-top: 13%!important;
               }
               .elecomp-banner .elecomp-graphic {
                  width: 80%!important;
               }
         }
    }
    @media (max-width: 952px){
        .canvas {
                  width: 250px!important;
                  height: 250px!important;
               }
        h1 {
                  font-size: 2.7em!important;
               }
        .head {
            margin-top: 50%!important;
        }
        .alice-carousel__dots {
            margin: -100px 47.9%!important;
        }
        @media (max-height: 800px){  
               .canvas {
                  width: 250px!important;
                  height: 250px!important;
               }
               h1 {
                  font-size: 2.7em!important;
               }
               .head {
                  margin-top: 50%!important;
               }
         }
        @media (max-height: 700px){  
               .canvas {
                  width: 250px!important;
                  height: 250px!important;
               }
               h1 {
                  font-size: 2.7em!important;
               }
               .head {
                  margin-top: 50%!important;
                  p {
                      width: 85%;
                  }
               }
         }
        @media (max-height: 600px){  
               .canvas {
                  width: 250px!important;
                  height: 250px!important;
                  top: 100px!important;
               }
               h1 {
                  font-size: 2.7em!important;
               }
               .head {
                  margin-top: 40%!important;
                  p {
                      width: 85%;
                  }
               }
               .elecomp-banner .elecomp-graphic {
                  width: 80%!important;
               }
         };
    }
    @media (max-width: 768px){  
               .canvas {
                  top: 150px;
                  width: 300px!important;
                  height: 300px!important;
               }
               .count-down-section{
                   margin-top: 10%!important;
               }
               h1 {
                  font-size: 2em!important;
               }
               .head {
                  margin-top: 50%!important;
                  p {
                      width: 85%;
                  }
                  .count-down-wrapper .counter-text {
                   padding: 10px!important;
                   font-size: .7em!important;
               }
                .count-down-wrapper .count-down-section {
                   margin-top: 5%!important;
               }
               .count-down .numbers {
                   font-size: 1.5em!important;
               }
               .count-down .texts {
                  font-size: .7em!important;
               }
               .ant-btn {
                   font-size: .7em!important;
                   margin: 15px!important;
               }
               }
               
        .alice-carousel__dots {
            margin: -75px 46.9%!important;
        }
         }
    @media (max-width: 700px){  
               .canvas {
                  width: 250px!important;
                  height: 250px!important;
               }
               .head {
                  margin-top: 40%!important;
                  p {
                  font-size: .8em!important;
                  }
                  .mt-30 {
                      margin-top: 10px
                  }
               }
               h1 {
                  font-size: 1.5em!important;
               }
         }
    @media (max-width: 576px){
             .canvas {
                  width: 100%!important;
                  height: 100%!important;
                  top: 80px!important;
             }
             h1 {
                font-size: 1.3em!important;
             }
             .head-wrapper {
                padding: 30% 0 25%;
                float: ${direction === 'rtl' ? 'right' : 'left'};
             }
             .head {
                text-align: center;
                width: 100%;
                margin-top: 0!important;
                .count-down-wrapper {
                    margin-top: ${direction === 'rtl' ? '5%' : '10%'};
                }
                .ant-col-xs-14 {
                    float: left!important;
                }
                p {
                  font-size: .7em!important;
                  width: 100%;
                }
                .count-down-wrapper .counter-text {
                   padding: 20px 20px 0!important;
                   font-size: .85em!important;
               }
                .count-down-wrapper .count-down-section {
                   margin: 10px 20px!important;
                   font-size: 1.35em!important;
               }
               .count-down .numbers {
                   font-size: 1em!important;
               }
               .count-down .texts {
                  font-size: .5em!important;
               }
               .ant-btn {
                   font-size: .75em!important;
                   margin: 0 0 20px!important;
                   height: 25px;
               }
               }
               
        .alice-carousel__dots {
            margin: -50px 44%!important;
        }
        }
    @media (max-width: 350px){
             .canvas {
                  width: 100%!important;
                  height: 100%!important;
                  top: 80px!important;
             }
             h1 {
                font-size: 1.3em!important;
             }
             .head {
                .count-down-wrapper {
                    margin-top: ${direction === 'rtl' ? '5%' : '10%'};
                }
                p {
                  font-size: .7em!important;
                }
                .count-down-wrapper .counter-text {
                   padding: 15px 15px 0!important;
                   font-size: .7em!important;
               }
                .count-down-wrapper .count-down-section {
                   margin-top: 5px!important;
                   font-size: 1em!important;
               }
               .count-down .numbers {
                   font-size: 1em!important;
               }
               .count-down .texts {
                  font-size: .5em!important;
               }
               .ant-btn {
                   font-size: .6em!important;
                   margin: 0 0 15px!important;
               }
               }
               
        .alice-carousel__dots {
            margin: -50px 44%!important;
        }
        }
    .head-wrapper {
        float: ${direction === 'rtl' ? 'right' : 'left'};
    }
    .elecomp-banner {
        background-image: ${direction === 'ltr'
            ? 'linear-gradient(to right bottom, #5670b9, #485c9d, #3a4982, #2c3768, #1e264f)'
            : 'linear-gradient(to left bottom, #5670b9, #485c9d, #3a4982, #2c3768, #1e264f)'};
        direction: ${direction};
        text-align: ${direction === 'rtl' ? 'right' : 'left'};
        padding: 0 6%;
        background-repeat: no-repeat, no-repeat;
        background-size: cover;    
        width: 100%;
        height: 100vh;
        font-family: iranSans;
         // animation: banner 1s ;
         @media (max-width: 576px){
             padding: 25% 25px 30%;
             height: 50vh;
        }
         @media (max-width: 360px){
             height: 60vh;
        }
        .elecomp-image{
            text-align: center;
            @media (max-width: 576px){
                img {
                    margin-top: 10px;
                    max-width: 130px;
                }
            }
        }
        .elecomp-graphic {
            width: 100%;
            margin-top: 70px;
            max-width: 500px;
        }
        img {
            width: 50%;
            margin-top: -30px;
        }
        @media(max-width: 576px){  
            img {
                margin-top: 0;
            }
        };
        .elecomp-header {
            background-color: #414f91;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 60px;
            float: ${direction === 'rtl' ? 'right' : 'left'};
            @media (max-width: 952px){
                margin-bottom: 30px;
            }
            @media (max-width: 576px){
                margin-bottom: 0;
                padding: 10px;
                h1 {
                    text-align: center !important;
                    font-size: 1.3em!important;
                }
            }
        }
        .elecomp-detail{
            margin-top: 180px; 
            float: ${direction === 'rtl' ? 'right' : 'left'};
                 @media(max-width: 768px){  
                   margin-top: 140px; 
                };
                 @media(max-width: 576px){  
                   margin-top: 0; 
                };
            h1 {
                color: white;
                text-align: ${direction === 'rtl' ? 'right' : 'left'};
                direction: ${direction};
                line-height: 1;
                font-size: ${direction === 'rtl' ? '2.5em!important' : '2.1em!important'};
                @media (max-width: 1350px){ 
                  font-size: ${direction === 'rtl' ? '2.5em!important' : '2.1em!important'};
                };
                @media (max-width: 1200px){ 
                  font-size: ${direction === 'rtl' ? '1.5em!important' : '1.1em!important'};
                };
                 @media (max-width: 952px){ 
                  font-size: ${direction === 'rtl' ? '2em!important' : '1.6em!important'};
                };
                 @media(max-width: 768px){  
                   font-size: ${direction === 'rtl' ? '1.5em!important' : '1.1em!important'};
                };
                 @media(max-width: 576px){  
                   font-size: ${direction === 'rtl' ? '.8em!important' : '.9em!important'};
                };
            }
            h1:last-child {
                margin-bottom: 0!important;
            }
            img {
                width: 20px;
                margin: ${direction === 'rtl' ? '0 0 0 10px' : '0 10px 0 0 '};
            }
            ul{
                list-style: ${direction === 'rtl' ? 'arabic-indic' : 'decimal'};
                color: white;
                padding: 0 30px;
                font-size: ${direction === 'rtl' ? '2em' : '1.6em'};
                @media (max-height: 600px){
                    font-size: ${direction === 'rtl' ? '1.6em' : '1.3em'};
                }
                @media (max-width: 1200px){
                    font-size: ${direction === 'rtl' ? '1.5em' : '1.1em'};
                }
                @media (max-width: 1100px){
                    font-size: ${direction === 'rtl' ? '1.3em' : '.9em'};
                }
                @media (max-width: 952px){
                    font-size: ${direction === 'rtl' ? '1.1em' : '.7em'};
                    margin-top: 30px;
                    padding: 65px 30px 0 10px;
                }
                 @media (max-width: 576px){
                    font-size: ${direction === 'rtl' ? '.9em' : '.7em'};
                    margin: 40px 0 10px;
                    padding: 25px 25px 0 25px;
                }
                 @media (max-width: 350px){
                    margin: 40px 0 15px;
                }
                li {
                 text-align: ${direction === 'rtl' ? 'right' : 'left'};
                 line-height: 1.5em;
                }
            }
        }
        .elecomp-footer{
            float: ${direction === 'rtl' ? 'right' : 'left'};
            .address {
                color: #00CCFF;
                font-size: ${direction === 'rtl' ? '2em' : '1.6em'};
                font-weight: bold;
                margin-top: -30px;
                .date {
                    color: white;
                    font-size: .7em;
                    margin: 0 10px;
                }
            }
            img {
                width: 20px;
                margin: ${direction === 'rtl' ? '0 0 0 10px' : '0 10px 0 0 '};
            }
                 @media(max-width: 768px){  
                    img {
                        width: 10px;
                        margin: ${direction === 'rtl' ? '0 0 0 7px' : '0 7px 0 0 '};
                    }
                    .address {
                        font-size: ${direction === 'rtl' ? '2em' : '1.6em'};
                        margin-top: 0;
                        .date {
                            margin: 0 5px;
                        }
                    }
                };
                 @media(max-width: 576px){  
                    img {
                        width: 7px;
                        margin: ${direction === 'rtl' ? '0 0 0 5px' : '0 5px 0 0 '};
                    }
                    .address {
                        font-size: ${direction === 'rtl' ? '.7em' : '.8em'};
                        margin-top: 0;
                        text-align: center;
                        .date {
                            margin: 0 5px;
                        }
                    }
                }
        }
    }
`;

const HeadStyle = WithDirection(HeadWrapper);
export default HeadStyle;
