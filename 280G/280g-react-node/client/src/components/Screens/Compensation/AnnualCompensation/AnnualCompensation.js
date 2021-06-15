import React, { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getYear } from 'date-fns';

import AnnualCompensationIdentifier from './AnnualCompensationIdentifier';
import AnnualCompensationForm from './AnnualCompensationForm';
import { startDateState, annualCompensationState } from '../../../../recoil/atoms/compensation';

const getYears = (startDate) => {
  const startYear = getYear(startDate);
  const currentYear = getYear(new Date())
  const firstCompensationYear = (startYear === currentYear) ? startYear : (startYear < currentYear - 5) ? currentYear - 5 : startYear;
  const lastCompensationYear = (startYear === currentYear) ? startYear : currentYear - 1;
  const basePeriod = [];
  for (let year=firstCompensationYear; year <= lastCompensationYear; year++) { 
    basePeriod.push(year);
  }
  return basePeriod;
}

const getCompensation = (years, executiveCompensation) => {
  let compensation = {};
  for (const year of years) {
    compensation[year] = {
      compensation: (executiveCompensation) ? executiveCompensation[year] || '' : '',
      completed: (executiveCompensation) ? (executiveCompensation[year]) ? true : false : false,
      edit: false
    };
  }
  return compensation;
};

const AnnualCompensation = ({ id }) => {

  const startDate = useRecoilValue(startDateState);
  const [ annualCompensation, setAnnualCompensation ] = useRecoilState(annualCompensationState);  

  const [ compensation, setCompensation ] = useState({});

  const handleEdit = (name) => {
    const year = compensation[name];
    year.edit = true;
    setCompensation({...compensation, [name]: year});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const year = compensation[e.target.name];
    year.completed = true;
    year.edit = false;
    setCompensation({...compensation, [e.target.name]: year });
    const annualComp = {}
    for (const year in compensation) {
      annualComp[year] = compensation[year].compensation
    }
    setAnnualCompensation({...annualCompensation, [id]: annualComp});
  };

  const handleChange = ({ target: { name, value }}) => {
    const year = compensation[name];
    year.compensation = value;
    setCompensation({...compensation, [name]: year});
  };

  useEffect(() => {
    const years = (getYears(startDate[id]));
    setCompensation(getCompensation(years, annualCompensation[id]));
  }, [startDate]);

  return (
    <>
      <h2>Annual Compensation</h2>
      { Object.entries(compensation).map(([key, value]) => (value.completed)
          ? <AnnualCompensationIdentifier key={ key } year={ key } compensation={ value.compensation } edit={ value.edit } handleEdit={ handleEdit } handleChange={ handleChange } handleSubmit={ handleSubmit } />
          : <AnnualCompensationForm key={ key } year={ key } compensation={ value.compensation } handleChange={ handleChange } handleSubmit={ handleSubmit } />
      )}
    </>
  );
};

export default AnnualCompensation;