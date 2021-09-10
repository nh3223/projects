import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import { cliffDurationState } from '../../../../recoil/equityGrant';
import { editGrant } from '../../../../api/equityGrant/editGrant';

import SingleLineLayout from '../../../Elements/Layouts/SingleLineLayout';
import Description from '../../../Elements/TextElements/Description/Description';
import Identifier from '../../../Elements/Identifier/Identifier';
import InputForm from '../../../Elements/Forms/InputForm/InputForm';

const CliffDuration = ({ grantId }) => {
  
  const [ duration, setDuration ] = useRecoilState(cliffDurationState(grantId));
  const [ completed, setCompleted ] = useState((duration) ? true : false);
  const [ errorMessage, setErrorMessage ] = useState(null);

  const handleChange = ({ target: { value }}) => setDuration(value);

  const handleEdit = () => setCompleted(false);

  const validate = async (e) => {
    const cliffDuration = Number(duration);
    if (cliffDuration && cliffDuration >= 0) {
      await editGrant(grantId, { cliffDuration });
      setCompleted(true);
      setErrorMessage(null);
    } else {
      setErrorMessage('Please enter a valid number of months');
    }
  }; 

  const name='Cliff Duration';
  
  return (

    <SingleLineLayout>
      <Description text="Number of months until cliff vesting occurs: " />
      { (completed)
        ? <Identifier name={ name } text={ duration } handleEdit={ handleEdit } />
        : <InputForm name={ name } value={ duration } handleChange={ handleChange } handleSubmit={ validate } errorMessage={ errorMessage } />
      } 
    </SingleLineLayout>
  );

};

export default CliffDuration;