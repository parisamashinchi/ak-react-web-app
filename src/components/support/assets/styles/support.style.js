import styled from 'styled-components';
import WithDirection from 'containers/layouts/withDirection';
import * as images from '../images';

const SupportWrapper = styled.div`
    .ant-upload-list-item:hover {
        background-color: transparent!important;
        .ant-upload-list-item-name {
            background-color: transparent!important;
        }
        .ant-upload-list-item-info {
            background-color: transparent!important;
        }
    }
    .ant-upload-list-item-name {
        width: 250px;
    }
    .content {
        margin-top: 20px;
    }
    .empty {
        margin-top: 5%;
        height: calc(100vh - 80px);
        background-color: #2E2E8C;
        text-align: center;
        padding: 100px;
        img{
          width: 60%;
        }
        p {
          font-size: 1.4em;
          color: #a8a8c8
        }
        button {
            margin-top: 10px;
        }
    }
    
    .form {
      .ant-col-18 {
        margin: 0 auto;
        position: relative;
        float: none;
      }
      .ant-upload {
         .ant-btn {
           background: white;
           color:#6699ff;
         }
       }
    }
    
    .empty-conversation {
      text-align: center;
      margin: 30% 0;
      img {
        margin-bottom: 20px;
      }
      p {
        color: #838384;
        font-size: 1.2em;
        margin-bottom: 0;
      }
    }
    
    .chat{
       padding: 0 20px;
       height: calc(100vh - 230px);
       overflow-y: scroll;
       .ant-avatar {
          margin: 7.5px 0;
       }
       ul {
          list-style: none;
          padding: 20px;
          li {
            color: white;
            .chat-text p {
              background: white;
              border-radius: 5px;
              padding: 12px 15px;
              color: black;
              border: 1px solid #e0e0e2;
              max-width: 85%;
              word-break: break-all;
              display: inline-block;
            }
            .chat-img {
              width: 100px;
              height: 100px;
              border-radius: 5px;
            }
            .chat-date {
              color : #aaabab;
              text-align: center;
              margin-top: 10px;
              margin-left: 5px;
            }
          }   
        }
        .attachment-section {
          background: white;
          width: 50%;
          height: 50px;
          padding: 6px 10px;
          border: 1px solid #e0e0e2;
          border-radius: 5px;
          margin-bottom: 13px;
          cursor: pointer;
          @media screen and (max-width: 1400px) and (min-width: 1000px){
           width: 80%;
          }
          @media screen and (max-width: 1700px) and (min-width: 1400px){
           width: 60%;
          }
          span {
            color: #131212;
            font-size: 11px;
            width: 100%;
            overflow: hidden;
            display: inline-block;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          pre {
            color: #818181;
            font-size: 11px;
          }
          img {
            width: 35px!important;
            height: 35px!important;
          }
          .anticon {
              color: gray;
              opacity: 0;
              transition: .5s;
              font-size: 1.5em;
              margin: 9px 0;
              float: right;
          }
        }
        .attachment-section:hover {
            .anticon {
              opacity: 1;
          }
        }
    }
    .chat-btns {
        padding: 40px 40px 0 40px;
       .ant-input-group-wrapper{
           .ant-input-group-addon{
                background: white;
                padding: 0;
            }
          .ant-input{
            height: 60px;
          }
          .ant-input:hover{
            border-color: #e9e9e9;
          }
          .ant-input:focus{
            border-color: #e9e9e9;
            box-shadow: none;
          }
        }
        .send-btn, .ant-upload-select .ant-btn {
          height: 58px;
          padding: 5px 20px;
          background: white;
          border: none;
          margin: 0 2px;
        }
        .ant-upload-list{
          position: absolute;
          top: -35px;
        }
        .ant-upload-list-item {
          display: inline-block;
         .ant-upload-list-item-name {
            padding: 0 22px;
         }
       }
       .ant-btn {
          background-color: white;
       }
    textarea.ant-input {
        height: 58px!important;
        width: 70%;
        border-color: white;
    }
    
          img{
            width: 25px;
          }
    }
         
    .ticket-list {
      background: #2e2e8c ;
      height: calc(100vh - 80px);
      overflow-y: scroll;
      h1 {
        color: white;
        margin: 30px 0 30px 50px;
        font-size: 1.5em;
      }
      .ant-btn {
        margin: 25px 50px;
        float: right;
      }
      .selected-ticket-item {
        background-image: url(${images.backKadr})!important;
        background-repeat: no-repeat;
        background-size: cover;
      }
      .ticket-item:hover {
          transform: scale(1.02);
          transition: .5s;
          -webkit-box-shadow: 5px 0 25px -7px rgba(0,0,0,0.65);
          -moz-box-shadow: 5px 0 25px -7px rgba(0,0,0,0.65);
          box-shadow: 5px 0 25px -7px rgba(0,0,0,0.65);
             border-bottom: 1px solid #3e3fa3;
      }
      .ticket-item {
        background-image: linear-gradient(to right, #5656c7, #5050be, #4a49b4, #4343ab, #3d3da2);
        padding: 5px 40px;
        transition: .2s;
        border-bottom: 1px solid #6868a9;
        cursor: pointer;
        h2, label {
          color: white;
          margin-bottom: 5px;
        }
        ul {
          list-style: none;
          padding: 0;
          margin-bottom: 5px;
          li {
            display: inline-block;
            color: white;
            margin-left: 10px;
            &:first-child {
              margin-left: 0;
            }
          }   
         }
      }
      .no-color {
        color: transparent;
      }
      .green-color{
        color: #65ebcc;
      }
      .blue-color {
        color : #6699ff;
      }
      .red-color {
        color : #FF9808;
      }
    }
    .on-demand-error .ant-input, .on-demand-error .ant-input:hover {
      border-color: #f5222d!important;
    }
    .move-on {
        opacity: 0;
    }
    .move-back {
        opacity: 1;
        transition: 400ms;
    }
    .show-image {
        margin-top: -80px;
        .image-content {
            background-color: white;
            height: 80px;
            border-top: 1px solid lightgray;
            .image-name {
                margin: auto;
                width: 80%;
                padding: 32px 0;
                i {
                    float: right;
                    margin-top: 4px;
                }
            }
        }
        .full-image {
            margin: 50px;
            text-align: center;
            img {
                width: 400px;
                margin-top: -200px;
            }
            .image-placeholder {
                background-image: url(${images.photo})!important;
                height: 200px;
                width: 400px;
                background-repeat: no-repeat;
                background-position: center;
            }
        }
    }
    textarea.ant-input {
      height:120px!important;
      transition: none!important;
    }
    @media (min-width: 1500px) {
        .empty {
        margin-top: 5%;
        height: calc(100vh - 80px);
        background-color: #2E2E8C;
        text-align: center;
        padding: 100px;
        img {
          width: 40%;
          margin-top: 8%;
        }
        p {
          font-size: 1.4em;
          color: #a8a8c8
        }
        button {
            margin-top: 10px;
        }
    }
    }
`;

const SupportStyle = WithDirection(SupportWrapper);
export default SupportStyle;
