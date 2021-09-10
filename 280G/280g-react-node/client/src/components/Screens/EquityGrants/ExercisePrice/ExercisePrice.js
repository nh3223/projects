import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import { exercisePriceState } from '../../../../recoil/equityGrant';
import { editGrant } from '../../../../api/equityGrant/editGrant';

import Description from '../../../Elements/TextElements/Description/Description';
import Identifier from '../../../Elements/Identifier/Identifier';
import InputForm from '../../../Elements/Forms/InputForm/InputForm';
import SingleLineLayout from '../../../Elements/Layouts/SingleLineLayout';

const ExercisePrice = ({ grantId }) => {

  const [ price, setPrice ] = useRecoilState(exercisePriceState(grantId));
  const [ completed, setCompleted ] = useState((price) ? true : false);
  const [ errorMessage, setErrorMessage ] = useState(null);

  const handleChange = ({ target: { value }}) => setPrice(value);

  const handleEdit = () => setCompleted(false);

  const validate = async (e) => {
    const exercisePrice = Number(price);
    if (exercisePrice && exercisePrice > 0) {
      await editGrant(grantId, { exercisePrice });
      setCompleted(true);
      setErrorMessage(null)
    } else {
      setErrorMessage('Please enter a valid exercise price')
    }
  };

  return (

    <SingleLineLayout>
      <Description text="Exercise Price per Share: " />
      { (completed)
        ? <Identifier text={ `$${price}` } handleEdit={ handleEdit }/>
        : <InputForm value={ price } handleSubmit={ validate } handleChange={ handleChange } errorMessage={ errorMessage }/>
      } 
    </SingleLineLayout>

  );

};

export default ExercisePrice;