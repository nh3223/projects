import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import {render} from '@testing-library/react'
import { RecoilRoot } from 'recoil';

import { useSetCompanyTestData } from '../../../../tests/hooks/useSetCompanyTestData';

import Header from './Header';

const InitializeState = ({ companyId, projectName }) => {

  const loading = useSetCompanyTestData({ companyId, projectName });

  return loading ? null : <Header companyId={ companyId } />

};

const component = (companyId, projectName) => (
  <RecoilRoot>
    <InitializeState companyId={ companyId } projectName={ projectName } />
  </RecoilRoot>
);

const companyId = 12;
const name = 'Test Project';
const noName = '';

test('should show project name', () => {
  const { getByText } = render(component(companyId, name));
  const title = getByText('Test Project', { exact: false });
  expect(title).toBeInTheDocument();
});

test('should show default title', () => {
  const { getByText } = render(component(companyId, noName));
  const title = getByText('M&A', { exact: false });
  expect(title).toBeInTheDocument();
});