import React from 'react';

import { formatDate } from '../../../../utilities/formatDate';

import Description from '../../../Elements/Description/Description';
import Identifier from '../../../Elements/Identifier/Identifier';
import DateForm from '../../../Elements/DateForm/DateForm';

const GrantDate = ({ name, grantDate, completed, handlers: { change, edit, submit } }) => (
  <>
    <Description text="Grant Date" />
    { (completed)
    ? <Identifier name={ name } text={ formatDate(grantDate) } handleEdit={ edit } />
    : <DateForm name={ name } date={ grantDate } handleChange={ change } handleSubmit={ submit } />
    } 
  </>
);

export default GrantDate;