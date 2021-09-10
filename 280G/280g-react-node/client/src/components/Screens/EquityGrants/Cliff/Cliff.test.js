import React, { useState, useEffect } from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RecoilRoot, useSetRecoilState } from 'recoil';

import Cliff from './Cliff';
import { cliffState } from '../../../../recoil/equityGrant';
import * as editGrant from '../../../../api/equityGrant/editGrant';

const InitializeState = ({ grantId, checked }) => {

  const setCliff = useSetRecoilState(cliffState(grantId));
  const [ loaded, setLoaded ] = useState(false);
  const [ loading, setLoading ] = useState(true);
  
  useEffect(() => {
    if (loaded) setLoading(false)
  }, [loaded, setLoading])

  useEffect(() => {
    setCliff(checked);
    setLoaded(true);
  }, [checked, setCliff, setLoaded]);

  return loading ? null : <Cliff grantId={ grantId } />

}
const component = (grantId, checked) => (
  <RecoilRoot>
    <InitializeState grantId={ grantId } checked={ checked } />
  </RecoilRoot>
);

const grantId = 12;
const checked = true;
const unchecked = false;
const durationText = 'Number of months';
const percentageText = 'Percentage of shares';

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
  expect(spy).toHaveBeenCalledWith(grantId, { cliff: unchecked })
  await waitFor(() => expect(checkbox).not.toBeChecked());
});

test('should check checkbox if unchecked', async () => {
  
  const spy = jest.spyOn(editGrant, 'editGrant').mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve({  }),
  }));

  const { getByRole } = render(component(grantId, unchecked));
  const checkbox = getByRole('checkbox');
  userEvent.click(checkbox);
  expect(spy).toHaveBeenCalledWith(grantId, { cliff: checked })
  await waitFor(() => expect(checkbox).toBeChecked());
});

test('should render duration and percentage elements if checkbox is checked', () => {
  const { getByText } = render(component(grantId, checked));  
  const duration = getByText(durationText, { exact: false });
  const percentage = getByText(percentageText, { exact: false });
  expect(duration).toBeInTheDocument();
  expect(percentage).toBeInTheDocument();
});

test('should not render duration and percentage elements if checkbox is not checked', () => {
  const { queryByText } = render(component(grantId, unchecked));  
  expect(queryByText(durationText, { exact: false })).not.toBeInTheDocument();
  expect(queryByText(percentageText, { exact: false })).not.toBeInTheDocument();
});