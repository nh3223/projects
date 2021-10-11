import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { RecoilRoot } from 'recoil';

import EquityGrantSummary from './EquityGrantSummary';

import { stringify, formatDate } from '../../../../utilities/date/date';
import { useSetGrantIds } from '../../../../tests/hooks/useSetGrantIds';
import { useSetEquityGrantTestData } from '../../../../tests/hooks/useSetEquityGrantTestData';
import { useSetCompanyTestData } from '../../../../tests/hooks/useSetCompanyTestData';

const InitializeState = ({ companyId, executiveId, grantId, transactionDate, transactionPrice, grantType, grantDate, acceleration, accelerationPercentage,
                           changeOfControl, cliff, numberShares, vestingStartDate, remainderPeriods, remainderType }) => {

  const loadingIds = useSetGrantIds({ executiveId, grantIds: [grantId] });

  const loadingGrant = useSetEquityGrantTestData({ grantId, acceleration, accelerationPercentage, changeOfControl, cliff, grantType,
                                                   grantDate, numberShares, vestingStartDate, remainderPeriods, remainderType })

  const loadingCompany = useSetCompanyTestData({ companyId, transactionDate, transactionPrice });
    
  return ( loadingIds || loadingGrant || loadingCompany ) ? null : <EquityGrantSummary executiveId={ executiveId } />;

};

const component = (companyId, executiveId, grantId, transactionDate, transactionPrice, grantType, grantDate, acceleration, 
                   accelerationPercentage, changeOfControl, cliff, numberShares, vestingStartDate, remainderPeriods, remainderType) => (
  <RecoilRoot>
    <InitializeState companyId={ companyId } executiveId={ executiveId } grantId={ grantId } transactionDate={ transactionDate } transactionPrice={ transactionPrice }
                     grantType={ grantType } grantDate={ grantDate } acceleration={ acceleration } accelerationPercentage={ accelerationPercentage } 
                     changeOfControl={ changeOfControl } cliff={ cliff } numberShares={ numberShares } vestingStartDate={ vestingStartDate } 
                     remainderPeriods={ remainderPeriods } remainderType={ remainderType } />
  </RecoilRoot>
);

const companyId = 12;
const executiveId = 3;
const grantId = 7;
const transactionDate = stringify(new Date('December 1, 2021'));
const transactionPrice = 10;
const grantType = 'Restricted Stock';
const grantDate = stringify(new Date('January 1, 2020'));
const acceleration = true;
const accelerationPercentage = 100;
const changeOfControl = false;
const cliff = false;
const numberShares = 400;
const vestingStartDate = stringify(new Date('January 1, 2020'));
const remainderPeriods = 4;
const remainderType = 'Annually';

jest.mock('../../../../hooks/useLoadGrant', () => ({
  useLoadGrant: () => ({ loading: false, error: null })
}));

jest.mock('../../../../hooks/useLoadGrants', () => ({
  useLoadGrants: () => ({ loading: false, error: null })
}));

test('should display equity grant', () => {

  const { getByText } = render(component(companyId, executiveId, grantId, transactionDate, transactionPrice, grantType, grantDate, acceleration, 
                                            accelerationPercentage, changeOfControl, cliff, numberShares, vestingStartDate, remainderPeriods, remainderType));

  const title = getByText('Equity Grants');
  const type = getByText('Restricted Stock', { exact: false });
  const shares = getByText(numberShares.toString(), { exact: false });
  const date = getByText(formatDate(grantDate), { exact: false });
  
  expect(title).toBeInTheDocument();
  expect(type).toBeInTheDocument();
  expect(shares).toBeInTheDocument();
  expect(date).toBeInTheDocument();
  
});