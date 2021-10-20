import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Compensation from './Compensation';

import { stringify, formatDate } from '../../../utilities/date/date';
import { useSetExecutiveTestData } from '../../../tests/hooks/useSetExecutiveTestData';
import { useSetCompensationTestData } from '../../../tests/hooks/useSetCompensationTestData';

const InitializeState = ({ executiveId, executiveName, startDate, firstYearPayments, basePeriodCompensation }) => {

  const loadingExecutive = useSetExecutiveTestData({ executiveId, executiveName });

  const loadingCompensation = useSetCompensationTestData({ executiveId, startDate, firstYearPayments, basePeriodCompensation });

  return (loadingExecutive || loadingCompensation) ? null : <Compensation />

}

const component = (executiveId, executiveName, startDate, firstYearPayments, basePeriodCompensation ) => {

  const history = createMemoryHistory();

  return (
    <RecoilRoot>
      <Router history={ history } >
        <InitializeState executiveId={ executiveId } executiveName={ executiveName } startDate={ startDate } firstYearPayments={ firstYearPayments } basePeriodCompensation={ basePeriodCompensation } />
      </Router>
    </RecoilRoot>
  );

};

const companyId = 12;
const executiveId = 3;
const executiveName = 'John Doe';
const startDate = stringify(new Date('July 1, 2018'));
const firstYearPayments = 1000;
const basePeriodCompensation = [
  { year: 2018, compensation: 100 },
  { year: 2019, compensation: 200 },
  { year: 2020, compensation: 300 }
];

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ companyId, executiveId })
}));

jest.mock('../../../hooks/useLoadCompany', () => ({
  useLoadCompany: () => ({ loading: false, error: null })
}));

jest.mock('../../../hooks/useLoadExecutives', () => ({
  useLoadExecutives: () => ({ loading: false, error: null })
}));

jest.mock('../../../hooks/useLoadCompensation', () => ({
  useLoadCompensation: () => ({ loading: false, error: null })
}));

test('should render executive name, start date, first year payments, and base period compensation', () => {

  const { getByText } = render(component(executiveId, executiveName, startDate, firstYearPayments, basePeriodCompensation));
  const name = getByText(`Executive: ${executiveName}`);
  const date = getByText(formatDate(startDate), { exact: false });
  const payments = getByText(firstYearPayments, { exact: false });
  const middleYear = getByText('2019', { exact: false });
  const middleCompensation = getByText('200', { exact: false });
  
  expect(name).toBeInTheDocument();
  expect(date).toBeInTheDocument();
  expect(payments).toBeInTheDocument();
  expect(middleYear).toBeInTheDocument();
  expect(middleCompensation).toBeInTheDocument();
});