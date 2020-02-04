import styled from 'styled-components';
import WithDirection from 'containers/layouts/withDirection';

const PageHeaderWrapper = styled.div`
    .header-row {
        ul {
            list-style: none;
            padding-left: 0;
            color: #999cba;
            li {
                span {
                   float: right;
                }
            }
        }
    }
    
    .text-wrapper {
        float: left;
        margin-left: 12px;
    }
    
    .header-title {
        font-size: 1.5em;
        color:#696a6c;
        margin-top: 43px;
        margin-bottom: 0;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap
    }
    
    .header-desc {
        font-size: 0.95em;
        color: #abacb0;
        margin-bottom: 0!important;
    }
    
     .header-status {
        font-size: 14px;
        color: #7398ff;
    }
    
    .header-img {
        height: 75px;
        width: 75px;
        margin: 33px 0;
        float: left;
    }
    
    #create-button {
        float: right;
        margin: 43px 0 ;
        height: 50px;
        min-width: 150px;
    }
    
    .instance-detail-button {
        width: 160px!important;
        font-size: 1em;
    }
    
    .btn-wrapper {
        float: right;
    }
    
    .fa-circle{
        font-size:12px;
        margin-right: 10px;
    }
    
    .ant-layout-content {
        margin-left: 4%;
    }
  
`;

const PageHeaderStyle = WithDirection(PageHeaderWrapper);
export default PageHeaderStyle;
