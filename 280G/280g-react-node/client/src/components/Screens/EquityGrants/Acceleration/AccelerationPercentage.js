import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { editGrant } from '../../../../api/equityGrant/editGrant';
import { accelerationPercentageState } from '../../../../recoil/equityGrant';

import SingleLineLayout from '../../../Elements/Layouts/SingleLineLayout';
import Description from '../../../Elements/TextElements/Description/Description';
import Identifier from '../../../Elements/Identifier/Identifier';
import InputForm from '../../../Elements/Forms/InputForm/InputForm';

const AccelerationPercentage = ({ grantId }) => {
  
  const [ percentage, setPercentage ] = useRecoilState(accelerationPercentageState(grantId));
  const [ completed, setCompleted ] = useState((percentage) ? true : (percentage === 0) ? true : false);
  const [ errorMessage, setErrorMessage ] = useState(null);

  const handleChange = ({ target: { value }}) => setPercentage(value);

  const handleEdit = () => setCompleted(false);

  const validate = async () => {

    const accelerationPercentage = Number(percentage);
    if ((accelerationPercentage && accelerationPercentage > 0 && accelerationPercentage <= 100) || accelerationPercentage === 0) {
      await editGrant(grantId, { accelerationPercentage });
      setCompleted(true);
      setErrorMessage(null);
    } else {
      setErrorMessage('Percentage must be a number between 0 and 100, inclusive');
    }
  }; 
  
  const name = 'Acceleration Percentage';

  return (
    <SingleLineLayout>
      <Description text="Percentage accelerating: " />
      { (completed)
        ? <Identifier name={ name } text={ `${percentage}%` } handleEdit={ handleEdit } />
        : <InputForm name={ name } value={ percentage } handleChange={ handleChange } handleSubmit={ validate } errorMessage={ errorMessage } />
      } 
    </SingleLineLayout>
  );

};

export default AccelerationPercentage;