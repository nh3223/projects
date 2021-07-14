import styled from 'styled-components';

import { color, size } from '../../styles/theme';

export const ProblemPage = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const ProblemText = styled.h1`
  font-size: ${size.large};
  font-weight: 600;
`

export const ProblemInput = styled.input`
  background-color: ${color.lightRose};
  border: none;
  color: ${color.mediumRose};
  font-size: ${size.medium};
  text-align: center;
  &:focus {
    outline: none;
  }
`