import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import { numberSharesState } from '../../../../recoil/equityGrant';
import { editGrant } from '../../../../api/equityGrant/editGrant';

import SingleLineLayout from '../../../Elements/Layouts/SingleLineLayout';
import Description from '../../../Elements/TextElements/Description/Description';
import Identifier from '../../../Elements/Identifier/Identifier';
import InputForm from '../../../Elements/Forms/InputForm/InputForm';

const Shares = ({ grantId }) => {
  
  const [ shares, setShares ] = useRecoilState(numberSharesState(grantId));
  const [ completed, setCompleted ] = useState((shares) ? true : false);
  const [ errorMessage, setErrorMessage ] = useState(null);

  const handleChange = ({ target: { value }}) => setShares(value);

  const handleEdit = () => setCompleted(false);

  const validate = async (e) => {
    const numberShares = Number(shares);
    if (numberShares && numberShares >= 0) {
      await editGrant(grantId, { numberShares });
      setCompleted(true);
      setErrorMessage(null);
    } else {
      setErrorMessage('Please enter a valid number of shares');
    }
  }; 

  const name='Number of Shares';
  
  return (

    <SingleLineLayout>
      <Description text="Number of shares or options granted: " />
      { (completed)
        ? <Identifier name={ name } text={ shares } handleEdit={ handleEdit } />
        : <InputForm name={ name } value={ shares } handleChange={ handleChange } handleSubmit={ validate } errorMessage={ errorMessage } />
      } 
    </SingleLineLayout>
  );

};

export default Shares;