import React, { useEffect, useState } from 'react';
import { parseISO, formatISO } from 'date-fns';

import StartDateIdentifier from './StartDateIdentifier';
import StartDateForm from './StartDateForm';

const StartDate = ({ executive, handleSubmit }) => {

  const [ completed, setCompleted ] = useState(false);
  const [ startDate, setStartDate ] = useState(new Date());

  const handleEdit = () => setCompleted(false);

  const handleChange = async (date) => {
    setStartDate(date);
    const editedExecutive = { ...executive, startDate: formatISO(date) }
    await handleSubmit(editedExecutive);
    setCompleted(true);
  };

  useEffect(() => {
    if (executive.startDate) {
      setStartDate(parseISO(executive.startDate));
      setCompleted(true);
    }
  }, [executive.startDate, setStartDate, setCompleted]);

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