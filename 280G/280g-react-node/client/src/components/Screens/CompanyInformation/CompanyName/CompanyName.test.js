import React, { useState, useEffect } from 'react';
import '@testing-library/jest-dom/extend-expect'
import {act, render, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RecoilRoot, useSetRecoilState } from 'recoil';

import CompanyName from './CompanyName';
import { companyNameState } from '../../../../recoil/company';
import * as editCompany from '../../../../api/company/editCompany';

const InitializeState = ({ companyId, name }) => {

  const setCompanyName = useSetRecoilState(companyNameState(companyId));
  const [ loaded, setLoaded ] = useState(false);
  const [ loading, setLoading ] = useState(true);
  
  useEffect(() => {
    if (loaded) setLoading(false)
  }, [loaded, setLoading])

  useEffect(() => {
    setCompanyName(name);
    setLoaded(true);
  }, [name, setCompanyName, setLoaded]);

  return loading ? null : <CompanyName companyId={ companyId } />

}
const component = (companyId, name) => (
  <RecoilRoot>
    <InitializeState companyId={ companyId } name={ name } />
  </RecoilRoot>
);

const companyId = 12;
const defaultCompanyName = '';
const givenCompanyName = 'test';
const descriptionText = 'Company Name:';


test('should render description and form if no company name is provided', () => {
  const { getByRole, getByText } = render(component(companyId, defaultCompanyName)); 
  const description = getByText(descriptionText);
  expect(description).toBeInTheDocument();
  const input = getByRole('textbox');
  expect(input).toBeInTheDocument(); 
});


test('should render description if company name is provided', () => {
  const { getByText } = render(component(companyId, givenCompanyName));  
  const description = getByText(descriptionText);
  expect(description).toBeInTheDocument();
  const companyName = getByText(givenCompanyName);
  expect(companyName).toBeInTheDocument();
});


test('should render form if Edit button is pressed', () => {
  const { getByText, getByRole } = render(component(companyId, givenCompanyName));  
  const editButton = getByText('Edit');
  expect(editButton).toBeInTheDocument();  
  userEvent.click(editButton);  
  const input = getByRole('textbox');
  expect(input).toBeInTheDocument();
});


test('should show value in form if user types in form', () => {
  const { getByRole } = render(component(companyId, defaultCompanyName));
  const input = getByRole('textbox');
  userEvent.type(input, givenCompanyName);
  expect(input).toHaveValue(givenCompanyName);
});


test('should render description after submit', async () => {
  
  jest.spyOn(editCompany, 'editCompany').mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve({ companyName: givenCompanyName }),
  }));

  const { getByRole, getByText } = render(component(companyId, defaultCompanyName));
  const input = getByRole('textbox');
  userEvent.type(input, givenCompanyName);
  await act(() => userEvent.type(input, '{enter}'));
  const companyName = await waitFor(() => getByText(givenCompanyName));
  expect(companyName).toBeInTheDocument();
});
