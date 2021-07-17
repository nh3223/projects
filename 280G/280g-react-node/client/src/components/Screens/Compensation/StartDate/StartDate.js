import React from 'react';
import { parseISO } from 'date-fns';

import StartDateIdentifier from './StartDateIdentifier';
import StartDateForm from './StartDateForm';


const StartDate = ({ startDate, completed, handlers: { change, edit }}) => {
  
  const date = parseISO(startDate);
  
  return (
    <>
      { completed
      ? <StartDateIdentifier startDate={ date } handleEdit={ edit }/>
      : <StartDateForm startDate={ date } handleChange={ change } />
      } 
    </>
  );

};

export default StartDate;