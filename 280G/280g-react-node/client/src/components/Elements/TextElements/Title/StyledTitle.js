import styled from 'styled-components';

import { size, fontWeight } from '../../../Styles/theme';

const { extraLarge, large } = size;
const { heavyWeight } = fontWeight;

const StyledTitle = styled.h1`
  font-size: ${extraLarge};
  margin: ${large};
  font-weight: ${heavyWeight};
`;

export default StyledTitle;