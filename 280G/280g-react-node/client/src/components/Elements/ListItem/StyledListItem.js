import styled from 'styled-components';

import { size } from '../../Styles/theme';

const { small } = size;

const StyledListItem = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: flex-between;
  margin: ${small};
  padding: 0;
  text-decoration: none;
`;

export default StyledListItem;