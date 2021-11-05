import React from 'react';

import StyledIdentifier from './StyledIdentifier';
import Description from '../TextElements/Description/Description';
import EditButton from '../Buttons/EditButton/EditButton';

const Identifier = ({ name, text, size = 1, handleEdit }) => (
  <StyledIdentifier size={ size }>
    <Description text={ text } />
    <EditButton name={ name } handleEdit={ handleEdit } />
  </StyledIdentifier>
);

export default Identifier;