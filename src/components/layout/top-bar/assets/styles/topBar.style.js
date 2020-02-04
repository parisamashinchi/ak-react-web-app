import styled from 'styled-components';
import WithDirection from 'containers/layouts/withDirection';

const TopBarWrapper = styled.div`
    direction: rtl;
    color: #999999;
    .default {
        .ant-layout-header {
            background: white;
        }
    }
    .ant-layout-header {
        height: 80px;
        position: fixed;
        width: 100%;
        z-index: 10;
    }
    .ant-menu {
        line-height: 77px;
        .ant-menu-submenu:hover {
          border-bottom: none;
        }
        .ant-menu-submenu-arrow {
          right:initial!important;
        }
    }
    
    .select {
        text-align: right;
        float: left;
        left: 200px;
        max-width: 400px;
        width:25%;
         @media (max-width: 1050px){ 
            width: 20%;
         }
         @media (max-width: 950px){ 
            width: 15%;
         }
        img {
            width: 25px;
            margin-right: 10px;
            margin-top: -4px;
        }
    }
    
    .ant-select {
        width: 90%;
        color: #6699FF;
        margin-top: 24px;
        .ant-select-selection {
            background-color: #EDF3FF;  
            border-color: #6699FF!important;
            i {
                color: #6699FF;
                margin-right: 0;
            }
        }
    }
    
    .vl {
        border-left: 1px solid #999999;
        height: 100%;
        margin: 0 1.5%;
    }
    li {
        img {
            width: 35px;
        }
    }
    .search {
        min-width: 200px;
        float: left;
        text-align: left;
        img {
            width: 20px;
        }
    }
    .zone-image {
        width: 40px;
    }
    .arrow-image {
        width: 15px;
    }
    .user-name {
        padding-right: 5px;
    }
    .search-input {
        direction: ltr;
    }
    .ant-menu-item-selected {
        border: none!important;
        color: #999999!important;
    }
    .ant-menu-item {
        border: none!important;
        color: #999999!important;
    }
    .ant-menu-item:hover {
        border: none!important;
    }
    .balance {
        text-align: left;
        top: -25px!important;
        line-height: 1em;
        .balance-text {
            font-size: 0.9em;
            color: #999999;
            display: block;
        }
        .unit {
            color: #999999;
            display: inline!important;
            float: inherit!important;
            padding-left: 5px;
        }
        .amount {
            direction: ltr;
            display: inline!important;
            float: inherit!important;
        }
        a {
            direction: ltr;
        }
    }
    
    .ant-menu-horizontal {
      border-bottom: 0;
    }
    
    .pull-left {
      float:left;
    }

    .profile {
    
    .ant-layout-header {
        background: #212c58!important;
    }
    .ant-menu {
        background: #212c58!important;
    }
         .ant-menu-item, .ant-menu-submenu-title{ 
              a{
                  color: #838faf;
               }
         }
         .ant-menu-submenu-title{ 
           color: #838faf;
         }
         .balance {
            .unit {
                color: #838faf;
            }
         }
    }
    .region-map {
    
    .ant-layout-header {
        background: #f0f2f5!important;
    }
    .ant-menu {
        background: #f0f2f5!important;
    }
    .ant-menu-item {
        opacity: 0;
    }
    .vl {
        opacity: 0;
    }
    .select {
        opacity: 1 !important;
    }
    }
    
    .ant-menu-horizontal > .ant-menu-item, .ant-menu-horizontal > .ant-menu-submenu {
        border-bottom: none;
       
    }
    
    .ant-menu-horizontal > .ant-menu-item-active {
        border-bottom: none;
    }
    
    .user-section {
        .anticon {
            font-size: 10px!important;
            margin-right: 5px;
            &:after , before{
            -webkit-transform: rotate(-45deg) translateX(-2px);
            -ms-transform: rotate(-45deg) translateX(-2px);
            transform: rotate(-45deg) translateX(-2px);
        }
    }
    .notification-img {
        background: transparent;
    }
    .avatar {
      top:1px!important;
    }
    }
    .bell-animate {
           -webkit-animation: btnWoggle 5s infinite;
           -moz-animation: btnWoggle 5s infinite;
           -o-animation: btnWoggle 5s infinite;
           animation: btnWoggle 5s infinite;
       }
       @-webkit-keyframes btnWoggle {
	       0% {-webkit-transform: rotate(0deg);}
	       5% {-webkit-transform: rotate(-15deg);}
	       10% {-webkit-transform: rotate(15deg);}
	       15% {-webkit-transform: rotate(-15deg);}
	       20% {-webkit-transform: rotate(15deg);}
	       25% {-webkit-transform: rotate(0deg);}
	       100% {-webkit-transform: rotate(0deg);}
       }
       @-o-keyframes btnWoggle {
	       0% {-webkit-transform: rotate(0deg);}
	       5% {-webkit-transform: rotate(-15deg);}
	       10% {-webkit-transform: rotate(15deg);}
	       15% {-webkit-transform: rotate(-15deg);}
	       20% {-webkit-transform: rotate(15deg);}
	       25% {-webkit-transform: rotate(0deg);}
	       100% {-webkit-transform: rotate(0deg);}
       }
       @keyframes btnWoggle {
	       0% {-webkit-transform: rotate(0deg);}
	       5% {-webkit-transform: rotate(-15deg);}
	       10% {-webkit-transform: rotate(15deg);}
	       15% {-webkit-transform: rotate(-15deg);}
	       20% {-webkit-transform: rotate(15deg);}
	       25% {-webkit-transform: rotate(0deg);}
	       100% {-webkit-transform: rotate(0deg);}
       }
       
`;

const TopBarStyle = WithDirection(TopBarWrapper);
export default TopBarStyle;
