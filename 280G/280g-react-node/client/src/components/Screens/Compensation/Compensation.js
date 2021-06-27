import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import StartDate from './StartDate/StartDate';
import AnnualCompensation from './AnnualCompensation/AnnualCompensation';
import FirstYearPayments from './FirstYearPayments/FirstYearPayments';
import { executiveState } from '../../../recoil/executive';
import { fetchExecutive, editExecutive } from '../../../api/executive';

const Compensation = () => {

  const { id } = useParams();

  const [ executive, setExecutive ] = useRecoilState(executiveState(id));

  const handleSubmit = async (editedExecutive) => {
    await editExecutive(editedExecutive);
    setExecutive(editedExecutive);
  };

  useEffect(() => {
    const getExecutive = async () => {
      const executiveData = await fetchExecutive(id);
      setExecutive(executiveData);
    };
    if (Object.keys(executive).length === 0) getExecutive();
  });

  console.log('compensation', id, executive);

  return (
    <>
      <h1>Executive: { executive.name }</h1>
        <StartDate executive={ executive } handleSubmit={ handleSubmit } />
        <AnnualCompensation executive={ executive } handleSubmit={ handleSubmit } />
        <FirstYearPayments executive={ executive } handleSubmit={ handleSubmit } />        
    </>  
  );
};
export default Compensation;