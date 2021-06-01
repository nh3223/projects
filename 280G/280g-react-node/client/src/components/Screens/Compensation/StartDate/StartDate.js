import React, { useState } from 'react';

import StartDateIdentifier from './StartDateIdentifier';
import StartDateForm from './StartDateForm';

const StartDate = ({ startDate, handleDateChange }) => {

  const [ completed, setCompleted ] = useState(false);

  const handleEdit = () => {
    setCompleted(false);
  };

  const handleChange = (startDate) => {
    handleDateChange();
    setCompleted(true);
  };

  return (
    <>
      { completed
      ? <StartDateIdentifier startDate={ startDate } handleEdit={ handleEdit }/>
      : <StartDateForm startDate={ startDate } handleChange={ handleChange } />
      } 
    </>
  );

};

export default StartDate;