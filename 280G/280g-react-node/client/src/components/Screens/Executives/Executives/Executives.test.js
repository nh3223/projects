import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import {render, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RecoilRoot } from 'recoil';

import Executives from './Executives';
import * as createExecutive from '../../../../api/executive/createExecutive';
import * as deleteExecutive from '../../../../api/executive/deleteExecutive';
import * as fetchExecutive from '../../../../api/executive/fetchExecutive';
import { useSetExecutiveTestData } from '../../../../tests/hooks/useSetExecutiveTestData';
import { useSetExecutiveIds } from '../../../../tests/hooks/useSetExecutiveIds';

const companyId = 12;

const executive1Name = 'John Doe';
const executive1Title = 'CEO';
const executive1Id = 1;

const executive2Name = 'Jane Doe';
const executive2Title = 'CTO'
const executive2Id = 2;

const executiveNames = [executive1Name, executive2Name];
const executiveTitles = [executive1Title, executive2Title];
const executiveIds = [executive1Id, executive2Id];

const InitializeState = ({ companyId, executiveIds, names, titles }) => {
  
  const loadingIds = useSetExecutiveIds({ companyId, executiveIds });

  const loading0 = useSetExecutiveTestData({ 
    executiveId: executiveIds[0],
    executiveName: names[0],
    executiveTitle: titles[0]
  });
  
  const loading1 = useSetExecutiveTestData({
    executiveId: executiveIds[1],
    executiveName: names[1],
    executiveTitle: titles[1]
  });

  return (loadingIds || loading0 || loading1) ? null : <Executives companyId={ companyId } />

};

const component = (companyId, executiveIds, names, titles) => (
  <RecoilRoot>
    <InitializeState companyId={ companyId } executiveIds={ executiveIds } names={ names } titles={ titles } />
  </RecoilRoot>
);

test('should render subtitle', () => {
  const { getByText } = render(component(companyId, executiveIds, executiveNames, executiveTitles));
  const subTitle = getByText('Executives');
  expect(subTitle).toBeInTheDocument();
});

test('should render and handle addExecutive button', async () => {
  
  const newExecutiveId = 3;
  const newExecutive = { company: companyId };

  const executiveSpy = jest.spyOn(createExecutive, 'createExecutive').mockResolvedValue({ ...newExecutive, _id: newExecutiveId });
  jest.spyOn(fetchExecutive, 'fetchExecutive').mockResolvedValue({ executiveName: '', executiveTitle: ''});

  const { getByRole } = render(component(companyId, executiveIds, executiveNames, executiveTitles));
  const addButton = getByRole('button', { name: 'Add an Executive' });
  expect(addButton).toBeInTheDocument();
  userEvent.click(addButton);
  await waitFor(() => {
    expect(executiveSpy).toHaveBeenCalledWith(companyId);
    const newDeleteButton = getByRole('button', { name: `Delete Executive-${newExecutiveId}` });
    expect(newDeleteButton).toBeInTheDocument();
  });
});

test('should render name, title and delete button for each executive', () => {
  const { getByText, getByRole } = render(component(companyId, executiveIds, executiveNames, executiveTitles));
  const name1 = getByText(executive1Name);
  const title1 = getByText(executive1Title);
  const deleteButton1 = getByRole('button', { name: `Delete Executive-${executive1Id}` });  
  expect(name1).toBeInTheDocument();
  expect(title1).toBeInTheDocument();
  expect(deleteButton1).toBeInTheDocument();
  const name2 = getByText(executive2Name);
  const title2 = getByText(executive2Title);
  const deleteButton2 = getByRole('button', { name: `Delete Executive-${executive2Id}` });  
  expect(name2).toBeInTheDocument();
  expect(title2).toBeInTheDocument();
  expect(deleteButton2).toBeInTheDocument();
});


test('should not render name, title or delete button when delete button for one executive is pressed', async () => {
  
  const executiveSpy = jest.spyOn(deleteExecutive, 'deleteExecutive').mockImplementationOnce(() => Promise.resolve({ }));
  
  const { getByText, getByRole } = render(component(companyId, executiveIds, executiveNames, executiveTitles));
  const name1 = getByText(executive1Name);
  const title1 = getByText(executive1Title);  
  const deleteButton1 = getByRole('button', { name: `Delete Executive-${executive1Id}` });
  const name2 = getByText(executive2Name);
  const title2 = getByText(executive2Title);
  const deleteButton2 = getByRole('button', { name: `Delete Executive-${executive2Id}` });
  userEvent.click(deleteButton1);
  await waitFor(() => {
    expect(executiveSpy).toHaveBeenCalledWith(executive1Id);
    expect(name1).not.toBeInTheDocument();
    expect(title1).not.toBeInTheDocument();
    expect(deleteButton1).not.toBeInTheDocument();
    expect(name2).toBeInTheDocument();
    expect(title2).toBeInTheDocument();
    expect(deleteButton2).toBeInTheDocument();
  });
});