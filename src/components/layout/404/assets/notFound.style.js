import styled from 'styled-components';
import WithDirection from 'containers/layouts/withDirection';

const NotFoundWrapper = styled.div`
  text-align: center;
  padding:  15%;
  height: 100vh; 
  .stars{
    position: absolute;
    top: 50px;
    left:37%;
    z-index: -1;
  }
  .grave{
    width: 200px;
  }

  h1{
    color: #666666;
    margin: 20px;
    font-weight: bold;
  }
  span{
     font-size: 1.2em;
  }
  p{
    font-size: 1.2em;
    span{
      color: #c1c2c1;
      font-size: 1em;
    }
  }
  .ant-btn {
      margin-top: 20px;
  }
`;

const NotFoundStyle = WithDirection(NotFoundWrapper);
export default NotFoundStyle;
