import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import {act, render, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RecoilRoot } from 'recoil';

import Shares from './Shares';
import * as editGrant from '../../../../api/equityGrant/editGrant';
import { useSetEquityGrantTestData } from '../../../../tests/hooks/useSetEquityGrantTestData';

const InitializeState = ({ grantId, numberShares }) => {
  
  const loading = useSetEquityGrantTestData({ grantId, numberShares });
  
  return loading ? null : <Shares grantId={ grantId } />;

};

const component = (grantId, numberShares) => (
  <RecoilRoot>
    <InitializeState grantId={ grantId } numberShares={ numberShares } />
  </RecoilRoot>
);

const grantId = 1;
const defaultShares = '';
const validShares = 100;
const nonNumericShares = 'a';
const nonPositiveShares = 0;
const descriptionText = 'Number of Shares';
const error = 'Please enter a valid number of shares';

test('should render description and form if no shares is provided', () => {
  const { getByRole, getByText, queryByText } = render(component(grantId, defaultShares)); 
  const description = getByText(descriptionText, { exact: false });
  expect(description).toBeInTheDocument();
  const input = getByRole('textbox');
  expect(input).toBeInTheDocument();
  const errorMessage = queryByText(error);
  expect(errorMessage).not.toBeInTheDocument();
});


test('should render description if a valid shares is provided', () => {
  const { getByText } = render(component(grantId, validShares));  
  const description = getByText(descriptionText, { exact: false });
  expect(description).toBeInTheDocument();
  const shares = getByText(validShares);
  expect(shares).toBeInTheDocument();
});


test('should render form if Edit button is pressed', () => {
  const { getByText, getByRole } = render(component(grantId, validShares));  
  const editButton = getByText('Edit');
  expect(editButton).toBeInTheDocument();  
  userEvent.click(editButton);  
  const input = getByRole('textbox');
  expect(input).toBeInTheDocument();
});


test('should show value in form if user types in form', () => {
  const { getByRole } = render(component(grantId, defaultShares));
  const input = getByRole('textbox');
  userEvent.type(input, validShares.toString());
  expect(input).toHaveValue(validShares.toString());
});


test('should show error message if non-numeric shares is submitted', async () => {
  const { getByRole, getByText } = render(component(grantId, defaultShares));
  const input = getByRole('textbox');
  userEvent.type(input, nonNumericShares);
  userEvent.type(input, '{enter}');
  const errorMessage = getByText(error);
  expect(errorMessage).toBeInTheDocument();
});


test('should show error message if non-positive shares is submitted', async () => {
  const { getByRole, getByText } = render(component(grantId, defaultShares));
  const input = getByRole('textbox');
  userEvent.type(input, nonPositiveShares.toString());
  userEvent.type(input, '{enter}');
  const errorMessage = getByText(error);
  expect(errorMessage).toBeInTheDocument();
});

test('should render description after valid submit', async () => {
  
  jest.spyOn(editGrant, 'editGrant').mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve({  }),
  }));

  const { getByRole, getByText, queryByText } = render(component(grantId, defaultShares));
  const input = getByRole('textbox');
  userEvent.type(input, validShares.toString());
  await act(() => userEvent.type(input, '{enter}'));
  let shares = await waitFor(() => getByText(validShares));
  expect(shares).toBeInTheDocument();
  const errorMessage = queryByText(error);
  expect(errorMessage).not.toBeInTheDocument();

});