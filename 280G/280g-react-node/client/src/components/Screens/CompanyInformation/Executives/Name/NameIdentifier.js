import React from 'react';

import Description from '../../../../Elements/Description/Description';
import EditButton from '../../../../Elements/EditButton/EditButton';

const NameIdentifier = ({ name, handleEdit }) => (
  <>
    <Description text={ name } />
    <EditButton name="name" handleEdit={ handleEdit } />
  </>
);

export default NameIdentifier;