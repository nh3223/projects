import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import { vestingStartDateState } from '../../../../recoil/equityGrant';
import { stringify, formatDate } from '../../../../utilities/date/date';
import { editGrant } from '../../../../api/equityGrant/editGrant';

import Description from '../../../Elements/TextElements/Description/Description';
import Identifier from '../../../Elements/Identifier/Identifier';
import DateForm from '../../../Elements/Forms/DateForm/DateForm';
import SingleLineLayout from '../../../Elements/Layouts/SingleLineLayout';

const VestingStartDate = ({ grantId }) => {
  
  const [ date, setDate ] = useRecoilState(vestingStartDateState(grantId));
  const [ completed, setCompleted ] = useState((date) ? true : false);

  const handleChange = async (value) => {
    const vestingStartDate = stringify(value);
    await editGrant(grantId, { vestingStartDate });
    setDate(vestingStartDate);
    setCompleted(true);
  };

  const handleEdit = () => setCompleted(false);

  return (

    <SingleLineLayout>
      <Description text={ 'Vesting Start Date: ' } />
      { (completed)
      ? <Identifier text={ (date) ? formatDate(date) : '' } handleEdit={ handleEdit }/>
      : <DateForm date={ date } handleChange={ handleChange } />
      } 
    </SingleLineLayout>

  );

};

export default VestingStartDate;