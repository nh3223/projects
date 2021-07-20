import React from 'react';

import Description from '../../../Elements/Description/Description';
import EditButton from '../../../Elements/EditButton/EditButton';

const TransactionPriceIdentifier = ({ transactionPrice, handleEdit }) => (
  <>
    <Description text={ `$${ transactionPrice }` } />
    <EditButton onClick={ handleEdit } />
  </>
);

export default TransactionPriceIdentifier;