import styled from 'styled-components';

import { color, fontWeight, size } from '../../../Styles/theme';

const { mediumGold, darkGold, darkGreen } = color;
const { tiny, extraSmall, small } = size;
const { mediumWeight } = fontWeight;

const StyledButton = styled.button`
  background: ${mediumGold};
  border-color: ${darkGold};
  border-radius: ${extraSmall};
  border-width: medium;
  color: ${darkGreen};
  cursor: pointer;
  font-size: ${small};
  font-weight: ${mediumWeight};
  padding: ${tiny};
  text-decoration: none;
`;

export default StyledButton;