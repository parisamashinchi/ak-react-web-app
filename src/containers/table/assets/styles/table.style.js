import styled from 'styled-components';
import * as colors from 'src/assets/styles/colors';
import WithDirection from 'containers/layouts/withDirection';

const TableWrapper = styled.div`
    h1 {
        font-size: 20px;
        color:#696a6c;
        margin-bottom: 0;
        margin-top: 5%;
    }
    
    .ant-pagination {
        svg {
            margin-right: 0!important;
        }
    }
    
    h2 {
        font-size: 14px;
        color:#abacb0;
    }
    
    img {
        width: 50px;
    }
    
    .ant-layout {
        background: #f6f7fc;
    }
    
    .ant-btn {
        float: right;
        //margin-top: 5%;
    }

    .ant-table-thead {
         tr {
                th {
                    color: #7381c0;
                    font-weight: 500;
                    font-size: 1.4em;
                    border-top: 1px solid #e4e0e0;
                    text-align: center;
                    .ant-table-column-sorters {
                        margin: auto;
                    }
                }
         }
    }
    
    .ant-table-thead > tr > th, .ant-table-tbody > tr {
        height: 60px;
    }
    
    .ant-table-thead > tr > th, .ant-table-tbody > tr > td {
        padding: 8px 16px;
    }
    
     .ant-table-thead > tr:first-child > th:first-child {
          border-top-left-radius: 8px;
          border-left: 1px solid #e4e0e0;
     }
     
     .ant-table-thead > tr:first-child > th:last-child {
          border-top-right-radius: 8px;
          border-right: 1px solid #e4e0e0;
     }
     
     .ant-table-tbody {
          text-align: center;
          font-size: 1em;
          &:before {
               line-height: 1.5em;
                content: "\\200C";
                display: block;
          }
          tr {
               background: white;
               border: 1px solid #e4e0e0;
               height: 57px;
               td {
                    padding: 5px 16px;
                    .empty-item {
                      margin: 10px;
                    }
               }
          }
          button {
              border: none;
              background: transparent;
              margin: 10px 0;
              color: #9d9faf;
              cursor: pointer;
              i {
                  font-size: 24px;
              }
              &:focus {
                    outline: none;
              }
          }
     }
     .ant-table-row:hover {
     transition: all 0.3s ease 0s;
     }
     
     .ant-table-placeholder {
          border: 1px solid #e4e0e0;
     }
     
     .anticon-check-circle {
          color: #57cab1;
          font-size: 24px;
     } 
       
     .anticon-minus-circle {
          color: #cbcdd6;
          font-size: 24px;
     } 
     
     .anticon-exclamation-circle {
          color: #86abf4;
          font-size: 24px;
     }
     .actionIcon {
         width: 20px!important;
         color: #cbcdd6!important;
         cursor: pointer;
     }
     .ant-empty .ant-empty-normal {
        width: 100px!important;
        margin: auto!important;
     }
     .ant-table-expanded-row {
        background: #edeff3 !important;
        td {
            padding: 5px 16px 5px 0!important;
        }
     }
     .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td {
         background: #fcfcfc;
     }
     .filters {
        height: 50px;
        span {
            float: right!important;
            margin: 0 5px;
        }
        button {
            float: right;
            margin-bottom: 20px;
            i {
                float: right;
                margin-top: 5px;
                font-size: .8em;
            }
        }
        .anticon-close-circle {
            background-color: ${colors.mediumLightBlue};
            color: white;
        }
        .anticon-calendar {
            color: white;
        }
        .ant-calendar-picker-input {
            color: white;
            background-color: ${colors.mediumLightBlue};
            border-color: ${colors.mediumLightBlue};
        }
    }
    @media (max-width: 1110px){ 
        font-size: 0.8em;
    };
    @media (max-width: 952px){ 
        font-size: 0.6em;
    };
`;

export const WithPictureStyle = styled.span`
    text-align: left;
    img {
        width: 40px!important;
        float: left;
        margin-right: 5px;
    }
    .title {
        margin-top: 5px;
        height: 20px;
    }
    .antd-pro-ellipsis-ellipsis {
        width: 50%!important;
    }
    .detail {
        font-size: 0.6em;
        color: ${colors.greyText};
        min-width: 100px;
    }
    .ant-table-thead > tr > th .ant-table-column-sorter {
        right: 10px!important;
    }
`;

export const SizeWrapper = styled.div`
    .title {
        padding-top: 12px;
    }
    .unit {
        font-size: 0.5em;
    }
`;

export const StatusStyle = styled.span`
    margin-top: 5px;
    .active-status {
        color: ${colors.activrGreen}
    }
    .inactive-status {
        color: ${colors.blue}
    }
    .shelved-status {
        color: ${colors.greyText}
    }
    .task-status {
        font-size: 0.7em;
        color: ${colors.greyText};
        margin-bottom: -5px; 
    }
    .ant-progress-outer {
        width: 75%;
    }
    .ant-progress-bg {
        height: 5px!important;
    }
    .progress-holder {
        height: 21px;
    }
`;

const TableStyle = WithDirection(TableWrapper);
export default TableStyle;
