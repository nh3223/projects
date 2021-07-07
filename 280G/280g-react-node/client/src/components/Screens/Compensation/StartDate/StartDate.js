import React from 'react';

import StartDateIdentifier from './StartDateIdentifier';
import StartDateForm from './StartDateForm';

const StartDate = ({ startDate, completed, handlers: { change, edit }}) => (
  <>
    { completed
    ? <StartDateIdentifier startDate={ startDate } handleEdit={ edit }/>
    : <StartDateForm startDate={ startDate } handleChange={ change } />
    } 
  </>
);

export default StartDate;