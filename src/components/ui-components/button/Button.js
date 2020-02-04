import styled from 'styled-components';
import { Button } from 'antd';
import * as colors from 'src/assets/styles/colors';
import WithDirection from 'containers/layouts/withDirection';

const CustomBtn = styled(Button)`
  direction: ltr;
  &.ant-btn{
      background-color: ${props => props.color ? colors[props.color] : colors.orange};
      border-color: ${props => props.color ? colors[props.color] : colors.orange}; 
      color: ${props => props.textColor ? colors[props.textColor] : 'white'}; 
      ${props => props.fullWidth === true ? { width: '100%' } : null}
  }
  &.ant-btn:focus, .ant-btn:active {
      color: ${props => props.textColor ? colors[props.textColor] : 'white'};
      background-color: ${props => props.color ? colors[props.color] : colors.orange};
      border-color: ${props => props.color ? colors[props.color] : colors.orange}; 
  }
  &.ant-btn:hover {
      color: ${props => props.color ? colors[props.color] : colors.orange};
      background-color: ${props => props.textColor ? colors[props.textColor] : 'white'};
      border-color: ${props => props.color ? colors[props.color] : colors.orange}; 
  }

`;

const CustomButton = WithDirection(CustomBtn);
export default CustomButton;
