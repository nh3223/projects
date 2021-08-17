import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RecoilRoot } from 'recoil';

import CompanyName from './CompanyName';
import { companyNameState } from '../../../../recoil/company';
import * as editCompany from '../../../../api/company/editCompany';

test('should render form if no company name is provided', () => {

  const companyName = '';

  render(
    <RecoilRoot initializeState={ ({ set }) => set(companyNameState, companyName) }>
      <CompanyName />
    </RecoilRoot>
  );

  expect(screen.getByRole('textbox')).toBeInTheDocument();
  
});

test('should render description if company name is provided', () => {
  
  const companyName = 'test';

  render(
    <RecoilRoot initializeState={ ({ set }) => set(companyNameState, companyName) }>
      <CompanyName />
    </RecoilRoot>
  );

  expect(screen.getByText(companyName)).toBeInTheDocument();

});

test('should call handleEdit and render form if Edit button is pressed', () => {
  
  const companyName = 'test'

  render(
    <RecoilRoot initializeState={ ({ set }) => set(companyNameState, companyName) }>
      <CompanyName />
    </RecoilRoot>
  );

  const editButton = screen.getByText('Edit');
  
  expect(editButton).toBeInTheDocument();
  userEvent.click(editButton);
  expect(screen.getByRole('textbox')).toBeInTheDocument();

});

test('should call handleChange and show value in form if user types in form', () => {
  
  const companyName = ''

  render(
    <RecoilRoot initializeState={ ({ set }) => set(companyNameState, companyName) }>
      <CompanyName />
    </RecoilRoot>
  );
 
  const input = screen.getByRole('textbox');
  userEvent.type(input, 'test');
  
  expect(input).toHaveValue('test');

});

test('should call handleSubmit, should call editCompany, and render description after submit', async () => {

  const companyName = '';
  
  const fakeEditCompanyResponse = 'test';

  jest.spyOn(editCompany, 'editCompany').mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve(fakeEditCompanyResponse),
  }));
  
  render(
    <RecoilRoot initializeState={ ({ set }) => set(companyNameState, companyName) }>
      <CompanyName />
    </RecoilRoot>
  );

  const input = screen.getByRole('textbox');
  userEvent.type(input, 'test');
  
  userEvent.type(input, '{enter}');

  await waitFor(() => expect(screen.getByText('test')).toBeInTheDocument());

});
