import React, { useEffect } from 'react';
import '@testing-library/jest-dom/extend-expect'
import {render, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RecoilRoot, useSetRecoilState } from 'recoil';

import Executives from './Executives';
import { executiveIdsState, executiveNameState, executiveTitleState } from '../../../../../recoil/executive';
import { defaultExecutive } from '../../../../../utilities/executive/executive';
import * as createExecutive from '../../../../../api/executive/createExecutive';
import * as deleteExecutive from '../../../../../api/executive/deleteExecutive';

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

const InitializeState = ({ executiveIds, names, titles }) => {
  const setExecutiveIds = useSetRecoilState(executiveIdsState);
  const setExecutive1Name = useSetRecoilState(executiveNameState(executiveIds[0]));
  const setExecutive1Title = useSetRecoilState(executiveTitleState(executiveIds[0]));
  const setExecutive2Name = useSetRecoilState(executiveNameState(executiveIds[1]));
  const setExecutive2Title = useSetRecoilState(executiveTitleState(executiveIds[1]));
  useEffect(() => {
    setExecutiveIds(executiveIds);
    setExecutive1Name(names[0]);
    setExecutive1Title(titles[0]);
    setExecutive2Name(names[1]);
    setExecutive2Title(titles[1]);
  }, [executiveIds, names, titles, setExecutiveIds, setExecutive1Name, setExecutive1Title, setExecutive2Name, setExecutive2Title]);
  return null;
};

const component = (executiveIds, names, titles) => (
  <RecoilRoot>
    <InitializeState executiveIds={ [executive1Id, executive2Id] } names={ [executive1Name, executive2Name] } titles={ [executive1Title, executive2Title] } />
    <Executives companyId={ companyId } />
  </RecoilRoot>
);

test('should render subtitle', () => {
  const { getByText } = render(component(executiveIds, executiveNames, executiveTitles));
  const subTitle = getByText('Executives');
  expect(subTitle).toBeInTheDocument();
});

test('should render and handle addExecutive button', async () => {
  
  const newExecutiveId = 3;
  const newExecutive = { company: companyId, ...defaultExecutive };

  const spy = jest.spyOn(createExecutive, 'createExecutive').mockResolvedValue({ ...newExecutive, _id: newExecutiveId });
  
  const { getByRole } = render(component(executiveIds, executiveNames, executiveTitles));
  const addButton = getByRole('button', { name: 'Add an Executive' });
  expect(addButton).toBeInTheDocument();
  userEvent.click(addButton);
  await waitFor(() => {
    expect(spy).toHaveBeenCalledWith(companyId);
    const newDeleteButton = getByRole('button', { name: `Delete Executive ${newExecutiveId}` });
    expect(newDeleteButton).toBeInTheDocument();
  });
});

test('should render name, title and delete button for each executive', () => {
  const { getByText, getByRole } = render(component(executiveIds, executiveNames, executiveTitles));
  const name1 = getByText(executive1Name);
  const title1 = getByText(executive1Title);
  const deleteButton1 = getByRole('button', { name: `Delete Executive ${executive1Id}` });  
  expect(name1).toBeInTheDocument();
  expect(title1).toBeInTheDocument();
  expect(deleteButton1).toBeInTheDocument();
  const name2 = getByText(executive2Name);
  const title2 = getByText(executive2Title);
  const deleteButton2 = getByRole('button', { name: `Delete Executive ${executive2Id}` });  
  expect(name2).toBeInTheDocument();
  expect(title2).toBeInTheDocument();
  expect(deleteButton2).toBeInTheDocument();
});


test('should not render name, title or delete button when delete button for one executive is pressed', async () => {
  
  const spy = jest.spyOn(deleteExecutive, 'deleteExecutive').mockImplementationOnce(() => Promise.resolve({ }));
  
  const { getByText, getByRole } = render(component(executiveIds, executiveNames, executiveTitles));
  const name1 = getByText(executive1Name);
  const title1 = getByText(executive1Title);  
  const deleteButton1 = getByRole('button', {name: `Delete Executive ${executive1Id}` });
  const name2 = getByText(executive2Name);
  const title2 = getByText(executive2Title);
  const deleteButton2 = getByRole('button', { name: `Delete Executive ${executive2Id}` });
  userEvent.click(deleteButton1);
  await waitFor(() => {
    expect(spy).toHaveBeenCalledWith(executive1Id);
    expect(name1).not.toBeInTheDocument();
    expect(title1).not.toBeInTheDocument();
    expect(deleteButton1).not.toBeInTheDocument();
    expect(name2).toBeInTheDocument();
    expect(title2).toBeInTheDocument();
    expect(deleteButton2).toBeInTheDocument();
  });
});