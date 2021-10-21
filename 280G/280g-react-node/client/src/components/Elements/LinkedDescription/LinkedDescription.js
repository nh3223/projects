import React from 'react';

import StyledLink from './StyledLink';
import Description from '../TextElements/Description/Description';

const LinkedDescription = ({ path, text }) => (
  <StyledLink to={ path }>
    <Description text={ text } />
  </StyledLink>
);

export default LinkedDescription;