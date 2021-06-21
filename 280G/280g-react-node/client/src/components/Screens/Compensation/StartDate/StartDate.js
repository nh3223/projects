import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { executivesState } from '../../../../recoil/atoms/executive'

import StartDateIdentifier from './StartDateIdentifier';
import StartDateForm from './StartDateForm';

const StartDate = ({ id }) => {

  const [ executives, setExecutives ] = useRecoilState(executivesState);
  const [ executive, setExecutive ] = useState({});
  const [ startDate, setStartDate ] = useState(new Date());
  const [ completed, setCompleted ] = useState(false);

  const handleEdit = () => {
    setCompleted(false);
  };

  const handleChange = (date) => {
    setStartDate(date)
    setExecutive({ ...executive, startDate: date });
    setCompleted(true);
  };

  useEffect(() => {
    if (id) {
      const executive = executives.filter((exec) => (exec._id === id));
      setStartDate(executive.startDate);
      setCompleted(true);
    };
  }, [id, executive.startDate, setStartDate, setCompleted]);

  return (
    <>
      { completed
      ? <StartDateIdentifier date={ startDate } handleEdit={ handleEdit }/>
      : <StartDateForm date={ startDate } handleChange={ handleChange } />
      } 
    </>
  );

};

export default StartDate;