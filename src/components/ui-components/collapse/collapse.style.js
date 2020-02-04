import styled from 'styled-components';
import { Collapse } from 'antd';
import WithDirection from 'containers/layouts/withDirection';

const CollapseStyle = styled(Collapse)`

`;

const CollapseWrapper = WithDirection(CollapseStyle);
export default CollapseWrapper;
