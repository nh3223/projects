import styled from 'styled-components';

import { color, size } from '../styles/theme';

const Button = styled.button`
  background: ${color.mediumRose};
  border-color: ${color.darkGreen};
  border-radius:${size.small};
  border-width: medium;
  color: ${color.darkRose};
  cursor: pointer;
  font-size: ${size.medium};
  font-weight: 300;
  padding: ${size.small};
  text-decoration: none;
`

export default Button;

