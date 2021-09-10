import React, { useEffect, useState } from 'react';
import '@testing-library/jest-dom/extend-expect'
import {act, render, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RecoilRoot, useSetRecoilState } from 'recoil';

import RemainderPeriods from './RemainderPeriods';
import { remainderPeriodsState } from '../../../../recoil/equityGrant';
import * as editGrant from '../../../../api/equityGrant/editGrant';

const InitializeState = ({ grantId, periods }) => {
  
  const setRemainderPeriods = useSetRecoilState(remainderPeriodsState(grantId));
  const [ loaded, setLoaded ] = useState(false);
  const [ loading, setLoading ] = useState(true);
  
  useEffect(() => {
    if (loaded) setLoading(false);
  }, [loaded, setLoading])

  useEffect(() => {
    setRemainderPeriods(periods);
    setLoaded(true);
  }, [ periods, setRemainderPeriods, setLoaded]);
  
  return loading ? null : <RemainderPeriods grantId={ grantId } />;

};

const component = (grantId, periods) => (
  <RecoilRoot>
    <InitializeState grantId={ grantId } periods={ periods } />
  </RecoilRoot>
);

const grantId = 1;
const defaultRemainderPeriods = '';
const validRemainderPeriods = 12;
const nonNumericRemainderPeriods = 'a';
const nonPositiveRemainderPeriods = 0;
const descriptionText = 'Number of Periods';
const error = 'Please enter a valid number of periods';

test('should render description and form if no periods are provided', () => {
  const { getByRole, getByText, queryByText } = render(component(grantId, defaultRemainderPeriods)); 
  const description = getByText(descriptionText, { exact: false });
  expect(description).toBeInTheDocument();
  const input = getByRole('textbox');
  expect(input).toBeInTheDocument();
  const errorMessage = queryByText(error);
  expect(errorMessage).not.toBeInTheDocument();
});


test('should render description if a valid number of periods is provided', () => {
  const { getByText } = render(component(grantId, validRemainderPeriods));  
  const description = getByText(descriptionText, { exact: false });
  expect(description).toBeInTheDocument();
  const remainderPeriods = getByText(validRemainderPeriods);
  expect(remainderPeriods).toBeInTheDocument();
});


test('should render form if Edit button is pressed', () => {
  const { getByText, getByRole } = render(component(grantId, validRemainderPeriods));  
  const editButton = getByText('Edit');
  expect(editButton).toBeInTheDocument();  
  userEvent.click(editButton);  
  const input = getByRole('textbox');
  expect(input).toBeInTheDocument();
});


test('should show value in form if user types in form', () => {
  const { getByRole } = render(component(grantId, defaultRemainderPeriods));
  const input = getByRole('textbox');
  userEvent.type(input, validRemainderPeriods.toString());
  expect(input).toHaveValue(validRemainderPeriods.toString());
});


test('should show error message if non-numeric number of periods is submitted', async () => {
  const { getByRole, getByText } = render(component(grantId, defaultRemainderPeriods));
  const input = getByRole('textbox');
  userEvent.type(input, nonNumericRemainderPeriods);
  userEvent.type(input, '{enter}');
  const errorMessage = getByText(error);
  expect(errorMessage).toBeInTheDocument();
});


test('should show error message if non-positive number of periods is submitted', async () => {
  const { getByRole, getByText } = render(component(grantId, defaultRemainderPeriods));
  const input = getByRole('textbox');
  userEvent.type(input, nonPositiveRemainderPeriods.toString());
  userEvent.type(input, '{enter}');
  const errorMessage = getByText(error);
  expect(errorMessage).toBeInTheDocument();
});

test('should render description after valid submit', async () => {
  
  jest.spyOn(editGrant, 'editGrant').mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve({  }),
  }));

  const { getByRole, getByText, queryByText } = render(component(grantId, defaultRemainderPeriods));
  const input = getByRole('textbox');
  userEvent.type(input, validRemainderPeriods.toString());
  await act(() => userEvent.type(input, '{enter}'));
  let remainderPeriods = await waitFor(() => getByText(validRemainderPeriods));
  expect(remainderPeriods).toBeInTheDocument();
  const errorMessage = queryByText(error);
  expect(errorMessage).not.toBeInTheDocument();

});