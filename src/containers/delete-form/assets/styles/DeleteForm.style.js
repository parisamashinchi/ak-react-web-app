import styled from 'styled-components';
import WithDirection from 'containers/layouts/withDirection';

const DeleteVolumeWrapper = styled.div`
    .text {
        margin: 20px 0;
        text-align: left;
        .name {
            padding-right: 5px;
            font-weight: bold;
            font-size: 1.1em;
        }
    }
`;

const DeleteFormStyle = WithDirection(DeleteVolumeWrapper);
export default DeleteFormStyle;
