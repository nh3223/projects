import React from 'react';
import { parseISO } from 'date-fns';

import VestingStartDateIdentifier from './GrantDateIdentifier';
import VestingStartDateForm from './GrantDateForm';

const VestingStartDate = ({ vestingStartDate, completed, handlers: { change, edit } }) => {

  const date = parseISO(vestingStartDate);

  return (
    <>
      { (completed)
      ? <VestingStartDateForm vestingStartDate={ date } handleChange={ change } />
      : <VestingStartDateIdentifier vestingStartDate={ date } handleEdit={ edit }/>
      } 
    </>
  );

};

export default VestingStartDate;