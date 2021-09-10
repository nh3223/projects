import React from 'react';
import { useRecoilState } from 'recoil';

import { remainderTypeState } from '../../../../recoil/equityGrant';
import { editGrant } from '../../../../api/equityGrant/editGrant';

import MultiLineLayout from '../../../Elements/Layouts/MultiLineLayout';
import Description from '../../../Elements/TextElements/Description/Description';
import RadioForm from '../../../Elements/Forms/RadioForm/RadioForm';


const RemainderType = ({ grantId }) => {
  
  const [ remainderType, setRemainderType ] = useRecoilState(remainderTypeState(grantId));
  
  const handleChange = async ({ target: { value }}) => {
    setRemainderType(value);
    await editGrant(grantId, { remainderType: value });
  };

  const name = 'Remainder Type';
  const text = 'Vesting Frequency';

  const formChoices = [
    'Monthly',
    'Quarterly',
    'Annually',
    'Other'
  ]

  return (
  
    <MultiLineLayout>
      <Description text={ text } />
      <RadioForm name={ name } formChoices={ formChoices } checked={ remainderType } handleChange={ handleChange } /> 
    </MultiLineLayout>
  
  );
  
};

export default RemainderType;