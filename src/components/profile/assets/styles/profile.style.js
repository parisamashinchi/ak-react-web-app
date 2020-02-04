import styled from 'styled-components';
import WithDirection from 'containers/layouts/withDirection';
import * as images from '../images';

const ProfileWrapper = styled.div`
  .prsInfo {
   .edit-profile {
        float: right;
        background: transparent;
        border: none;
        cursor: pointer;
        position: relative;
        top: 45px;
        left: -15px;
        width: 50px;
        z-index: 1;
      &:focus {
        outline: none;
      }
      img {
        z-index: 1;
        margin-top: 7%;
        width: 40%;
        top: 30px;
        right: -45%;
        position: relative;
      }
   }
   .profile-zone {
        background-image: url(${images.backProfile});
        background-size: 100% 100% ;
        margin-bottom: 3%;
        background-repeat: no-repeat;
        height: 120px;
         @media screen and (max-width: 1300px) and (min-width: 1000px){
            padding:10px 0;
          }
        img {
          width: 120px;
          position: relative;
         @media screen and (max-width: 1300px) and (min-width: 1000px){
            width:100px;
          }
        }
        .next-zone{
          opacity:0.3;
        }
        h4 {
          color:white;
          font-size:1.4em;
          top: -70px;
          position: relative;
          text-align: center;
           @media screen and (max-width: 1300px) and (min-width: 1000px){
            top: -60px;
          }
          img{
            width: 20px;
            top: 0px;
            position: relative;
          }
        }
        .align-center{
          text-align: center;
        }
   }
   .zone-back {
      padding: 1% 3%;
      color:white;
      .zone {
        color: white;
        font-size: 1.4em;
        top: 5px;
        position: relative;
           @media screen and (max-width: 1200px) and (min-width: 1000px){
            font-size: 1em;
           }
      }
      .zone-img {
        width: 10%;
        margin-right: 3%;
      }
      pre {
        color: white;
        margin-left: 36px;
        font-size: 1.2em;
      }
      p {
        margin-bottom: 0;
        color:#6f7dab;
        font-size: 1.2em;
        img {
          width: 15px;
          margin-right: 20px;
        }
      }
     
      .contact {
        pre {
          margin-left:21px;
        }
      }
      
      h3 {
        color: white;
        margin-bottom: 5%;
        background-image: linear-gradient(to right, #3e458e, #333b7c, #29326b, #20295a, #172049);
        width: 20%;
        border-radius: 5px;
        padding: 5px 10px;
        margin-left: 3%;
        font-size: 1.2em;
      }
      .m-t-5 {
        margin-top: 5%;
      }
    }
    .notification {
      padding: 0 3% 5% 3%;
      color: white;
      h3 {
        color: white;
        background-image: linear-gradient(to right, #3e458e, #333b7c, #29326b, #20295a, #172049);
        width: 10%;
        border-radius: 5px;
        padding: 5px 10px;
        margin-left: 20px;
        font-size: 1.2em;
      }
      p{
        margin-left: 35px;
        font-size: 1.2em;
      }
      label {
        color: #9aa3c2;
        margin-right: 10%;
      }
      .ant-switch {
          background: #586492;
          margin-left: 35%;
          &:after {
            background: #7585c1;
        }
      }
      .ant-switch-checked {
          background: #2262ce!important;   
          &:after {
            background: #659eff!important;   
          }    
      }
      .ant-divider {
        height: 30px;
        top: 7px;
        position: relative;
        background: #9aa3c2;
      }
      .profile-switch {
        margin-bottom: 10px;
      }
      .ant-col-6 {
          margin-top: 2%;
      }
    }
  }
  .ant-table-thead {
      tr {
          &:first-child {
               th {
                   &:first-child {
                      border-left: 1px solid #293464;
                   }
                   &:last-child {
                      border-right: 1px solid #293464;
                   }
               }
          }
          th {
             border: 1px solid #293464;
             background: #293464;
             color: #b0b5ce;
          }
        }
   }
  .ant-table-tbody {
      tr {
          background: #293464;
          border: 1px solid #243365;
      
          td {
              border-bottom: 1px solid #2e3d70;
              color: #7381c0;
              .green-arrow {
                  color: #52c3ad;
              }
              .red-arrow {
                  color: #ff6764;
              }
          }
      }
   }
  .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td {
      background: #20305f!important;
      color: white;
   }
  .ant-pagination-item {
      background-color: #1e3d90;
      a {
        color: white;
      }
   }
   .ant-pagination-disabled a{
       border-color: #243365;
       color: grey;
    }
   .ant-pagination-prev .ant-pagination-item-link, .ant-pagination-next .ant-pagination-item-link {
       background-color: #243365;
       &:hover {
          color: white;
       }
    }
    .ant-pagination-jump-next .ant-pagination-item-container .ant-pagination-item-ellipsis, .ant-pagination-jump-prev .ant-pagination-item-container .ant-pagination-item-ellipsis {
        color: white;
    }
    .ant-pagination-next .ant-pagination-item-link, .ant-pagination-prev .ant-pagination-item-link {
        color: white;
    }
   .ant-pagination-item-link {
      border-color: #243365;
    }
   .ant-pagination-item-active {
      border-color: #40a9ff!important;
    }
   .ant-pagination-item {
      border-color: #243365;
    }
   .ant-pagination-next {
      border-color: #243365;
    }
   .wallet-img {
      background: url(${images.walletBack});
        width: 100%;
        margin: 4% 0;
        background-size: 100% 100%;
        height: 180px;
        @media (max-width: 1500px){
          height: 170px;
       }
   }
   .wallet-text{
      position: relative;
      left: 2%;
      top: 15%;
      img {
        width: 5%;
        margin-right: 4%;
      }
      h1{
       color: #609eff;
       font-size:2em; 
       @media (max-width: 1250px){
          font-size: 1.7em;
       }
       @media (max-width: 1400px){
          font-size: 1.5em;
       }
        @media (max-width: 1500px){
          font-size: 1.9em;
       }
      }
      p {
        color: white;
        font-size: 3em;
        margin-left: 9%;
        @media (max-width: 1250px){
          font-size: 1.5em;
        }
        @media (max-width: 1400px){
          font-size: 2em;
       }
        @media (max-width: 1500px){
          font-size: 2.2em;
       }
        span{
            font-size: 0.9em;
            color: #b6bfde;
            margin-left: 1%;
             @media (max-width: 1250px){
              font-size: 0.5em;;
            }
            @media (max-width: 1400px){
              font-size:0.7em;
           }
            @media (max-width: 1500px){
             font-size: 0.8em;
            }
        } 
      }
   }
   .wallet-button {
       position: relative;
       top: 33%;
       text-align: right;
       button {
            width: 32%;
            font-size: 1.8em;
            height: 60px;
             @media (max-width: 1700px)and (min-width: 1400px){ 
              font-size: 1.4em;
            }; 
            @media (max-width: 1399px) { 
              font-size: 1.2em;
              padding: 0;
            }; 
       }
   }
   .bill-button {
       text-align: right;
       margin: 2% 0;
   }
   .bill-chart {
       .ant-tabs {
          overflow: visible;
       }
       .ant-tabs-content {
          left: -35%;
          position: relative;
          width: 135%!important;
        }
       &:first-child {
          margin-right: 8%;
       }
        background-color: #243365;
        border-radius: 5px;
        padding: 1%;
        margin-top: 5%;
        h3 {
           color: #7381c0;
           margin-bottom: 2%;
           font-size: 1.3em;
           font-weight: bold;
            @media (max-width: 1500px){
               font-size: 1.2em;
               font-weight: bold;
            };
            @media (max-width: 1400px){
               font-size: 1em;
               font-weight: bold;
            };
           
        } 
          
      .ant-tabs-bar {
          border-bottom: none!important;
          margin-bottom: 0!important;
          text-align: center;
           .ant-tabs-tab{
                background: transparent!important;
                border-color: transparent!important;
                color: #8e9ac5;
                line-height: 21px!important;
                padding-left: 0!important;
                padding-left: 3px!important;
           }
           .ant-tabs-tab-active {
                color: #1890ff;
           }
           .ant-tabs-nav {
            @media (max-width: 1250px){
               font-size: 0.9em;
            };
           }
      }
      .container {
          width: 100%;
          height: 16em;
        }
       .recharts-surface , .recharts-wrapper, .recharts-legend-wrapper{
          width: 100%!important;
       }
       
       .recharts-legend-wrapper{
           bottom: 5px!important;
           font-size: 12px!important;
        }
       .recharts-text {
          fill: #8e9ac5;
          font-size: 1.6em;
       }
       .recharts-legend-item-text {
          color: #8e9ac5;
          font-size: 1.3em;
          @media (max-width: 1250px){
               font-size: 1.1em;
          };
       }
        .recharts-cartesian-axis{
         font-size: 0.7em;
            @media (max-width: 1250px){
                font-size: 0.5em;
            };
        }
        .recharts-cartesian-grid-horizontal,
         .recharts-cartesian-grid-vertical,
          .recharts-cartesian-axis-line{
            display: none;
        }
        .recharts-tooltip-cursor{
          display: none;
        }
   }
   .affiliation {
        background: url(${images.affiliation});
        background-size: 100% 100% ;
        height: calc(100vh - 80px);
        top: 80px;
        z-index:0;
        .solar-system {
            background-size: 100% ;
            height: calc(100vh - 80px);
            background-repeat: no-repeat;
            background-position: center;
         }
        .left-side {
            padding: 3% 0 5% 5%;
            h2, p , b {
              color: white;
            }
            .more {
              margin-bottom: 5%;
            }
            .status {
               margin-top: 130%;
              font-size: 1.2em;
              img {
                width: 14px;
                margin-right: 8px;
              }
              .text {
                 margin-left: 14%;
                 font-size: 0.8em;
              }
            }
        }
        .right-side {
             float: right;
              padding: 3% 5% 0 0;
             .notif {
                  background: url(${images.notifBack});
                  background-size:  100% 100%;
                  padding-top: 5% ;
                  .notif-content {
                    padding: 10% 8%;
                  }
                  h3 {
                   color: white;
                   margin-bottom: 5%;
                   
                  }
                  p {
                       color:white;
                       font-size: 1em;
                       text-align: justify;
                       margin-bottom: .5em;
                       b {
                        font-size: 1.2em;
                       }
                  }
                  img {
                    width: 5%;
                    float: right;
                    margin: 2% 5% 2% 0;
                  }
                  .ant-btn {
                      background-color: #4940C2;
                      border-color: #4940C2;
                      width: 100%;
                      font-size: 1em;
                      animation: share-display .5s;
                      margin-top: 20px;
                      padding: 6px;
                      font-size: 16px;
                      border-radius: 4px;
                      height: 40px;
                      color: white;
                      cursor: default;
                      button{
                        background: transparent;
                        border: transparent;
                        cursor: pointer;
                        width: 80%;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        &:focus {
                          outline: transparent!important;
                        }
                      }
                      &:hover {
                         color: #ffc0c9;
                      }
                      img {
                        width: 5%;
                        cursor: pointer;
                         @media (max-width: 1500px){
                            width: 7%;
                         };
                         @media (max-width: 1350px){
                            width: 7%;
                            margin: 3% 5% 2% 0;
                         };
                         @media (max-width: 1250px){
                            width: 10%;
                         };
                      }
                  }
                  .social {
                      animation: share-display .5s;
                      display: inline-flex;
                      height: 40px;
                      margin-top: 20px;
                      .ant-col-6 {
                          text-align: center;
                          img{
                              width: 61%;
                              float: none;
                         }
                      }
                  }
                  .copied {
                      position: absolute;
                      background-color: rgba(0, 0, 0, 0.75);
                      left: 170px;
                      border: 1px solid rgba(0, 0, 0, 0.75);
                      font-size: .7em;
                      color: white;
                      border-radius: 5px;
                      padding: 5px;
                  }
             }
            .invite-code {
                background: #2a396d;
                padding: 5%;
                margin-bottom: 20%;
                margin-top: 10%;
                h3 {
                   color: white;
                   text-align: center;
                }
                .check-btn {
                  background-color: #9a9eff;
                  border-color: #9a9eff;
                  margin-left: 30%;
                  width: 100%;
                  padding: 0 10px;
                  &:hover {
                      color:#9a9eff;
                      border-color:#9a9eff;
                      background: white;
                  }
                }
                .ant-input {
                  background-color:#5862aa;
                  border-color: #5862aa;
                  height: 40px;
                  margin-left: 5%;
                  color: white;
             
                }
            } 
            .btn-history {
                margin-top: 30%;
                .ant-btn {
                    width: 100%;
                    background-color: #4d53c2;
                    border-color: #4d53c2;
                   &:hover {
                       background-color:white;
                       color: #4d53c2;
                   }
                }
            }
        }
        .on-demand-error .ant-input, .on-demand-error .ant-input:hover {
          border-color: #f5222d!important;
        }
   }
   
   .ant-table-placeholder {
      background: #293464!important;
      border: none!important;
      color: white;
      .ant-empty-description {
        color: white;
      }
   }
   .change-pass{
	   margin: 0 auto;
       float: none;
       top: 200px;
       position: relative;
       text-align: center;
       label, h2 , p {
         color: white
       }
       .ant-btn{
          margin-top: 25px!important;
       }
       @media(max-height: 700px) {
          top: 130px;
       }
    }
       .pulse {
            position: absolute;
            -webkit-animation: pulseAndGo 2s;
            -moz-animation: pulseAndGo 2s;
            -o-animation: pulseAndGo 2s;
            animation: pulseAndGo 2s;
            animation-duration: 500ms; 
        }
        
       @-webkit-keyframes pulseAndGo {
        0% {-webkit-transform: scale(1);}
        25% {-webkit-transform: scale(2); opacity: .9;}
        50% {-webkit-transform: scale(3); opacity: .7;}
        75% {-webkit-transform: scale(4);opacity: .5;}
        100% { -webkit-transform: scale(5);opacity: .3;}
    }
    @-o-keyframes pulseAndGo {
      0% {-webkit-transform: scale(1);}
        25% {-webkit-transform: scale(2); opacity: .9;}
        50% {-webkit-transform: scale(3); opacity: .7;}
        75% {-webkit-transform: scale(4);opacity: .5;}
        100% { -webkit-transform: scale(5);opacity: .3;}
    }
    @keyframes pulseAndGo {
      0% {-webkit-transform: scale(1);}
        25% {-webkit-transform: scale(2); opacity: .9;}
        50% {-webkit-transform: scale(3); opacity: .7;}
        75% {-webkit-transform: scale(4);opacity: .5;}
        100% { -webkit-transform: scale(5);opacity: .3;}
    }
    .solar-animate1 , .solar-animate2 , .solar-animate3, .solar-animate4, .solar-animate5{
         position: absolute;
         z-index: -1;
         border-radius: 50%;
         background:  #131839;
     }
   .solar-animate1 {
      height: 250px;
      bottom: 31%;
      width: 250px;
      right: 27%;
      opacity: .7;
      animation: 10s MainRotation linear infinite;
    }
   .solar-animate2 {
      height: 400px;
      bottom: 18%;
      width: 400px;
      right: 13%;
      opacity: .3;
      animation: 5s reverseRotation linear infinite;
    }
   .solar-animate3 {
      height: 100px;
      bottom: 40%;
      width: 100px;
      right: 59%;
      animation: 10s Rotation linear infinite;
    }
    .solar-animate4 {
      height: 150px;
      bottom: 40%;
      width: 150px;
      right: 25%;
      animation: 10s reverseRotation linear infinite;
    }
    .solar-animate5 {
      height: 60px;
      bottom: 60%;
      width: 60px;
      right: 30%;
      animation: 10s Rotation linear infinite;
    }
    @keyframes MainRotation {
      0% {
        transform: rotate(0deg);
      }
      10% {
          border-radius: 270px 100px 170px 200px;
      }
      20% {
          border-radius: 170px 100px 170px 100px;
      }
      30% {
          border-radius: 70px 100px 270px 100px;
      }
      40% {
          border-radius: 170px 100px 170px 100px;
      }
      50% {
          border-radius: 70px 200px 170px 100px;
      }
      60% {
          border-radius: 170px 200px 70px 100px;
      }
      70% {
          border-radius: 170px 100px 70px 200px;
      }
      80% {
          border-radius: 70px 100px 170px 200px;
      }
      90% {
          border-radius: 70px 100px 170px 100px;
      }
      100% {
        transform: rotate(360deg);
      }
    }
    @keyframes Rotation {
      0% {
        transform: rotate(0deg) translate(-5%,-5%);
      }
      100% {
        transform: rotate(360deg) translate(-5%,-5%);
      }
    }
   @keyframes reverseRotation {
      0% {
        transform: rotate(360deg) translate(-1%,-1%);
      }
    
      100% {
        transform: rotate(0deg) translate(-1%,-1%);
      }
    }
   
   
   

    
   @keyframes share-display {
    0% {
        opacity: 0;
		 transform: scale(0);
         -webkit-transform: scale(0);
    }

    100% {
	   opacity: 1;
	  transform: scale(1);
	    -webkit-transform: scale(1);
	}  
	.address {
	    overflow-wrap: break-word;
	}
`;

const ProfileStyle = WithDirection(ProfileWrapper);
export default ProfileStyle;
