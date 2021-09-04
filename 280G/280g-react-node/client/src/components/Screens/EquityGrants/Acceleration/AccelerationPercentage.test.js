import React, { useEffect, useState } from 'react';
import '@testing-library/jest-dom/extend-expect'
import {act, render, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RecoilRoot, useSetRecoilState } from 'recoil';

import AccelerationPercentage from './AccelerationPercentage';
import { accelerationPercentageState } from '../../../../recoil/equityGrant';
import * as editGrant from '../../../../api/equityGrant/editGrant';

const InitializeState = ({ grantId, percentage }) => {
  
  const setAccelerationPercentage = useSetRecoilState(accelerationPercentageState(grantId));
  const [ loaded, setLoaded ] = useState(false);
  const [ loading, setLoading ] = useState(true);
  
  useEffect(() => {
    if (loaded) setLoading(false);
  }, [loaded, setLoading])

  useEffect(() => {
    setAccelerationPercentage(percentage);
    setLoaded(true);
  }, [ percentage, setAccelerationPercentage, setLoaded]);
  
  return loading ? null : <AccelerationPercentage grantId={ grantId } />;

};

const component = (grantId, percentage) => (
  <RecoilRoot>
    <InitializeState grantId={ grantId } percentage={ percentage } />
  </RecoilRoot>
);

const grantId = 1;
const defaultAccelerationPercentage = '';
const validAccelerationPercentage1 = 0;
const validAccelerationPercentage2 = 50;
const validAccelerationPercentage3 = 100;
const nonNumericAccelerationPercentage = 'a';
const nonPositiveAccelerationPercentage = -10;
const excessAccelerationPercentage = 120;
const descriptionText = 'Percentage accelerating:';
const error = 'Percentage must be a number between 0 and 100, inclusive';

test('should render description and form if no percentage is provided', () => {
  const { getByRole, getByText, queryByText } = render(component(grantId, defaultAccelerationPercentage)); 
  const description = getByText(descriptionText);
  expect(description).toBeInTheDocument();
  const input = getByRole('textbox');
  expect(input).toBeInTheDocument();
  const errorMessage = queryByText(error);
  expect(errorMessage).not.toBeInTheDocument();
});


test('should render description if a valid percentage is provided', () => {
  const { getByText } = render(component(grantId, validAccelerationPercentage1));  
  const description = getByText(descriptionText);
  expect(description).toBeInTheDocument();
  const accelerationPercentage = getByText(`${validAccelerationPercentage1}%`);
  expect(accelerationPercentage).toBeInTheDocument();
});


test('should render form if Edit button is pressed', () => {
  const { getByText, getByRole } = render(component(grantId, validAccelerationPercentage1));  
  const editButton = getByText('Edit');
  expect(editButton).toBeInTheDocument();  
  userEvent.click(editButton);  
  const input = getByRole('textbox');
  expect(input).toBeInTheDocument();
});


test('should show value in form if user types in form', () => {
  const { getByRole } = render(component(grantId, defaultAccelerationPercentage));
  const input = getByRole('textbox');
  userEvent.type(input, validAccelerationPercentage1.toString());
  expect(input).toHaveValue(validAccelerationPercentage1.toString());
});


test('should show error message if non-numeric percentage is submitted', async () => {
  const { getByRole, getByText } = render(component(grantId, defaultAccelerationPercentage));
  const input = getByRole('textbox');
  userEvent.type(input, nonNumericAccelerationPercentage);
  userEvent.type(input, '{enter}');
  const errorMessage = getByText(error);
  expect(errorMessage).toBeInTheDocument();
});


test('should show error message if non-positive percentage is submitted', async () => {
  const { getByRole, getByText } = render(component(grantId, defaultAccelerationPercentage));
  const input = getByRole('textbox');
  userEvent.type(input, nonPositiveAccelerationPercentage.toString());
  userEvent.type(input, '{enter}');
  const errorMessage = getByText(error);
  expect(errorMessage).toBeInTheDocument();
});


test('should show error message if excess percentage is submitted', async () => {
  const { getByRole, getByText } = render(component(grantId, defaultAccelerationPercentage));
  const input = getByRole('textbox');
  userEvent.type(input, excessAccelerationPercentage.toString());
  userEvent.type(input, '{enter}');
  const errorMessage = getByText(error);
  expect(errorMessage).toBeInTheDocument();
});


test('should render description after valid submit (0%)', async () => {
  
  jest.spyOn(editGrant, 'editGrant').mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve({  }),
  }));

  const { getByRole, getByText, queryByText } = render(component(grantId, defaultAccelerationPercentage));
  const input = getByRole('textbox');
  userEvent.type(input, validAccelerationPercentage1.toString());
  await act(() => userEvent.type(input, '{enter}'));
  let accelerationPercentage = await waitFor(() => getByText(`${validAccelerationPercentage1}%`));
  expect(accelerationPercentage).toBeInTheDocument();
  const errorMessage = queryByText(error);
  expect(errorMessage).not.toBeInTheDocument();

});

test('should render description after valid submit (50%)', async () => {
  
  jest.spyOn(editGrant, 'editGrant').mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve({ accelerationPercentage: validAccelerationPercentage1 }),
  }));

  const { getByRole, getByText, queryByText } = render(component(grantId, defaultAccelerationPercentage));
  const input = getByRole('textbox');
  userEvent.type(input, validAccelerationPercentage2.toString());
  await act(() => userEvent.type(input, '{enter}'));
  let accelerationPercentage = await waitFor(() => getByText(`${validAccelerationPercentage2}%`));
  expect(accelerationPercentage).toBeInTheDocument();
  const errorMessage = queryByText(error);
  expect(errorMessage).not.toBeInTheDocument();

});

test('should render description after valid submit (100%)', async () => {
  
  jest.spyOn(editGrant, 'editGrant').mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve({ accelerationPercentage: validAccelerationPercentage1 }),
  }));

  const { getByRole, getByText, queryByText } = render(component(grantId, defaultAccelerationPercentage));
  const input = getByRole('textbox');
  userEvent.type(input, validAccelerationPercentage3.toString());
  await act(() => userEvent.type(input, '{enter}'));
  let accelerationPercentage = await waitFor(() => getByText(`${validAccelerationPercentage3}%`));
  expect(accelerationPercentage).toBeInTheDocument();
  const errorMessage = queryByText(error);
  expect(errorMessage).not.toBeInTheDocument();

});