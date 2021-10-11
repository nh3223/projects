import React from 'react';

import StyledListItem from './StyledListItem';
import LinkedDescription from '../LinkedDescription/LinkedDescription';
import DeleteButton from '../Buttons/DeleteButton/DeleteButton';

const ListItem = ({ path, text, id, buttonText, handleDelete }) => {

  const name = `${buttonText}-${id}`

  return (
    <StyledListItem>
      <LinkedDescription path={ path } text={ text } />
      <DeleteButton name={ name } id={ id } text={ buttonText } handleDelete={ handleDelete } />
    </StyledListItem>
  );

};

export default ListItem;