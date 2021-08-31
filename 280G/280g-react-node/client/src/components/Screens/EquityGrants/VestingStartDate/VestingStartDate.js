import React from 'react';

import { formatDate } from '../../../../utilities/formatDate';

import Description from '../../../Elements/Description/Description';
import Identifier from '../../../Elements/Identifier/Identifier';
import DateForm from '../../../Elements/DateForm/DateForm';

const VestingStartDate = ({ name, vestingStartDate, completed, handlers: { change, edit, submit } }) => (
  <>
    <Description text="Vesting Start Date: " />
    { (completed)
    ? <Identifier name={ name } text={ formatDate(vestingStartDate) } handleEdit={ edit }/>
    : <DateForm name={ name } date={ vestingStartDate } handleChange={ change } handleSubmit={ submit }/>
    } 
  </>
);

export default VestingStartDate;