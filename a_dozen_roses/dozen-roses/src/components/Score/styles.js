import styled from 'styled-components';

import { color, size } from '../../styles/theme';

export const Background = styled.div`
  background-color: ${color.darkRose};
  width: ${size.long};
  height: ${size.medium};
  border-radius: ${size.extraSmall};
`

export const Progress = styled.div`
  align-items: center;
  background: ${color.darkGreen};
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: ${props => props.width};
  height: ${size.medium};
  border-radius: ${size.extraSmall};
`

export const ScoreText = styled.h3`
  color: ${color.lightGreen};
  font-size: ${size.small};
  margin: 0;
  font-weight: 300;
`

