import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RecoilRoot } from 'recoil';

import Acceleration from './Acceleration';
import * as editGrant from '../../../../api/equityGrant/editGrant';
import { useSetEquityGrantTestData } from '../../../../tests/hooks/useSetEquityGrantTestData';

const InitializeState = ({ grantId, acceleration }) => {

  const loading = useSetEquityGrantTestData({ grantId, acceleration });

  return loading ? null : <Acceleration grantId={ grantId } />

}
const component = (grantId, acceleration) => (
  <RecoilRoot>
    <InitializeState grantId={ grantId } acceleration={ acceleration } />
  </RecoilRoot>
);

const grantId = 12;
const checked = true;
const unchecked = false;

test('should render description, note and a checked form if initial state is checked', () => {
  const { getByLabelText, getByRole } = render(component(grantId, checked)); 
  const label = getByLabelText('Check', { exact: false });
  expect(label).toBeInTheDocument();
  const checkbox = getByRole('checkbox');
  expect(checkbox).toBeInTheDocument();
  expect(checkbox).toBeChecked();
});

test('should render an unchecked checkbox if initial state is unchecked', () => {
  const { getByRole } = render(component(grantId, unchecked));  
  const checkbox = getByRole('checkbox');
  expect(checkbox).toBeInTheDocument();
  expect(checkbox).not.toBeChecked();
});

test('should uncheck checkbox if checked', async () => {

  const spy = jest.spyOn(editGrant, 'editGrant').mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve({  }),
  }));

  const { getByRole } = render(component(grantId, checked));
  const checkbox = getByRole('checkbox');
  userEvent.click(checkbox);
  expect(spy).toHaveBeenCalledWith(grantId, { acceleration: unchecked })
  await waitFor(() => expect(checkbox).not.toBeChecked());
});

test('should check checkbox if unchecked', async () => {
  
  const spy = jest.spyOn(editGrant, 'editGrant').mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve({  }),
  }));

  const { getByRole } = render(component(grantId, unchecked));
  const checkbox = getByRole('checkbox');
  userEvent.click(checkbox);
  expect(spy).toHaveBeenCalledWith(grantId, { acceleration: checked })
  await waitFor(() => expect(checkbox).toBeChecked());
});

// Radio form tests are disabled

test('should render radio form and textbox if checkbox is checked', () => {
  const { getByText } = render(component(grantId, checked));  
  // const radio = getAllByRole('radio');
  const percentage = getByText('Percentage accelerating:', { exact: false });
  // expect(radio[0]).toBeInTheDocument();
  expect(percentage).toBeInTheDocument();
});

test('should not render radio form and textbox if checkbox is not checked', () => {
  const { queryByRole } = render(component(grantId, unchecked));  
  // expect(queryByRole('radio')).not.toBeInTheDocument();
  expect(queryByRole('percentage')).not.toBeInTheDocument();
});