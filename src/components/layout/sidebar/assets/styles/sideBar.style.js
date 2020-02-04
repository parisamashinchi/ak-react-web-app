import styled from 'styled-components';
import * as colors from 'src/assets/styles/colors';
import WithDirection from 'containers/layouts/withDirection';

const SideBarWrapper = styled.div`
  .logo {
      text-align: center;
      margin: 25px;
      img {
        width: 50%;
        -webkit-filter: opacity(.4) drop-shadow(0 0 0 #0174FF);
        filter: opacity(.4) drop-shadow(0 0 0 #0174FF);
      }
  }
  .ant-menu-dark .ant-menu-inline.ant-menu-sub {
      background: #13225A!important;
  }
  
 .sidebar {
     background : ${colors.darkBlue};
     overflow: auto;
     height: 100vh; 
     position: fixed;
     left: 0;
     z-index: 15;
   
  }
 
 .side-btn {
     margin: 20px 35px;
 }

 .ant-menu-dark , .ant-menu-dark .ant-menu-inline {
    background : ${colors.darkBlue};
    color: rgba(255, 255, 255, 0.65);
    .ant-menu-item {
      color: rgba(255, 255, 255, 0.65);
    }
    img {
        width: 25px;
        padding-right: 10px;
    }
  }
  .ant-menu-dark .ant-menu-inline.ant-menu-sub {
    background : ${colors.darkBlue};
    color: rgba(255, 255, 255, 0.65);
    box-shadow: none;
    .ant-menu-item {
      color: ${colors.greyText};
      padding-left: 40px!important;
          &:last-child {
        margin-bottom: 0;
      }  
      &:first-child {
        margin-top: 0;
      }
    }
    .number {
        padding-right: 5px;
    }
  }
  .ant-menu.ant-menu-dark .ant-menu-submenu-open .ant-menu-item-selected {
      background-color: transparent;
      color: rgba(255, 255, 255, 0.65);
      a {
          color: rgba(255, 255, 255, 0.65);
      }
   }
  .ant-menu.ant-menu-dark .selected, .ant-menu-submenu-popup.ant-menu-dark .selected {
    background-image : linear-gradient(to left, #2c3f76, #2a3c71, #29386c, #0e1f4f, #0e1f4f);
    color: ${colors.blue}!important;
    border-right: 5px solid ${colors.blue};
    a {
        color: ${colors.blue};
    }
    img {
        -webkit-filter: opacity(.4) drop-shadow(0 0 0 #0174FF);
        filter: opacity(.4) drop-shadow(0 0 0 #0174FF);
    }
  }
    .beta {
      color: red;
      position: relative;
      top: -24px;
      color: #f64848;
      left: 25px;
      font-size: 10px;
     }
`;

const SideBarStyle = WithDirection(SideBarWrapper);
export default SideBarStyle;
