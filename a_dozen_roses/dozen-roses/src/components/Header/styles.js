import styled from 'styled-components';

import { color, size } from '../../styles/theme';

import Button from '../Button';

export const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 90%;
  height: ${size.extraLarge};
  margin: 0 auto;
  align-items: center;
  border: none;
  border-bottom: medium;
  border-bottom-style: solid;
  border-color: ${color.darkGreen};
`

export const Title = styled.h2`
  font-size: ${size.medium};
  font-weight: 500;
  margin: 0;
  position: absolute;
  left: 5%
`

export const HeaderButton = styled(Button)`
  border-radius:${size.extraSmall};
  border-width: small;
  font-size: ${size.small};
  padding: ${size.extraSmall};
  position: absolute;
  right: 5%
`