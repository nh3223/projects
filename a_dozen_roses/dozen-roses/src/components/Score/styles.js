import styled from 'styled-components';

import { color, size } from '../../styles/theme';

export const Background = styled.div`
  background-color: ${color.darkRose};
  width: ${size.long};
  height: ${size.medium};
  border-radius: ${size.extraSmall}; 
`

export const Progress = styled.div`
  background: ${color.darkGreen};
  width: ${props => props.width};
  height: ${size.medium};
  border-radius: ${size.extraSmall};
`

export const ScoreText = styled.h3`
  font-size: ${size.small};
  margin: ${size.small};
  font-weight: 300;
`

