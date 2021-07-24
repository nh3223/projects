import React from 'react';

import StyledIdentifier from './StyledIdentifier';
import Description from '../Description/Description';
import EditButton from '../EditButton/EditButton';

const Identifier = ({ text, name, handleEdit }) => (
  <StyledIdentifier>
    <Description text={ text } />
    <EditButton name={ name } handleEdit={ handleEdit } />
  </StyledIdentifier>
);

export default Identifier;