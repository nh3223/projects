import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import StartDateIdentifier from './StartDateIdentifier';
import StartDateForm from './StartDateForm';
import { startDateState } from '../../../../recoil/atoms/compensation';

const StartDate = ({ id }) => {

  const [ startDate, setStartDate ] = useRecoilState(startDateState);
  const [ executiveStartDate, setExecutiveStartDate ] = useState(startDate[id] || new Date());
  const [ completed, setCompleted ] = useState((startDate[id]) ? true : false);

  const handleEdit = () => {
    setCompleted(false);
  };

  const handleChange = (date) => {
    setExecutiveStartDate(date)
    setStartDate({ ...startDate, [id]: date });
    setCompleted(true);
  };

  return (
    <>
      { completed
      ? <StartDateIdentifier date={ executiveStartDate } handleEdit={ handleEdit }/>
      : <StartDateForm date={ executiveStartDate } handleChange={ handleChange } />
      } 
    </>
  );

};

export default StartDate;