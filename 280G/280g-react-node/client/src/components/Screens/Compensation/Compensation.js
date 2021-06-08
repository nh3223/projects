import React from 'react';
import { useParams } from 'react-router-dom';

import StartDate from './StartDate/StartDate';
import AnnualCompensation from './AnnualCompensation/AnnualCompensation';
import FirstYearPayments from './FirstYearPayments/FirstYearPayments';

const Compensation = () => {

  const { id } = useParams();

  return (
    <>
      <h1>Executive: { id }</h1>
        <StartDate id={ id } />
        <AnnualCompensation id={ id} />
        <FirstYearPayments id={ id }/>        
    </>  
  );
};
export default Compensation;