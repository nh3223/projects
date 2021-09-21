import React from 'react';
import { useRecoilValue } from 'recoil';

import { transactionDateState, transactionPriceState } from '../../../../recoil/company';
import { changeOfControlState, exercisePriceState, grantDateState, grantTypeState } from '../../../../recoil/equityGrant';
import { calculate280GValue } from '../../../../utilities/equityGrant/calculate280GValue/calculate280GValue';
import { stringify } from '../../../../utilities/date/date';

import SingleLineLayout from '../../../Elements/Layouts/SingleLineLayout';
import TableCell from '../../../Elements/TextElements/TableCell/TableCell';
import DateForm from '../../../Elements/Forms/DateForm/DateForm';
import InputForm from '../../../Elements/Forms/InputForm/InputForm';

const VestingRow = ({ companyId, grantId, index, vestingDate, handleChange }) => {

  const transactionDate = useRecoilValue(transactionDateState(companyId));
  const transactionPrice = useRecoilValue(transactionPriceState(companyId));

  const grantType = useRecoilValue(grantTypeState(grantId));
  const grantDate = useRecoilValue(grantDateState(grantId));
  const exercisePrice = useRecoilValue(exercisePriceState(grantId));
  const changeOfControl = useRecoilValue(changeOfControlState(grantId));

  const transactionData = { transactionDate, transactionPrice };
    
  const equityGrantData = { grantType, grantDate, exercisePrice, changeOfControl };
  
  const {oldVestingDate, newVestingDate, shares } = vestingDate;
  
  const { equityValue,
    accelerationBenefit,
    serviceLapseValue,
    totalPayment,
    parachutePayment
  } = calculate280GValue(transactionData, vestingDate, equityGrantData);

  const handleDateChange = async (value) => {
    const vestingDate = stringify(value);
    const vestingRow = {
      oldVestingDate,
      newVestingDate: vestingDate,
      shares
    }
    await handleChange(vestingRow, index)
  };

  const handleShareChange = async ({target: { value }}) => {
    const vestingShares = Number(value);
    if (vestingShares && vestingShares > 0) {
      const vestingRow = {
        oldVestingDate, 
        newVestingDate,
        shares: vestingShares 
      }
      await handleChange(vestingRow, index);
    }
  };

  return (

    <SingleLineLayout>
      <TableCell text={ grantDate } />
      <TableCell text={ oldVestingDate } />
      <DateForm  date={ newVestingDate } handleChange={ handleDateChange } />
      <InputForm value={ shares } handleChange={ handleShareChange } />
      <TableCell text={ equityValue } />
      <TableCell text={ accelerationBenefit } />
      <TableCell text={ serviceLapseValue } />
      <TableCell text={ totalPayment } />
      <TableCell text={ parachutePayment } />
    </SingleLineLayout>
  
  );


};

export default VestingRow;
