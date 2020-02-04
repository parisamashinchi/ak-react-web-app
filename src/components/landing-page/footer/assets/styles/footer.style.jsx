import styled from 'styled-components';
import WithDirection, { direction } from 'containers/layouts/withDirection';
import footer from '../images/footer-background.png';

const footerWrapper = styled.div`
    .footer-wrapper {
        max-width: 1300px;
        margin: auto;
    }
 .footer-1 {
    text-align:${direction === 'rtl' ? 'right' : 'left'};
    background-color: #f8f8f8 ;
    background-size: cover;
    padding: 60px 10% 50px;
    .ant-col-md-5 , .ant-col-xxl-6 {
      float: ${direction === 'rtl' ? 'right' : 'left'};
    }
     li {
        list-style: none;
        line-height: 2;
        font-size: 1.1em;
        color: #666666;
        cursor:pointer;
       
        i {
         ${direction === 'rtl' ? { 'margin-left': '5%' } : { 'margin-right': '5%' }};
        }
        a {
          color: #666666;
          &:focus {
            text-decoration: none;
          }
        }
        p {
           font-size: 1em;
           ${direction === 'rtl' ? { 'margin-right': '9%' } : { 'margin-left': '9%' }};
          
        }
     }
     .align-center {
        text-align: center;
     }
     h3 {
        color: #666666;
     }
     .ant-form-item {
        margin-bottom: 15px;
     }
     .ant-input {
        ${direction === 'rtl' ? { direction: 'rtl' } : ''};
     }
 }
 
 .footer-2 {
    font-family: Roboto;
    background-color: white ;
    text-align: center;
    font-size: 18px;
     i {
        margin:${direction === 'rtl' ? '30px 20px 30px 9px' : '30px 9px 30px 20px'};
        color:#b3b3b3;
     }
     a {
        color:inherit;
     }
     ul {
        margin-bottom:0;
        li {
           display: inline;
        }
     }
  }
  
  .footer-3 {
    ${direction === 'rtl' ? { 'text-align': 'right' } : ''};
     padding: 60px 7%;
     background-image: url(${footer});
     background-size: 100% 100%;
    .text {
        margin-top: 7px;
    }
     p {
        color: white;
        font-weight: 100;
        text-align: justify;
     }
     .logo{
        text-align:  ${direction === 'rtl' ? 'left' : 'right'};
        @media (max-width: 768px){
            text-align: center;
        };
        img {
          width : 13%;
          height : 13%;
          padding: 20px;
          max-width: 100px;
          @media (max-width: 1600px){
             width : 20%;
             height : 20%;
          };
          @media (max-width: 1400px){
             width : 25%;
             height : 25%;
          };
          @media (max-width: 1200px){
             width : 25%;
             height : 25%;
             padding: 10px;
          };
          @media (max-width: 992px){
             width : 30%;
             height : 30%;
             padding: 10px;
          };
          @media (max-width: 768px){
             width : 15%;
             height : 15%;
          };
           @media (max-width: 576px){
             width : 16%;
             height : 16%;
          };
        }
     }
     .copyright  {
        font-size: 12px;
        color: #dbdde7;
        margin-top: 3%;
        position: relative;
     }
  }
  .ant-layout-footer {
    font-size: 15px;
  }
  
  .mt-md {
      margin: 40% 0;
  }
  .mt-lg {
      margin: 35% 0;
  }
  .mt-sm {
      margin: 45% 0;
  }
`;

const FooterStyle = WithDirection(footerWrapper);
export default FooterStyle;
