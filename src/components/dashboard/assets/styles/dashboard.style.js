import styled from 'styled-components';
import WithDirection from 'containers/layouts/withDirection';
import * as colors from 'src/assets/styles/colors';

const DashboardWrapper = styled.div`
    .graphs {
        background-color: white;
        margin: 1%;
        padding: 2%;
    }
    .graph3 {
        padding: 5%;
    }
`;

const DashboardStyle = WithDirection(DashboardWrapper);

export default DashboardStyle;
