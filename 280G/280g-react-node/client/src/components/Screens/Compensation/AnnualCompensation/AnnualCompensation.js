import React, { useEffect, useState } from 'react';
import { parseISO } from 'date-fns';

import AnnualCompensationIdentifier from './AnnualCompensationIdentifier';
import AnnualCompensationForm from './AnnualCompensationForm';

import { getYears, getCompensation } from '../../../../utilities/getCompensation';

const AnnualCompensation = ({ executive, handleSubmit }) => {

  const [ compensation, setCompensation ] = useState({});

  const handleEdit = (name) => {
    const year = Number(name);
    const annualCompensation = { ...compensation[year] };
    annualCompensation.edit = true;
    setCompensation({...compensation, [year]: annualCompensation});
  };

  const handleAnnualCompensation = async (e) => {
    e.preventDefault();
    const year = Number(e.target.name);
    const annualCompensation = compensation[year];
    const comp = Number(annualCompensation.compensation);
    if (comp) {
      annualCompensation.compensation = comp;
      annualCompensation.completed = true;
      annualCompensation.edit = false;
      annualCompensation.error = false;
      const executiveCompensation = { ...compensation, [year]: annualCompensation };
      setCompensation(executiveCompensation);
      const editedExecutive = { ...executive, compensation: Object.values(executiveCompensation) };
      await handleSubmit(editedExecutive);
    } else {
      annualCompensation.error = true;
      setCompensation({ ...compensation, [year]: annualCompensation })
    }

  };

  const handleChange = ({ target: { name, value }}) => {
    const year = Number(name);
    let annualCompensation = { ...compensation[year] };
    console.log(annualCompensation);
    annualCompensation.compensation = value;
    setCompensation({ ...compensation, [year]: annualCompensation });
  };

  useEffect(() => {
    if (Object.keys(compensation).length === 0) {
      const years = (executive.startDate) ? (getYears(parseISO(executive.startDate))) : [];
      const executiveCompensation = (executive.compensation) ? getCompensation(years, executive.compensation) : getCompensation(years, []);
      setCompensation(executiveCompensation);
    }
  }, [executive.startDate, executive.compensation, compensation ]);

  console.log('compensation', compensation);

  return (
    <>
      <h2>Annual Compensation</h2>
      { Object.values(compensation).map((year) => (year.completed)
          ? <AnnualCompensationIdentifier key={ year.year } year={ year } handleEdit={ handleEdit } handleChange={ handleChange } handleSubmit={ handleAnnualCompensation } />
          : <AnnualCompensationForm key={ year.year } year={ year.year } compensation={ year.compensation } error={ year.error } handleChange={ handleChange } handleSubmit={ handleAnnualCompensation } />
      )}
    </>
  );
};

export default AnnualCompensation;