import styled from 'styled-components';

import { size, fontWeight } from '../../../Styles/theme';

const { medium } = size;
const { mediumWeight } = fontWeight;

const StyledLoadingMessage = styled.p`
  font-size: ${medium}};
  margin: ${medium};
  font-weight: ${mediumWeight};
`;

export default StyledLoadingMessage;