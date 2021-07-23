import React from 'react';

import Description from '../../../Elements/Description/Description';
import EditButton from '../../../Elements/EditButton/EditButton';

const PaymentDescriptionIdentifier = ({ description, handleEdit }) => (
  <>
    <Description text={ description } />
    <EditButton name="description" handleEdit={ handleEdit } />
  </>
);

export default PaymentDescriptionIdentifier;

