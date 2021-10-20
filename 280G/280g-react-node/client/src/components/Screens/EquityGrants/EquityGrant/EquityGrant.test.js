import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { RecoilRoot } from 'recoil';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';

import { stringify, formatDate } from "../../../../utilities/date/date";
import { useSetEquityGrantTestData } from '../../../../tests/hooks/useSetEquityGrantTestData'

import EquityGrant from './EquityGrant';
import { useSetCompanyTestData } from '../../../../tests/hooks/useSetCompanyTestData';

const InitializeState = ({ ids, transactionData, grantData }) => {

  const { companyId, grantId } = ids;
  const { transactionDate, transactionPrice } = transactionData;
  const { grantType, grantDate, vestingStartDate, numberShares, changeOfControl, acceleration, accelerationPercentage, cliff, remainderPeriods, remainderType } = grantData;
  
  const loadingCompany = useSetCompanyTestData({ companyId, transactionDate, transactionPrice })
  
  const loadingGrant = useSetEquityGrantTestData({ grantId, grantType, grantDate, vestingStartDate, numberShares, changeOfControl, 
                                                   acceleration, accelerationPercentage, cliff, remainderPeriods, remainderType });

  return ( loadingCompany || loadingGrant ) ? null : <EquityGrant grantId={ grantId } />

};

const component = (ids, transactionData, grantData) => {
  
  const history = createMemoryHistory();

  return (
    <RecoilRoot>
      <Router history={ history }>
        <InitializeState ids={ ids } transactionData={ transactionData } grantData={ grantData } />
      </Router>
    </RecoilRoot>
  );

};

const companyId = 12;
const executiveId = 1;
const grantId = 7;
const grantDate = stringify(new Date('January 1, 2020'));
const vestingStartDate = stringify(new Date('February 1, 2020'));
const transactionDate = stringify(new Date('December 1, 2021'));
const transactionPrice = 10;
const grantType = 'Restricted Stock';
const numberShares = 400;
const changeOfControl = false;
const acceleration = true;
const accelerationPercentage = 100;
const remainderPeriods = 4;
const remainderType = 'Annually';
const cliff = false;

const ids = { companyId, executiveId, grantId };
const transactionData = { transactionDate, transactionPrice };
const grantData = { grantType, grantDate, vestingStartDate, numberShares, changeOfControl, acceleration, accelerationPercentage, cliff, remainderPeriods, remainderType }

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ companyId, executiveId, grantId })
}));

jest.mock('../../../../hooks/useLoadCompany', () => ({
  useLoadCompany: () => ({ loading: false, error: null })
}));

jest.mock('../../../../hooks/useLoadExecutives', () => ({
  useLoadExecutives: () => ({ loading: false, error: null })
}));

jest.mock('../../../../hooks/useLoadGrant', () => ({
  useLoadGrant: () => ({ loading: false, error: null })
}));

test('should show grantDate, vestingStartDate and forms', () => {
  const { getByRole, getAllByRole, getByText } = render(component(ids, transactionData, grantData));
  const grantTypeForm = getByRole('radio', { name: 'Restricted Stock' });
  const accelerationForm = getByRole('checkbox', { name: 'Check if shares are subject to acceleration' });
  const forms = getAllByRole('textbox');
  const grant = getByText(formatDate(grantDate), { exact: false });
  const vestingStart = getByText(formatDate(vestingStartDate), { exact: false });
  expect(grantTypeForm).toBeInTheDocument();
  expect(accelerationForm).toBeInTheDocument();
  expect(forms.length).toBeGreaterThan(0);
  expect(grant).toBeInTheDocument();
  expect(vestingStart).toBeInTheDocument();
});