import React, { useEffect, useState } from 'react';
import '@testing-library/jest-dom/extend-expect'
import {act, render, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RecoilRoot, useSetRecoilState } from 'recoil';

import Compensation from './Compensation';
import { basePeriodCompensationState, startDateState } from '../../../recoil/compensation';
import { stringify, formatDate } from '../../../utilities/formatDate';
import { executiveNameState } from '../../../recoil/executive';
import { firstYearPaymentsState } from '../../../recoil/compensation';
import * as useLoadCompensation from '../../../hooks/useLoadCompensation';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const InitializeState = ({ route, path, executiveId, executiveName, startDate, firstYearPayments, basePeriodCompensation }) => {

  const setExecutiveName = useSetRecoilState(executiveNameState(executiveId));
  const setStartDate = useSetRecoilState(startDateState(executiveId));
  const setFirstYearPayments = useSetRecoilState(firstYearPaymentsState(executiveId));
  const setBasePeriodCompensation = useSetRecoilState(basePeriodCompensationState(executiveId));
  const [ loaded, setLoaded ] = useState(false);
  const [ loading, setLoading ] = useState(true);
  
  const history = createMemoryHistory({ initialEntries: [route] });

  useEffect(() => {
    if (loaded) setLoading(false)
  }, [loaded, setLoading])

  useEffect(() => {
    setExecutiveName(executiveName);
    setStartDate(startDate);
    setFirstYearPayments(firstYearPayments);
    setBasePeriodCompensation(basePeriodCompensation);
    setLoaded(true);
  }, [executiveName, startDate, firstYearPayments, basePeriodCompensation, setExecutiveName, setStartDate, setFirstYearPayments, setBasePeriodCompensation, setLoaded])

  return loading ? null : (
    <Router history={ history }>
      <Route path={ path } component={ Compensation } />
    </Router>
  )

}

const component = (route, path, executiveId, executiveName, startDate, firstYearPayments, basePeriodCompensation ) => (
  <RecoilRoot>
    <InitializeState route={ route } path={ path } executiveId={ executiveId } executiveName={ executiveName } startDate={ startDate } firstYearPayments={ firstYearPayments } basePeriodCompensation={ basePeriodCompensation } />
  </RecoilRoot>
);

const companyId = 12;
const executiveId = 3;
const executiveName = 'John Doe';
const startDate = stringify(new Date('July 1, 2018'));
const firstYearPayments = 1000;
const basePeriodCompensation = { 
  2018: 100,
  2019: 200,
  2020: 300
};

const path =  '/company/:companyId/executive/:executiveId/compensation';
const route = `/company/${companyId}/executive/${executiveId}/compensation`;


const formattedExecutiveName = `Executive: ${executiveName}`;
const formattedStartDate = formatDate(startDate)
const formattedFirstYearPayments = `$${firstYearPayments}`;
const formattedMiddleYear = '$2019';
const formattedMiddleCompensation = '$200';

test('should render executive name, start date, first year payments, and base period compensation', () => {
  
  // const spy = jest.spyOn(useLoadCompensation, 'useLoadCompensation').mockImplementationOnce(() => Promise.resolve({
  //   json: () => Promise.resolve({ }),
  // }));

  // const { getByText } = render(component(route, path, executiveId, startDate, firstYearPayments, basePeriodCompensation));
  
  // expect(spy).toHaveBeenCalledWith(executiveId);
  // expect(getByText(formattedExecutiveName)).toBeInTheDocument();
  // expect(getByText(formattedStartDate)).toBeInTheDocument();
  // expect(getByText(formattedFirstYearPayments)).toBeInTheDocument();
  // expect(getByText(formattedMiddleYear)).toBeInTheDocument();
  // expect(getByText(formattedMiddleCompensation)).toBeInTheDocument();
});