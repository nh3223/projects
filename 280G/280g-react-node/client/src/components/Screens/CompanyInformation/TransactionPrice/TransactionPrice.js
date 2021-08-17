import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import { transactionPriceState } from '../../../../recoil/company';
import { editCompany } from '../../../../api/company/editCompany';

import Description from '../../../Elements/TextElements/Description/Description';
import Identifier from '../../../Elements/Identifier/Identifier';
import InputForm from '../../../Elements/Forms/InputForm/InputForm';

const TransactionPrice = ({ companyId }) => {

  const [ transactionPrice, setTransactionPrice ] = useRecoilState(transactionPriceState);
  const [ completed, setCompleted ] = useState((transactionPrice) ? true : false);
  const [ errorMessage, setErrorMessage ] = useState(null);

  const handleChange = ({ target: { value }}) => setTransactionPrice(value);

  const handleEdit = () => setCompleted(false);

  const validate = async (e) => {
    const price = Number(transactionPrice);
    if (price && price > 0) {
      await editCompany(companyId, { transactionPrice: price });
      setCompleted(true);
      setErrorMessage(null)
    } else {
      setErrorMessage('Please enter a valid per share price')
    }
  };

  return (
    <>
      <Description text="Transaction Price per Share: " />
      { (completed)
      ? <Identifier text={ transactionPrice } handleEdit={ handleEdit }/>
      : <InputForm value={ transactionPrice } handleSubmit={ validate } handleChange={ handleChange } errorMessage={ errorMessage }/>
      } 
    </>
  );

};

export default TransactionPrice;