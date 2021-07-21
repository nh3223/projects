import React from 'react';

import Description from '../../../Elements/Description/Description';
import EditButton from '../../../Elements/EditButton/EditButton';

const TransactionPriceIdentifier = ({ transactionPrice, handleEdit }) => (
  <>
    <Description text={ `$${ transactionPrice }` } />
    <EditButton name="transactionPrice" handleEdit={ handleEdit } />
  </>
);

export default TransactionPriceIdentifier;