import React, { useState, useEffect } from 'react';
import '@testing-library/jest-dom/extend-expect'
import {fireEvent, render, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RecoilRoot, useSetRecoilState } from 'recoil';

import VestingStartDate from './VestingStartDate';
import { vestingStartDateState } from '../../../../recoil/equityGrant';
import * as editGrant from '../../../../api/equityGrant/editGrant';
import { stringify, formatDate } from '../../../../utilities/date/date';

const InitializeState = ({ grantId, date }) => {

  const setVestingStartDate = useSetRecoilState(vestingStartDateState(grantId));
  const [ loaded, setLoaded ] = useState(false);
  const [ loading, setLoading ] = useState(true);
  
  useEffect(() => {
    if (loaded) setLoading(false)
  }, [loaded, setLoading])

  useEffect(() => {
    setVestingStartDate(date);
    setLoaded(true);
  }, [ date, setVestingStartDate, setLoaded])

  return loading ? null : <VestingStartDate grantId={ grantId } />

}

const component = (grantId, date) => (
  <RecoilRoot>
    <InitializeState grantId={ grantId } date={ date } />
  </RecoilRoot>
);

const grantId = 12;
const defaultVestingStartDate = '';
const givenVestingStartDate = new Date('October 1, 2021');
const isoFormatGivenVestingStartDate = stringify(givenVestingStartDate)
const descriptionText = 'Vesting Start Date:';


test('should render description and form if no transaction date is provided', () => {
  const { getByRole, getByText } = render(component(grantId, defaultVestingStartDate)); 
  const description = getByText(descriptionText);
  expect(description).toBeInTheDocument();
  const input = getByRole('textbox');
  expect(input).toBeInTheDocument(); 
});


test('should render description if transaction date is provided', () => {
  const { getByText } = render(component(grantId, isoFormatGivenVestingStartDate));  
  const description = getByText(descriptionText);
  expect(description).toBeInTheDocument();
  const vestingStartDate = getByText(formatDate(isoFormatGivenVestingStartDate));
  expect(vestingStartDate).toBeInTheDocument();
});


test('should render form if Edit button is pressed', () => {
  const { getByText, getByRole } = render(component(grantId, isoFormatGivenVestingStartDate));
  const editButton = getByText('Edit');
  expect(editButton).toBeInTheDocument();  
  userEvent.click(editButton);  
  const input = getByRole('textbox');
  expect(input).toBeInTheDocument();
});

test('should render description after change', async () => {
  
  jest.spyOn(editGrant, 'editGrant').mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve({ vestingStartDate: isoFormatGivenVestingStartDate }),
  }));

  const { getByRole, getByText } = render(component(grantId, defaultVestingStartDate));
  const input = getByRole('textbox');
  fireEvent.change(input, { target: { value: isoFormatGivenVestingStartDate }});
  const vestingStartDate = await waitFor(() => getByText(formatDate(isoFormatGivenVestingStartDate)));
  expect(vestingStartDate).toBeInTheDocument();
});