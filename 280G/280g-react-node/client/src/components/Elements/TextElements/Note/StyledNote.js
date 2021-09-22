import styled from 'styled-components';

import { size, fontWeight } from '../../../Styles/theme';

const { small } = size;
const { lightWeight } = fontWeight;

const StyledNote = styled.p`
  font-size: ${small};
  margin: ${small};
  font-weight: ${lightWeight};
`;

export default StyledNote;