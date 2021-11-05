import React from 'react';

import StyledDescription from './StyledDescription';

const Description = ({ text, size = 1 }) => <StyledDescription size={ size }>{ text }</StyledDescription>

export default Description;