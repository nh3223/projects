import React from 'react';
import { useRecoilState } from 'recoil';

import { editGrant } from '../../../../api/equityGrant/editGrant';
import { accelerationMethodState } from '../../../../recoil/equityGrant';

import MultiLineLayout from '../../../Elements/Layouts/MultiLineLayout';
import Description from '../../../Elements/TextElements/Description/Description';
import RadioForm from '../../../Elements/Forms/RadioForm/RadioForm';

const MethodForm = ({ grantId }) => {

  const [ accelerationMethod, setAccelerationMethod ] = useRecoilState(accelerationMethodState(grantId));

  const handleChange = async ({ target: { value }}) => {
    setAccelerationMethod(value);
    await editGrant(grantId, { accelerationMethod: value });
  };

  const name = 'Acceleration Method';
  const text = 'Method of Acceleration'

  const formChoices = [
    'Next to Vest',
    'Last to Vest',
    'Proportional',
    'Other'
  ];
  
  return (
    <MultiLineLayout>
      <Description text={ text } />
      <RadioForm name={ name } formChoices={ formChoices } checked={ accelerationMethod } handleChange={ handleChange } />
    </MultiLineLayout>
  );
    
};

export default MethodForm;