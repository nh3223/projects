import styled from "styled-components";

import { color, size, fontWeight } from '../../Styles/theme';

const { darkGreen, lightGold, lightGreen, mediumGold } = color;
const { tiny } = size;
const { mediumWeight } = fontWeight;

const StyledTab = styled.li`
  cursor: pointer;
  font-color: ${lightGreen};
  padding: ${tiny};
  &:active {
    background: ${mediumGold};
    color: ${darkGreen};
    font-weight: ${mediumWeight};
  }
  &:hover {
    background: ${lightGold};
  }
`;

export default StyledTab;