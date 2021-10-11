import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import {act, render, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RecoilRoot } from 'recoil';

import CliffPercentage from './CliffPercentage';
import * as editGrant from '../../../../api/equityGrant/editGrant';
import { useSetEquityGrantTestData } from '../../../../tests/hooks/useSetEquityGrantTestData';

const InitializeState = ({ grantId, cliffPercentage }) => {
  
  const loading = useSetEquityGrantTestData({ grantId, cliffPercentage });
  
  return loading ? null : <CliffPercentage grantId={ grantId } />;

};

const component = (grantId, cliffPercentage) => (
  <RecoilRoot>
    <InitializeState grantId={ grantId } cliffPercentage={ cliffPercentage } />
  </RecoilRoot>
);

const grantId = 1;
const defaultCliffPercentage = '';
const validCliffPercentage1 = 0;
const validCliffPercentage2 = 50;
const validCliffPercentage3 = 100;
const nonNumericCliffPercentage = 'a';
const nonPositiveCliffPercentage = -10;
const excessCliffPercentage = 120;
const descriptionText = 'cliff vesting:';
const error = 'Percentage must be a number between 0 and 100, inclusive';

test('should render description and form if no percentage is provided', () => {
  const { getByRole, getByText, queryByText } = render(component(grantId, defaultCliffPercentage)); 
  const description = getByText(descriptionText, { exact: false });
  expect(description).toBeInTheDocument();
  const input = getByRole('textbox');
  expect(input).toBeInTheDocument();
  const errorMessage = queryByText(error);
  expect(errorMessage).not.toBeInTheDocument();
});


test('should render description if a valid percentage is provided', () => {
  const { getByText } = render(component(grantId, validCliffPercentage1));  
  const description = getByText(descriptionText, { exact: false });
  expect(description).toBeInTheDocument();
  const cliffPercentage = getByText(`${validCliffPercentage1}%`);
  expect(cliffPercentage).toBeInTheDocument();
});


test('should render form if Edit button is pressed', () => {
  const { getByText, getByRole } = render(component(grantId, validCliffPercentage1));  
  const editButton = getByText('Edit');
  expect(editButton).toBeInTheDocument();  
  userEvent.click(editButton);  
  const input = getByRole('textbox');
  expect(input).toBeInTheDocument();
});


test('should show value in form if user types in form', () => {
  const { getByRole } = render(component(grantId, defaultCliffPercentage));
  const input = getByRole('textbox');
  userEvent.type(input, validCliffPercentage1.toString());
  expect(input).toHaveValue(validCliffPercentage1.toString());
});


test('should show error message if non-numeric percentage is submitted', async () => {
  const { getByRole, getByText } = render(component(grantId, defaultCliffPercentage));
  const input = getByRole('textbox');
  userEvent.type(input, nonNumericCliffPercentage);
  userEvent.type(input, '{enter}');
  const errorMessage = getByText(error);
  expect(errorMessage).toBeInTheDocument();
});


test('should show error message if non-positive percentage is submitted', async () => {
  const { getByRole, getByText } = render(component(grantId, defaultCliffPercentage));
  const input = getByRole('textbox');
  userEvent.type(input, nonPositiveCliffPercentage.toString());
  userEvent.type(input, '{enter}');
  const errorMessage = getByText(error);
  expect(errorMessage).toBeInTheDocument();
});


test('should show error message if excess percentage is submitted', async () => {
  const { getByRole, getByText } = render(component(grantId, defaultCliffPercentage));
  const input = getByRole('textbox');
  userEvent.type(input, excessCliffPercentage.toString());
  userEvent.type(input, '{enter}');
  const errorMessage = getByText(error);
  expect(errorMessage).toBeInTheDocument();
});


test('should render description after valid submit (0%)', async () => {
  
  jest.spyOn(editGrant, 'editGrant').mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve({  }),
  }));

  const { getByRole, getByText, queryByText } = render(component(grantId, defaultCliffPercentage));
  const input = getByRole('textbox');
  userEvent.type(input, validCliffPercentage1.toString());
  await act(() => userEvent.type(input, '{enter}'));
  let cliffPercentage = await waitFor(() => getByText(`${validCliffPercentage1}%`));
  expect(cliffPercentage).toBeInTheDocument();
  const errorMessage = queryByText(error);
  expect(errorMessage).not.toBeInTheDocument();

});

test('should render description after valid submit (50%)', async () => {
  
  jest.spyOn(editGrant, 'editGrant').mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve({ cliffPercentage: validCliffPercentage1 }),
  }));

  const { getByRole, getByText, queryByText } = render(component(grantId, defaultCliffPercentage));
  const input = getByRole('textbox');
  userEvent.type(input, validCliffPercentage2.toString());
  await act(() => userEvent.type(input, '{enter}'));
  let cliffPercentage = await waitFor(() => getByText(`${validCliffPercentage2}%`));
  expect(cliffPercentage).toBeInTheDocument();
  const errorMessage = queryByText(error);
  expect(errorMessage).not.toBeInTheDocument();

});

test('should render description after valid submit (100%)', async () => {
  
  jest.spyOn(editGrant, 'editGrant').mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve({ cliffPercentage: validCliffPercentage1 }),
  }));

  const { getByRole, getByText, queryByText } = render(component(grantId, defaultCliffPercentage));
  const input = getByRole('textbox');
  userEvent.type(input, validCliffPercentage3.toString());
  await act(() => userEvent.type(input, '{enter}'));
  let cliffPercentage = await waitFor(() => getByText(`${validCliffPercentage3}%`));
  expect(cliffPercentage).toBeInTheDocument();
  const errorMessage = queryByText(error);
  expect(errorMessage).not.toBeInTheDocument();

});