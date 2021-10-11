import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import {act, render, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RecoilRoot } from 'recoil';

import ProjectName from './ProjectName';
import * as editCompany from '../../../../api/company/editCompany';
import { useSetCompanyTestData } from '../../../../tests/hooks/useSetCompanyTestData';

const InitializeState = ({ companyId, projectName }) => {

  const loading = useSetCompanyTestData({ companyId, projectName });

  return loading ? null : <ProjectName companyId={ companyId } />

}
const component = (companyId, projectName) => (
  <RecoilRoot>
    <InitializeState companyId={ companyId } projectName={ projectName } />
  </RecoilRoot>
);

const companyId = 12;
const defaultProjectName = '';
const givenProjectName = 'test';
const descriptionText = 'Project Name:';


test('should render description and form if no company name is provided', () => {
  const { getByRole, getByText } = render(component(companyId, defaultProjectName)); 
  const description = getByText(descriptionText);
  expect(description).toBeInTheDocument();
  const input = getByRole('textbox');
  expect(input).toBeInTheDocument(); 
});


test('should render description if project name is provided', () => {
  const { getByText } = render(component(companyId, givenProjectName));  
  const description = getByText(descriptionText);
  expect(description).toBeInTheDocument();
  const projectName = getByText(givenProjectName);
  expect(projectName).toBeInTheDocument();
});


test('should render form if Edit button is pressed', () => {
  const { getByText, getByRole } = render(component(companyId, givenProjectName));  
  const editButton = getByText('Edit');
  expect(editButton).toBeInTheDocument();  
  userEvent.click(editButton);  
  const input = getByRole('textbox');
  expect(input).toBeInTheDocument();
});


test('should show value in form if user types in form', () => {
  const { getByRole } = render(component(companyId, defaultProjectName));
  const input = getByRole('textbox');
  userEvent.type(input, givenProjectName);
  expect(input).toHaveValue(givenProjectName);
});


test('should render description after submit', async () => {
  
  jest.spyOn(editCompany, 'editCompany').mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve({ projectName: givenProjectName }),
  }));

  const { getByRole, getByText } = render(component(companyId, defaultProjectName));
  const input = getByRole('textbox');
  userEvent.type(input, givenProjectName);
  await act(() => userEvent.type(input, '{enter}'));
  const projectName = await waitFor(() => getByText(givenProjectName));
  expect(projectName).toBeInTheDocument();
});