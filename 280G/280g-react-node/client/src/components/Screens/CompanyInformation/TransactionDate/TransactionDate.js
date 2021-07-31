import React from 'react';

import { formatDate } from '../../../../utilities/formatDate';

import Description from '../../../Elements/Description/Description';
import Identifier from '../../../Elements/Identifier/Identifier';
import DateForm from '../../../Elements/DateForm/DateForm';

const TransactionDate = ({ name, transactionDate, completed, handlers: { edit, change, submit }}) => (
  <>
    <Description text={ 'Transaction Date: ' } />
    { (completed)
    ? <Identifier name={ name } text={ formatDate(transactionDate) } handleEdit={ edit }/>
    : <DateForm name={ name } date={ transactionDate } handleChange={ change } handleSubmit={ submit } />
    } 
  </>
);

export default TransactionDate;