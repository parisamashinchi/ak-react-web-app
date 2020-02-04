import styled from 'styled-components';
import WithDirection, { direction } from 'containers/layouts/withDirection';

const NavWrapper = styled.div`
   font-family: Roboto;
   position: fixed;
   width: 100%;
   @media (max-width: 576px){
      position: absolute;
   }
   .deSelect {
        color: white!important;
        a {
             color: white!important;
        }
   }
   .deSelect:hover {
        color: black!important;
        a {
             color: black!important;
        }
   }
  .ant-btn {
      font-size: 18px;
         @media (max-width: 1350px){ 
            font-size: 15px;
        };
         @media (max-width: 1110px){ 
            font-size: 14px;
        };
         @media (max-width: 952px){ 
           font-size: 10px;
           padding: 0 3px;
        };
   }
  .ant-row {
    padding: 7px 20px;
  }
  .align-right {
    text-align:right!important;
  }
  .ant-menu-dark, .ant-menu-dark .ant-menu-sub{
     background: transparent;
  }
  .ant-menu-item, .ant-menu-submenu-title{
     padding: 10px 20px;
     transition: none;
  }
  .ant-menu-horizontal {
     border-bottom: none;
     text-align: ${direction === 'rtl' ? 'left' : 'right'};
     background-color: transparent;
     .ant-menu-item {
        line-height: 49px;
        font-size: 18px;
        color:white;
        &:hover {
            border-bottom: 2px solid black;
            color: black;
            
        a {
            color: black;
        }
        }
            &:hover {
                color: black;
            }
        a {
                color: white;
        }
        a {
            color: white;
        }
     }
     li {
         &:last-child {
         padding: 10px 0;
         }
     }
     .ant-menu-item-selected {
        border-bottom:2px solid black;
        color: black;
        
        a {
            color: black;
        }
     }
        @media (max-width: 1350px){ 
          font-size: 15px;
        };
         @media (max-width: 1110px){ 
          font-size: 14px;
          padding:10px;
        };
         @media (max-width: 952px){ 
          font-size: 12px;
           padding:10px;
        };
         @media (max-width: 768px){ 
          font-size: 10px;
          padding:10px;
        };
      }
      .ant-menu-item-selected {
          border-bottom:2px solid black;
          margin: 0;
          a {
            color: black;
          }
     }
  }
  .language-switcher button{
     background: none;
     border:none;
     width:100%;
     cursor: pointer;
  }
  .hi-text {
      padding: 0 5%;
  }
  .user-name {
      padding: 0 5%;
  }
  .avatar-image {
      width: 40px;
  }
  .title-logo{
     line-height: 21px;
     color: white;
     ${direction === 'rtl' ? { 'padding-right': '5%' } : { 'padding-left': '5%' }};
     margin-top: 7%;
     text-align: ${direction === 'rtl' ? 'right' : 'left'};
        @media (max-width: 1350px){ 
          font-size: 15px;
        };
         @media (max-width: 1110px){ 
          font-size: 12px;
        };
         @media (max-width: 952px){ 
           display:none;
        };
         @media (max-width: 768px){ 
           display:none;
         }
  }
  .nav-link {
     padding: 0;
    }
  .active-public-navbar-link {
    border-bottom: none;
  } 
  .logo {
    margin: ${direction === 'rtl' ? '0 60px 0 30%;' : '0 30% 0 60px;'} 
    @media (max-width: 1200px){
        margin: 0 30% 0 30px;
    }
    @media (max-width: 576px){
      margin: 0px;
    }
    width: 150px;
     img {
        width:100%;
        height:100%;
     }
  }
  .button-section {
    .ant-menu-item-selected {
       border-bottom: none;
       a {
          color: black;       
         }
     }
    .ant-menu-item {
      &:hover ,.ant-menu-submenu:hover, .ant-menu-item-active , .ant-menu-submenu-active , .ant-menu-item-open ,.ant-menu-submenu-open,.ant-menu-item-selected , .ant-menu-submenu-selected {
        border-bottom: none;
      }
      .ant-menu-item-active {
       border-bottom: none;
      }
      a:hover {
        color: black; 
      }  
    }
     .ant-menu-horizontal > .ant-menu-item:hover, .ant-menu-horizontal > .ant-menu-submenu:hover, .ant-menu-horizontal > .ant-menu-item-active, .ant-menu-horizontal > .ant-menu-submenu-active, .ant-menu-horizontal > .ant-menu-item-open, .ant-menu-horizontal > .ant-menu-submenu-open, .ant-menu-horizontal > .ant-menu-item-selected, .ant-menu-horizontal > .ant-menu-submenu-selected {
       border-bottom: none;
  }
  }
  
  .ant-menu {
      text-align: center;
  }
  .scroll-nav{
      box-shadow: 0 1px 8px -4px black;
      background-color: white;
     .ant-menu-horizontal > .ant-menu-item ,.ant-menu-horizontal > .ant-menu-item , .ant-menu-horizontal > .ant-menu-item > a, .ant-menu-horizontal > .ant-menu-item > a , .title-logo {
        color: #999999;
    },
   .deSelect {
        color: #999999!important;
        a {
            color: #999999!important;
        }
   }
   .deSelect:hover {
        color: black!important;
        a {
            color: black!important;
        }
   }
     .ant-menu-horizontal .ant-menu-item-selected {
        border-bottom: none;
        color: black;
        a {
            color: black;!important;
        }
     }
     .ant-menu-item:hover{
        border-bottom: none;
        color: black;
        a {
            color: black;
        }
     }
    .ant-menu-horizontal > .ant-menu-item {
      border-bottom: none;
      a:hover {
        color: black; 
      }  
    }
  }
  .ant-menu-horizontal > .ant-menu-item, .ant-menu-horizontal > .ant-menu-submenu {
    border-bottom: none;
}
.ant-menu-horizontal > .ant-menu-item-active {
    border-bottom: none;
}

.log-section {
  float:  ${direction === 'rtl' ? 'left' : 'right'};
  text-align:  ${direction === 'rtl' ? 'left' : 'right'};
  .ant-menu-item {
        padding-left:  ${direction === 'rtl' ? '0' : '40px'};
        padding-right: ${direction === 'rtl' ? '40px' : '0'};
      }
   }
   
   .collapse-btn {
        display: none;
   }
   
   @media screen and (max-width: 768px) {
        .ant-menu-inline {
            .ant-menu-item {
                width: initial!important;
            }
        }
        .ant-menu {
          display: none;
          background: #384373;
          width: 100%;
          text-align: ${direction === 'rtl' ? 'right' : 'left'};
          opacity: 0.95;
          li, a {
            color: white;
          }
          button {
            background-color: transparent!important;
            border: none;
            width: inherit;
            font-size: inherit; 
          }
          .only-full-page {
              display: none;
          }
          .log-section {
            text-align:  ${direction === 'rtl' ? 'right' : 'left'}!important;
            float: none!important;
            .ant-btn{
              transition: none;
            }
          }
        }
        .scroll-nav {
            display: none;
        }
        .collapse-btn {
            display: block;
            float: ${direction === 'rtl' ? 'left' : 'right'};
            background: transparent!important;
            border: transparent;
            box-shadow: none;
            z-index: 1;
            i {
              font-size: 2em;
            }
        }
    }
    .english {
        padding-top: 5px;
    }
`;

const NavStyle = WithDirection(NavWrapper);
export default NavStyle;
