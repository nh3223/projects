import React, { useState } from 'react';
import { getYear } from 'date-fns';

import AnnualCompensationIdentifier from './AnnualCompensationIdentifier';
import AnnualCompensationForm from './AnnualCompensationForm';

const getCompensationYears = (startDate) => {
  const startYear = getYear(startDate);
  const currentYear = getYear(new Date())
  const firstCompensationYear = (startYear === currentYear) ? startYear : (startYear < currentYear - 5) ? currentYear - 5 : startYear;
  const lastCoompensationYear = (startYear === currentYear) ? startYear : currentYear - 1;
  const compensationYears = []
  for (let year=firstCompensationYear; year <= lastCoompensationYear; year++) {
    const compensationYear = { 
      year, 
      compensation: 0, 
      completed: false 
    };
    compensationYears.push(compensationYear);
  }
  return compensationYears;
}

const AnnualCompensation = ({ startDate }) => {

  const [ compensationYears, setCompensationYears ] = useState(getCompensationYears(startDate));

  const handleSubmit = (e) => {

  };

  const handleChange = (e) => {

  };

  return (
    <>
      <h2>Annual Compensation</h2>
      { compensationYears.map((compensationYear) => (compensationYear.completed)
          ? <AnnualCompensationIdentifier />
          : <AnnualCompensationForm compensationYear={ compensationYear } handleChange={ handleChange } handleSubmit={ handleSubmit } />
      )}
    </>
  );
};

export default AnnualCompensation;