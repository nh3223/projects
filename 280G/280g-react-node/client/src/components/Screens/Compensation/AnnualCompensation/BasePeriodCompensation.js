import React, { useState } from 'react';

import BasePeriodCompensationIdentifier from './BasePeriodCompensationIdentifier';
import BasePeriodCompensationForm from './BasePeriodCompensationForm';

const BasePeriodCompensation = ({ basePeriodCompensation, startDate, completed, handlers: { edit, change, submit } }) => {

  const [ error, setError ] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const year = Number(e.target.name);
    const compensation = Number(basePeriodCompensation[year]);
    if (compensation) {
      await submit(year, compensation);
      setError({ [year]: false });
    } else {
      setError({ [year]: true});
    }
  };

  console.log('completed', completed);

  return (
    (completed)
      ?  <>
          <h2>Annual Compensation</h2>
          { Object.entries(basePeriodCompensation).map(([year, compensation]) => (completed[year])
              ? <BasePeriodCompensationIdentifier key={ year } year={ year } compensation={ compensation } handleEdit={ edit } />
              : <BasePeriodCompensationForm key={ year } year={ year } compensation={ compensation } error={ error[year] } handleChange={ change } handleSubmit={ handleSubmit } />
          )}
        </>
      : null
  );
};

export default BasePeriodCompensation;