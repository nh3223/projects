import React from 'react';

import Description from '../../../Elements/Description/Description';
import EditButton from '../../../Elements/EditButton/EditButton';
import DeleteButton from '../../../Elements/DeleteButton/DeleteButton';

const PaymentAmountIdentifier = ({ amount, handleEdit, handleDelete }) => (
  <>
    <Description text={ `$${amount}` } />
    <EditButton name="amount" handleEdit={ handleEdit } />
    <DeleteButton text="Delete Payment" handleDelete={ handleDelete } />
  </>
);

export default PaymentAmountIdentifier;

