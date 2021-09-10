import React, { useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { editGrant } from '../../../../api/equityGrant/editGrant';
import { cliffState, remainderPeriodsState } from '../../../../recoil/equityGrant';

import Description from '../../../Elements/TextElements/Description/Description';
import Identifier from '../../../Elements/Identifier/Identifier';
import InputForm from '../../../Elements/Forms/InputForm/InputForm';

const RemainderPeriods = ({ grantId }) => {
  
  const cliff = useRecoilValue(cliffState(grantId));
  const [ periods, setPeriods ] = useRecoilState(remainderPeriodsState(grantId));
  const [ completed, setCompleted ] = useState((periods) ? true : false);
  const [ errorMessage, setErrorMessage ] = useState(null);

  const handleChange = ({ target: { value }}) => setPeriods(value);

  const handleEdit = () => setCompleted(false);

  const validate = async (e) => {
    const remainderPeriods = Number(periods);
    if (remainderPeriods && remainderPeriods >= 0) {
      await editGrant(grantId, { remainderPeriods });
      setCompleted(true);
      setErrorMessage(null);
    } else {
      setErrorMessage('Please enter a valid number of periods');
    }
  } 
  
  const name = 'Number Vesting Periods';
  const description = (cliff) ? 'Number of periods over which the remaining shares vest: ' : 'Number of periods over which the shares vest: ';

  return (
    <>
      <Description text={ description } />
      { (completed)
        ? <Identifier name={ name } text={ periods } handleEdit={ handleEdit } />
        : <InputForm name={ name } value={ periods } handleChange={ handleChange } handleSubmit={ validate } errorMessage={ errorMessage } />
      } 
    </>
  );

};

export default RemainderPeriods;