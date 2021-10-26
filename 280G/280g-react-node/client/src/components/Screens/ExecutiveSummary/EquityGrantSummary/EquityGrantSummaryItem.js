import React from 'react';
import { useRecoilValue } from 'recoil';

import { useLoadGrant } from '../../../../hooks/useLoadGrant';
import { grantDateState, grantTypeState, numberSharesState, total280GValueState } from '../../../../recoil/equityGrant';
import { formatDate } from '../../../../utilities/date/date';

import SingleLineLayout from '../../../Elements/Layouts/SingleLineLayout';
import Description from '../../../Elements/TextElements/Description/Description';
import Loading from '../../Loading/Loading';

const EquityGrantSummaryItem = ({ companyId, grantId }) => {

  const grantType = useRecoilValue(grantTypeState(grantId));
  const grantDate = useRecoilValue(grantDateState(grantId));
  const numberShares = useRecoilValue(numberSharesState(grantId));
  const total280GValue = useRecoilValue(total280GValueState({ companyId, grantId }));
  
  const { loading, error } = useLoadGrant(grantId);

  if (loading) return <Loading component="Non Equity Payment Summary Item" error={ error } />

  const grantSummary = `${grantType} grant on ${formatDate(grantDate)} - ${numberShares} ${ (grantType === 'Option') ? 'options' : 'shares' }:`;
  
  return (

    <SingleLineLayout>
      <Description text={ grantSummary } />
      <Description text={ total280GValue } />
    </SingleLineLayout>

  );

};

export default EquityGrantSummaryItem;