import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import { grantDateState } from '../../../../recoil/equityGrant';
import { stringify, formatDate } from '../../../../utilities/date/date';
import { editGrant } from '../../../../api/equityGrant/editGrant';

import Description from '../../../Elements/TextElements/Description/Description';
import Identifier from '../../../Elements/Identifier/Identifier';
import DateForm from '../../../Elements/Forms/DateForm/DateForm';
import SingleLineLayout from '../../../Elements/Layouts/SingleLineLayout';

const GrantDate = ({ grantId }) => {
  
  const [ date, setDate ] = useRecoilState(grantDateState(grantId));
  const [ completed, setCompleted ] = useState((date) ? true : false);

  const handleChange = async (value) => {
    const grantDate = stringify(value);
    await editGrant(grantId, { grantDate });
    setDate(grantDate);
    setCompleted(true);
  };

  const handleEdit = () => setCompleted(false);

  return (
    <SingleLineLayout>
      <Description text={ 'Grant Date: ' } />
      { (completed)
      ? <Identifier text={ (date) ? formatDate(date) : '' } handleEdit={ handleEdit }/>
      : <DateForm date={ date } handleChange={ handleChange } />
      } 
    </SingleLineLayout>
  );

};

export default GrantDate;