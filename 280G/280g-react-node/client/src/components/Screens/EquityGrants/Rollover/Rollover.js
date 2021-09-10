import React from 'react';
import { useRecoilState } from 'recoil';

import { rolloverState } from '../../../../recoil/equityGrant';
import { editGrant } from '../../../../api/equityGrant/editGrant';

import CheckboxForm from '../../../Elements/Forms/CheckboxForm/CheckboxForm';

const Rollover = ({ grantId }) => {

  const [ rollover, setRollover ] = useRecoilState(rolloverState(grantId));

  const handleChange = async ({ target: { checked }}) => {
    setRollover(checked);
    await editGrant(grantId, { rollover: checked });
  };

  const name = 'Rollover Checkbox Form';
  const formText = 'Check if shares/options will rollover into buyer shares/options';
  
  return <CheckboxForm name={ name } text={ formText } checked={ rollover } handleChange={ handleChange } />;  

};

export default Rollover;