import styled from "styled-components";

import { size, fontWeight } from '../../../Styles/theme';

const { small, extraSmall } = size;
const { lightWeight } = fontWeight;

const StyledTableCell = styled.p`
  font-size: ${small};
  margin: ${extraSmall};
  font-weight: ${lightWeight};
`;

export default StyledTableCell;