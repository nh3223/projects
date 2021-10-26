import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import { cliffPercentageState } from '../../../../recoil/equityGrant';
import { editGrant } from '../../../../api/equityGrant/editGrant';

import SingleLineLayout from '../../../Elements/Layouts/SingleLineLayout';
import Description from '../../../Elements/TextElements/Description/Description';
import Identifier from '../../../Elements/Identifier/Identifier';
import InputForm from '../../../Elements/Forms/InputForm/InputForm';

const CliffPercentage = ({ grantId }) => {
  
  const [ percentage, setPercentage ] = useRecoilState(cliffPercentageState(grantId));
  const [ completed, setCompleted ] = useState((percentage) ? true : (percentage === 0) ? true : false);
  const [ errorMessage, setErrorMessage ] = useState(null);

  const handleChange = ({ target: { value }}) => setPercentage(value);

  const handleEdit = () => setCompleted(false);

  const validate = async (e) => {
    const cliffPercentage = Number(percentage);
    if ((cliffPercentage && cliffPercentage >= 0 && cliffPercentage <= 100) || cliffPercentage === 0) {
      console.log(cliffPercentage);
      await editGrant(grantId, { cliffPercentage });
      setCompleted(true);
      setErrorMessage(null);
    } else {
      setErrorMessage('Percentage must be a number between 0 and 100, inclusive');
    }
  };
  
  const name = 'Cliff Percentage';

  return (

    <SingleLineLayout>
      <Description text="Percentage of shares subject to cliff vesting: " />
      { (completed)
        ? <Identifier name={ name } text={ `${percentage}%` } handleEdit={ handleEdit } />
        : <InputForm name={ name } value={ percentage } handleChange={ handleChange } handleSubmit={ validate } errorMessage={ errorMessage } />
      } 
    </SingleLineLayout>

  );

};

export default CliffPercentage;