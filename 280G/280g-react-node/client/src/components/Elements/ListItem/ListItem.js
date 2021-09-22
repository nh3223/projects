import React from 'react';

import StyledListItem from '../StyledListItem';
import LinkedDescription from '../../LinkedDescription/LinkedDescription';
import DeleteButton from '../../DeleteButton/DeleteButton';

const ListItem = ({ path, text, buttonText, handleDelete }) => (
  <StyledListItem>
    <LinkedDescription path={ path } text={ text } />
    <DeleteButton name={ buttonText } text={ buttonText } handleDelete={ handleDelete } />
  </StyledListItem>
);

export default ListItem;