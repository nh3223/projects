import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import { startDateState } from '../../../../recoil/compensation';
import { editCompensation } from '../../../../api/compensation/editCompensation';
import { stringify, formatDate } from '../../../../utilities/date/date';

import SingleLineLayout from '../../.../../../Elements/Layouts/SingleLineLayout';
import Description from '../../../Elements/TextElements/Description/Description';
import Identifier from '../../../Elements/Identifier/Identifier';
import DateForm from '../../../Elements/Forms/DateForm/DateForm';

const StartDate = ({ executiveId }) => {

  const [ startDate, setStartDate ] = useRecoilState(startDateState(executiveId));
  const [ completed, setCompleted ] = useState((startDate) ? true : false);

  const handleChange = async (date) => {
    await editCompensation(executiveId, { startDate: date });
    setStartDate(stringify(date));
    setCompleted(true);
  };

  const handleEdit = () => {
    setCompleted(false);
  };

  return (
    <SingleLineLayout>
      <Description text="Employment Start Date:" />
      { completed
      ? <Identifier text={ (startDate) ? formatDate(startDate) : '' }  handleEdit={ handleEdit }/>
      : <DateForm date={ startDate } handleChange={ handleChange } />
      } 
    </SingleLineLayout>
  );

};
export default StartDate;