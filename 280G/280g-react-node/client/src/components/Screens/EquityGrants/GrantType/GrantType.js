import React from 'react';
import { useRecoilState } from 'recoil';

import { grantTypeState } from '../../../../recoil/equityGrant';
import { editGrant } from '../../../../api/equityGrant/editGrant';

import MultiLineLayout from '../../../Elements/Layouts/MultiLineLayout';
import Description from '../../../Elements/TextElements/Description/Description';
import RadioForm from '../../../Elements/Forms/RadioForm/RadioForm';

const GrantType = ({ grantId }) => {

  const [ grantType, setGrantType ] = useRecoilState(grantTypeState(grantId));

  const handleChange = async ({ target: { value }}) => {
    setGrantType(value);
    await editGrant(grantId, { grantType: value });
  };

  const name = 'Grant Type';
  const text = 'Type of Equity Grant';

  const formChoices = [
    'Restricted Stock',
    'Option'
  ];

  return (
    <MultiLineLayout>
      <Description text={ text } />
      <RadioForm name={ name } formChoices={ formChoices } checked={ grantType } handleChange={ handleChange } />
    </MultiLineLayout>
  );

};

export default GrantType;