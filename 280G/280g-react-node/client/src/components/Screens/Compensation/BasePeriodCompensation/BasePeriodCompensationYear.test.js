import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RecoilRoot } from 'recoil';

import BasePeriodCompensationYear from './BasePeriodCompensationYear';

const component = (year, compensation) => (
  <RecoilRoot>
    <BasePeriodCompensationYear year={ year } compensation={ compensation } />
  </RecoilRoot>
);

const year = 2018;
const defaultCompensation = '';
const validCompensation = 1;
const nonNumericCompensation = 'a';
const nonPositiveCompensation = 0;
const descriptionText = `${year}:`;
const error = 'Please enter a valid compensation amount';

test('should render description and form if no compensation is provided', () => {
  const { getByRole, getByText, queryByText } = render(component(year, defaultCompensation)); 
  const description = getByText(descriptionText);
  expect(description).toBeInTheDocument();
  const input = getByRole('textbox');
  expect(input).toBeInTheDocument();
  const errorMessage = queryByText(error);
  expect(errorMessage).not.toBeInTheDocument();
});


test('should render description if compensation is provided', () => {
  const { getByText } = render(component(year, validCompensation));  
  const description = getByText(descriptionText);
  expect(description).toBeInTheDocument();
  const transactionPrice = getByText(`$${validCompensation}`);
  expect(transactionPrice).toBeInTheDocument();
});


test('should render form if Edit button is pressed', () => {
  const { getByText, getByRole } = render(component(year, validCompensation));  
  const editButton = getByText('Edit');
  expect(editButton).toBeInTheDocument();  
  userEvent.click(editButton);  
  const input = getByRole('textbox');
  expect(input).toBeInTheDocument();
});


test('should show value in form if user types in form', () => {
  const { getByRole } = render(component(year, defaultCompensation));
  const input = getByRole('textbox');
  userEvent.type(input, validCompensation.toString());
  expect(input).toHaveValue(validCompensation.toString());
});


test('should show error message if non-numeric transaction price is submitted', async () => {
  const { getByRole, getByText } = render(component(year, defaultCompensation));
  const input = getByRole('textbox');
  userEvent.type(input, nonNumericCompensation);
  userEvent.type(input, '{enter}');
  const errorMessage = getByText(error);
  expect(errorMessage).toBeInTheDocument();
});


test('should show error message if non-positive transaction price is submitted', async () => {
  const { getByRole, getByText } = render(component(year, defaultCompensation));
  const input = getByRole('textbox');
  userEvent.type(input, nonPositiveCompensation);
  userEvent.type(input, '{enter}');
  const errorMessage = getByText(error);
  expect(errorMessage).toBeInTheDocument();
});


