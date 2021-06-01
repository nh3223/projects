import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import StartDate from './StartDate/StartDate';
import AnnualCompensation from './AnnualCompensation/AnnualCompensation';
import FirstYearPayments from './FirstYearPayments/FirstYearPayments'

const Compensation = () => {

  const [ startDate, setStartDate ] = useState(new Date());
  const [ compensation, setCompensation ] = useState([]);
  const [ firstYearPayments, setFirstYearPayments ] = useState(0);

  const { executive_id } = useParams();

  const handleDateChange = (startDate) => {
    setStartDate(startDate)
  };

  return (
    <>
      <h1>{ executive_id }</h1>
      <StartDate startDate={ startDate } handleDateChange={ handleDateChange }/>
      <AnnualCompensation startDate={ startDate }/>
      <FirstYearPayments />
    </>  
  );
};
export default Compensation;