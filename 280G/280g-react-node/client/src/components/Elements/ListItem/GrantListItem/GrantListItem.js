import React from 'react';
import { useRecoilValue } from 'recoil';

import { restrictedStockGrantState } from '../../../../recoil/restrictedStock';

import StyledListItem from '../StyledListItem';
import LinkedDescription from '../../LinkedDescription/LinkedDescription';
import DeleteButton from '../../DeleteButton/DeleteButton';
import { formatDate } from '../../../../utilities/formatDate';

const GrantListItem = ({ companyId, executiveId, type, grantId, handleDelete }) => {
  
  const grant = useRecoilValue(restrictedStockGrantState(grantId));
  
  const path = `/company/${companyId}/executive/${executiveId}/${type}/${grantId}`;
  const text = `Grant Date: ${formatDate(grant.grantDate)} Shares: ${grant.numberShares}`;

  return (
    <StyledListItem>
      <LinkedDescription  path={ path } text={ text } />
      <DeleteButton name={ grant._id } text="Delete Grant" handleDelete={ handleDelete } />
    </StyledListItem>
  );

};

export default GrantListItem;