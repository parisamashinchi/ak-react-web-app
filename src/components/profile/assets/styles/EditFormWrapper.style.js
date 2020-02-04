import styled from 'styled-components';
import WithDirection from 'containers/layouts/withDirection';

const EditFormWrapper = styled.div`
    h3 {
        text-align: center;
        margin-bottom: 20px;
    }
    .ant-col-11 {
        margin-left: 14px;
    }
`;

const EditFormStyle = WithDirection(EditFormWrapper);
export default EditFormStyle;
