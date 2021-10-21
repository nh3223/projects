import styled from 'styled-components';

import { color, fontWeight, size } from '../../Styles/theme';

const { darkGold } = color;
const { small } = size;
const { lightWeight } = fontWeight;

const NavigationBar = styled.nav`
  background: ${darkGold};
  font-size: ${small};
  font-weight: ${lightWeight};
`;

export default NavigationBar;



