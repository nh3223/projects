import React from 'react';

import StyledListItem from './StyledListItem';
import LinkedDescription from '../../LinkedDescription/LinkedDescription';
import DeleteButton from '../../DeleteButton/DeleteButton';

const GrantListItem = ({ companyId, executiveId, type, grant, handleDelete }) => (
  <StyledListItem>
    <LinkedDescription path={ `/company/${companyId}/executive/${executiveId}/${type}/${grant._id}` } text={ `Grant Date: ${grant.grantDate} Shares: ${grant.numberShares}` } />
    <DeleteButton name={ grant._id } text="Delete Grant" handleDelete={ handleDelete } />
  </StyledListItem>
);

export default GrantListItem;