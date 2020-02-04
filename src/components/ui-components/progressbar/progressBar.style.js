import styled from 'styled-components';
import { Progress } from 'antd';
import WithDirection from 'containers/layouts/withDirection';
const Direction = 'rtl';
const ProgressBarWrapper = styled(Progress)`
  &.ant-progress-success-bg, .ant-progress-bg{
      background-color: #5abdfa;
      border-color:#5abdfa; 
      width:100%
      ${Direction === 'rtl' ? { float: 'right' } : 'left'};
  }
  .ant-progress-inner{
      background-color: #1E264F;
  }
`;

const ProgressBarWithStyle = WithDirection(ProgressBarWrapper);
export default ProgressBarWithStyle;
