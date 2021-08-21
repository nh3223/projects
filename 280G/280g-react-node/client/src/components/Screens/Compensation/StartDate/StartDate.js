import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { startDateState } from '../../../../recoil/compensation';
import { editExecutive } from '../../../../api/executive/editExecutive';
import { stringify, formatDate } from '../../../../utilities/formatDate';

import Description from '../../../Elements/TextElements/Description/Description';
import Identifier from '../../../Elements/Identifier/Identifier';
import DateForm from '../../../Elements/Forms/DateForm/DateForm';

const StartDate = ({ executiveId }) => {

  const [ startDate, setStartDate ] = useRecoilState(startDateState(executiveId));
  const [ completed, setCompleted ] = useState(true);
  const [ edit, setEdit ] = useState(false);

  const handleChange = async (date) => {
    await editExecutive(executiveId, { startDate: date });
    setStartDate(stringify(date));
    setCompleted(true);
    setEdit(false);
  };

  const handleEdit = () => {
    setCompleted(false);
    setEdit(true);
  };

  useEffect(() => (startDate && !edit) ? setCompleted(true) : setCompleted(false), [startDate, edit, setCompleted]);

  return (
    <>
      <Description text="Employment Start Date:" />
      { completed
      ? <Identifier text={ (startDate) ? formatDate(startDate) : '' }  handleEdit={ handleEdit }/>
      : <DateForm date={ startDate } handleChange={ handleChange } />
      } 
    </>
  );

};
export default StartDate;