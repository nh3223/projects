import styled from 'styled-components';

import { size } from '../../styles/theme';

import Button from '../Button';

export const WelcomePage = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: ${size.medium}
`

export const WelcomeMessage = styled.h1`
  font-size: ${size.large};
  font-weight: 600;
  margin: 0;
  padding: 0;
`

export const WelcomeButton = styled(Button)`
  font-weight: 500;
  margin: ${size.medium}
`
