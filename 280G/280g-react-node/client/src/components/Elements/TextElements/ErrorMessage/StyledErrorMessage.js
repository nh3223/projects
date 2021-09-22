import styled from 'styled-components';

import { color, size } from '../../../Styles/theme';

const { red } = color;
const { small } = size;

const ErrorMessage = styled.p`
  color: ${red}
  font-size: ${small};
  margin: ${small};
  font-weight: 200;
`;

export default ErrorMessage;