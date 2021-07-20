import React from 'react';
import { format } from 'date-fns';

import Description from '../../../Elements/Description/Description';
import EditButton from '../../../Elements/EditButton/EditButton';

const TransactionDateIdentifier = ({ transactionDate, handleEdit }) => (
  <>
    <Description text={ format(transactionDate, 'd MMM yyyy') } />
    <EditButton onClick={ handleEdit } />
  </>
);

export default TransactionDateIdentifier;