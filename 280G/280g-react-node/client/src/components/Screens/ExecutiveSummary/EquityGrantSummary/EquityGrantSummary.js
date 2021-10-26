import React from 'react';
import { useRecoilValue } from 'recoil';

import { equityGrantIdsState } from '../../../../recoil/equityGrant';
import { useLoadGrants } from '../../../../hooks/useLoadGrants';

import Loading from '../../Loading/Loading';
import ExecutiveSummaryBlock from '../../../Elements/Layouts/ExecutiveSummaryBlock';
import Description from '../../../Elements/TextElements/Description/Description';
import EquityGrantSummaryItem from './EquityGrantSummaryItem';

const EquityGrantSummary = ({ companyId, executiveId }) => {

  const grantIds = useRecoilValue(equityGrantIdsState(executiveId));
  const { loading, error } = useLoadGrants(executiveId);

  if (loading) return <Loading component="Equity Grant Summary" error={ error } />

  return (

    <ExecutiveSummaryBlock>
      <Description text="Equity Grants" />
      { grantIds.map((grantId) => <EquityGrantSummaryItem key={ grantId } companyId={ companyId } grantId={ grantId } />) }
    </ExecutiveSummaryBlock>
  )

};

export default EquityGrantSummary;