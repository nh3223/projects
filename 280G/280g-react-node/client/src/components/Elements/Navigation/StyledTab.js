import styled from "styled-components";

import { color, size, fontWeight } from '../../Styles/theme';

const { darkGold, lightGold, lightGreen } = color;
const { tiny } = size;
const { mediumWeight } = fontWeight;

const StyledTab = styled.li`
  cursor: pointer;
  padding: ${tiny};
  &:active {
    background: ${darkGold};
    color: ${lightGreen};
    font-weight: ${mediumWeight};
  }
  &:hover {
    background: ${lightGold};
  }
`;

export default StyledTab;