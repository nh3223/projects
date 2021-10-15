import styled from 'styled-components';

import { size, fontWeight } from '../../../Styles/theme';

const { large, medium } = size;
const { heavyWeight } = fontWeight;

const StyledNavigationTitle = styled.h2`
  font-size: ${large};
  margin: ${medium};
  font-weight: ${heavyWeight};
`;

export default StyledNavigationTitle;