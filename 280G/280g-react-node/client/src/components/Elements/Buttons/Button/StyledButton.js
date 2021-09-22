import styled from 'styled-components';

import { color, fontWeight, size } from '../../../Styles/theme';

const { mediumGold, darkGold, darkGreen } = color;
const { small, medium } = size;
const { lightWeight } = fontWeight;

const StyledButton = styled.button`
  background: ${mediumGold};
  border-color: ${darkGold};
  border-width: medium;
  color: ${darkGreen};
  cursor: pointer;
  font-size: ${medium};
  font-weight: ${lightWeight};
  padding: ${small};
  text-decoration: none;
`;

export default StyledButton;