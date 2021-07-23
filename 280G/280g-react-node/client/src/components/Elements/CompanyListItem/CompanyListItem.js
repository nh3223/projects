import React from 'react';

import StyledListItem from './StyledListItem';
import LinkedDescription from '../LinkedDescription/LinkedDescription';
import DeleteButton from '../DeleteButton/DeleteButton';

const CompanyListItem = ({ company, handleDelete }) => (
  <StyledListItem>
    <LinkedDescription path={ `/company/${company._id}` } text={ company.companyName } />
    <DeleteButton name={ company._id } text="Delete Company" handleDelete={ handleDelete } />
  </StyledListItem>
);


export default CompanyListItem;