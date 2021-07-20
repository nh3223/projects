import React from 'react';

import Description from '../../../Elements/Description/Description';
import EditButton from '../../../Elements/EditButton/EditButton';

const CompanyNameIdentifier = ({ companyName, handleEdit }) => (
  <>
    <Description text={ companyName } />
    <EditButton name={ companyName } onClick={ handleEdit } />
  </>
);

export default CompanyNameIdentifier;