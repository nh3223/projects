import React from 'react';

import Description from '../../../../Elements/Description/Description';
import EditButton from '../../../../Elements/EditButton/EditButton';
import DeleteButton from '../../../../Elements/DeleteButton/DeleteButton';

const TitleIdentifier = ({ title, handleEdit, handleDelete }) => (
  <>
    <Description text={ title } />
    <EditButton name="title" handleEdit={ handleEdit } />
    <DeleteButton text="Delete Executive" handleDelete={ handleDelete } />
  </>
);

export default TitleIdentifier;