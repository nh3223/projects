import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RecoilRoot } from 'recoil';

import ChangeOfControl from './ChangeOfControl';
import * as editGrant from '../../../../api/equityGrant/editGrant';
import { useSetEquityGrantTestData } from '../../../../tests/hooks/useSetEquityGrantTestData';

const InitializeState = ({ grantId, changeOfControl }) => {

  const loading = useSetEquityGrantTestData({ grantId, changeOfControl });

  return loading ? null : <ChangeOfControl grantId={ grantId } />

}
const component = (grantId, changeOfControl) => (
  <RecoilRoot>
    <InitializeState grantId={ grantId } changeOfControl={ changeOfControl } />
  </RecoilRoot>
);

const grantId = 12;
const checked = true;
const unchecked = false;

test('should render description, note and a checked form if initial state is checked', () => {
  const { getByLabelText, getByText, getByRole } = render(component(grantId, checked)); 
  const label = getByLabelText('Check', { exact: false });
  const note = getByText('Note:', { exact: false });
  expect(label).toBeInTheDocument();
  expect(note).toBeInTheDocument();
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
  expect(spy).toHaveBeenCalledWith(grantId, { changeOfControl: unchecked })
  await waitFor(() => expect(checkbox).not.toBeChecked());
});

test('should check checkbox if unchecked', async () => {
  
  const spy = jest.spyOn(editGrant, 'editGrant').mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve({  }),
  }));

  const { getByRole } = render(component(grantId, unchecked));
  const checkbox = getByRole('checkbox');
  userEvent.click(checkbox);
  expect(spy).toHaveBeenCalledWith(grantId, { changeOfControl: checked })
  await waitFor(() => expect(checkbox).toBeChecked());
});
