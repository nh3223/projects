import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { transactionPriceState } from '../../../../recoil/company';
import { editCompany } from '../../../../api/company/editCompany';

import Description from '../../../Elements/TextElements/Description/Description';
import Identifier from '../../../Elements/Identifier/Identifier';
import InputForm from '../../../Elements/Forms/InputForm/InputForm';
import SingleLineLayout from '../../../Elements/Layouts/SingleLineLayout';
import { formatDollar } from '../../../../utilities/formatNumber';

const TransactionPrice = ({ companyId, width }) => {

  const [ transactionPrice, setTransactionPrice ] = useRecoilState(transactionPriceState(companyId));
  const [ dealPrice, setDealPrice ] = useState(transactionPrice);
  const [ completed, setCompleted ] = useState((transactionPrice) ? true : false);
  const [ errorMessage, setErrorMessage ] = useState(null);

  const handleChange = ({ target: { value }}) => setDealPrice(value);

  const handleEdit = () => setCompleted(false);

  const validate = async (e) => {
    const price = Number(dealPrice);
    if (price && price > 0) {
      await editCompany(companyId, { transactionPrice: price });
      setTransactionPrice(price);
      setCompleted(true);
      setErrorMessage(null);
    } else {
      setErrorMessage('Please enter a valid per share price')
    }
  };

  useEffect(() => { 
    setCompleted((transactionPrice) ? true : false);
  }, [transactionPrice, setCompleted]);

  return (
    <SingleLineLayout width={ width }>
      <Description text="Transaction Price per Share: " />
      { (completed)
      ? <Identifier text={ formatDollar(transactionPrice, 6) } handleEdit={ handleEdit }/>
      : <InputForm value={ dealPrice } handleSubmit={ validate } handleChange={ handleChange } errorMessage={ errorMessage }/>
      } 
    </SingleLineLayout>
  );

};

export default TransactionPrice;