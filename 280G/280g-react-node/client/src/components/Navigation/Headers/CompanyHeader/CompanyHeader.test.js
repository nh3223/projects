import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import {render} from '@testing-library/react'
import { RecoilRoot } from 'recoil';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';

import { useSetExecutiveIds } from '../../../../tests/hooks/useSetExecutiveIds';
import { useSetExecutiveTestData } from '../../../../tests/hooks/useSetExecutiveTestData';

import CompanyHeader from './CompanyHeader';


const InitializeState = ({ companyId, executiveIds, executiveNames }) => {

  const loadingIds = useSetExecutiveIds({ companyId, executiveIds });
  
  const loading0 = useSetExecutiveTestData({
    executiveId: executiveIds[0],
    executiveName: executiveNames[0]
  });

  const loading1 = useSetExecutiveTestData({
    executiveId: executiveIds[1],
    executiveName: executiveNames[1]
  })

  return (loadingIds || loading0 || loading1) ? null : <CompanyHeader companyId={ companyId } />

};

const component = (companyId, executiveIds, executiveNames) => {
  
  const history = createMemoryHistory();

  return (
    <RecoilRoot>
      <Router history={ history } >
        <InitializeState companyId={ companyId } executiveIds={ executiveIds } executiveNames={ executiveNames } />
      </Router>
    </RecoilRoot>
  );

};

const companyId = 12;
const executiveIds = [1, 2];
const executiveNames = ['John', 'Jane'];

test('should show all tabs', () => {
  const { getByText } = render(component(companyId, executiveIds, executiveNames));
  const summaryTab = getByText('Project Summary');
  const infoTab = getByText('Company Information');
  const executiveFixedTab = getByText('Executives -->');
  const executive0Tab = getByText(executiveNames[0]);
  const exeuctive1Tab = getByText(executiveNames[1]);
  expect(summaryTab).toBeInTheDocument();
  expect(infoTab).toBeInTheDocument();
  expect(executiveFixedTab).toBeInTheDocument();
  expect(executive0Tab).toBeInTheDocument();
  expect(exeuctive1Tab).toBeInTheDocument();
});
