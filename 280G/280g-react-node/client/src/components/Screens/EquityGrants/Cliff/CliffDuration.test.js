import React, { useEffect, useState } from 'react';
import '@testing-library/jest-dom/extend-expect'
import {act, render, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RecoilRoot, useSetRecoilState } from 'recoil';

import CliffDuration from './CliffDuration';
import { cliffDurationState } from '../../../../recoil/equityGrant';
import * as editGrant from '../../../../api/equityGrant/editGrant';

const InitializeState = ({ grantId, duration }) => {
  
  const setCliffDuration = useSetRecoilState(cliffDurationState(grantId));
  const [ loaded, setLoaded ] = useState(false);
  const [ loading, setLoading ] = useState(true);
  
  useEffect(() => {
    if (loaded) setLoading(false);
  }, [loaded, setLoading])

  useEffect(() => {
    setCliffDuration(duration);
    setLoaded(true);
  }, [ duration, setCliffDuration, setLoaded]);
  
  return loading ? null : <CliffDuration grantId={ grantId } />;

};

const component = (grantId, duration) => (
  <RecoilRoot>
    <InitializeState grantId={ grantId } duration={ duration } />
  </RecoilRoot>
);

const grantId = 1;
const defaultCliffDuration = '';
const validCliffDuration = 12;
const nonNumericCliffDuration = 'a';
const nonPositiveCliffDuration = 0;
const descriptionText = 'Number of Months';
const error = 'Please enter a valid number of months';

test('should render description and form if no duration is provided', () => {
  const { getByRole, getByText, queryByText } = render(component(grantId, defaultCliffDuration)); 
  const description = getByText(descriptionText, { exact: false });
  expect(description).toBeInTheDocument();
  const input = getByRole('textbox');
  expect(input).toBeInTheDocument();
  const errorMessage = queryByText(error);
  expect(errorMessage).not.toBeInTheDocument();
});


test('should render description if a valid duration is provided', () => {
  const { getByText } = render(component(grantId, validCliffDuration));  
  const description = getByText(descriptionText, { exact: false });
  expect(description).toBeInTheDocument();
  const cliffDuration = getByText(validCliffDuration);
  expect(cliffDuration).toBeInTheDocument();
});


test('should render form if Edit button is pressed', () => {
  const { getByText, getByRole } = render(component(grantId, validCliffDuration));  
  const editButton = getByText('Edit');
  expect(editButton).toBeInTheDocument();  
  userEvent.click(editButton);  
  const input = getByRole('textbox');
  expect(input).toBeInTheDocument();
});


test('should show value in form if user types in form', () => {
  const { getByRole } = render(component(grantId, defaultCliffDuration));
  const input = getByRole('textbox');
  userEvent.type(input, validCliffDuration.toString());
  expect(input).toHaveValue(validCliffDuration.toString());
});


test('should show error message if non-numeric duration is submitted', async () => {
  const { getByRole, getByText } = render(component(grantId, defaultCliffDuration));
  const input = getByRole('textbox');
  userEvent.type(input, nonNumericCliffDuration);
  userEvent.type(input, '{enter}');
  const errorMessage = getByText(error);
  expect(errorMessage).toBeInTheDocument();
});


test('should show error message if non-positive duration is submitted', async () => {
  const { getByRole, getByText } = render(component(grantId, defaultCliffDuration));
  const input = getByRole('textbox');
  userEvent.type(input, nonPositiveCliffDuration.toString());
  userEvent.type(input, '{enter}');
  const errorMessage = getByText(error);
  expect(errorMessage).toBeInTheDocument();
});

test('should render description after valid submit', async () => {
  
  jest.spyOn(editGrant, 'editGrant').mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve({  }),
  }));

  const { getByRole, getByText, queryByText } = render(component(grantId, defaultCliffDuration));
  const input = getByRole('textbox');
  userEvent.type(input, validCliffDuration.toString());
  await act(() => userEvent.type(input, '{enter}'));
  let cliffDuration = await waitFor(() => getByText(validCliffDuration));
  expect(cliffDuration).toBeInTheDocument();
  const errorMessage = queryByText(error);
  expect(errorMessage).not.toBeInTheDocument();

});