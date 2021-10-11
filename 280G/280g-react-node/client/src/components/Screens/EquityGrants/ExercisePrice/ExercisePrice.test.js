import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import {act, render, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RecoilRoot } from 'recoil';

import ExercisePrice from './ExercisePrice';
import * as editGrant from '../../../../api/equityGrant/editGrant';
import { useSetEquityGrantTestData } from '../../../../tests/hooks/useSetEquityGrantTestData';

const InitializeState = ({ grantId, exercisePrice }) => {

  const loading = useSetEquityGrantTestData({ grantId, exercisePrice });

  return loading ? null : <ExercisePrice grantId={ grantId } />

}

const component = (grantId, exercisePrice) => (
  <RecoilRoot>
    <InitializeState grantId={ grantId } exercisePrice={ exercisePrice } />
  </RecoilRoot>
);

const grantId = 12;
const defaultExercisePrice = '';
const validExercisePrice = 1;
const nonNumericExercisePrice = 'a';
const nonPositiveExercisePrice = 0;
const descriptionText = 'Exercise Price per Share:';
const error = 'Please enter a valid exercise price';


test('should render description and form if no exercise price is provided', () => {
  const { getByRole, getByText, queryByText } = render(component(defaultExercisePrice)); 
  const description = getByText(descriptionText);
  expect(description).toBeInTheDocument();
  const input = getByRole('textbox');
  expect(input).toBeInTheDocument();
  const errorMessage = queryByText(error);
  expect(errorMessage).not.toBeInTheDocument();
});


test('should render description if exercise price is provided', () => {
  const { getByText } = render(component(grantId, validExercisePrice));  
  const description = getByText(descriptionText);
  expect(description).toBeInTheDocument();
  const exercisePrice = getByText(`$${validExercisePrice}`);
  expect(exercisePrice).toBeInTheDocument();
});


test('should render form if Edit button is pressed', () => {
  const { getByText, getByRole } = render(component(grantId, validExercisePrice));  
  const editButton = getByText('Edit');
  expect(editButton).toBeInTheDocument();  
  userEvent.click(editButton);  
  const input = getByRole('textbox');
  expect(input).toBeInTheDocument();
});


test('should show value in form if user types in form', () => {
  const { getByRole } = render(component(grantId, defaultExercisePrice));
  const input = getByRole('textbox');
  userEvent.type(input, validExercisePrice.toString());
  expect(input).toHaveValue(validExercisePrice.toString());
});


test('should show error message if non-numeric exercise price is submitted', async () => {
  const { getByRole, getByText } = render(component(grantId, defaultExercisePrice));
  const input = getByRole('textbox');
  userEvent.type(input, nonNumericExercisePrice);
  userEvent.type(input, '{enter}');
  const errorMessage = getByText(error);
  expect(errorMessage).toBeInTheDocument();
});


test('should show error message if non-positive exercise price is submitted', async () => {
  const { getByRole, getByText } = render(component(grantId, defaultExercisePrice));
  const input = getByRole('textbox');
  userEvent.type(input, nonPositiveExercisePrice);
  userEvent.type(input, '{enter}');
  const errorMessage = getByText(error);
  expect(errorMessage).toBeInTheDocument();
});


test('should render description after valid submit', async () => {
  
  jest.spyOn(editGrant, 'editGrant').mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve({ exercisePrice: validExercisePrice }),
  }));

  const { getByRole, getByText, queryByText } = render(component(grantId, defaultExercisePrice));
  const input = getByRole('textbox');
  userEvent.type(input, validExercisePrice.toString());
  await act(() => userEvent.type(input, '{enter}'));
  const exercisePrice = await waitFor(() => getByText(`$${validExercisePrice.toString()}`));
  expect(exercisePrice).toBeInTheDocument();
  const errorMessage = queryByText(error);
  expect(errorMessage).not.toBeInTheDocument();
});


