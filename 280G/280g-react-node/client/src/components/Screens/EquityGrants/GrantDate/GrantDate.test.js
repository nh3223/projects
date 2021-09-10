import React, { useState, useEffect } from 'react';
import '@testing-library/jest-dom/extend-expect'
import {fireEvent, render, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RecoilRoot, useSetRecoilState } from 'recoil';

import GrantDate from './GrantDate';
import { grantDateState } from '../../../../recoil/equityGrant';
import * as editGrant from '../../../../api/equityGrant/editGrant';
import { stringify, formatDate } from '../../../../utilities/date/date';

const InitializeState = ({ grantId, date }) => {

  const setGrantDate = useSetRecoilState(grantDateState(grantId));
  const [ loaded, setLoaded ] = useState(false);
  const [ loading, setLoading ] = useState(true);
  
  useEffect(() => {
    if (loaded) setLoading(false)
  }, [loaded, setLoading])

  useEffect(() => {
    setGrantDate(date);
    setLoaded(true);
  }, [ date, setGrantDate, setLoaded])

  return loading ? null : <GrantDate grantId={ grantId } />

}

const component = (grantId, date) => (
  <RecoilRoot>
    <InitializeState grantId={ grantId } date={ date } />
  </RecoilRoot>
);

const grantId = 12;
const defaultGrantDate = '';
const givenGrantDate = new Date('October 1, 2021');
const isoFormatGivenGrantDate = stringify(givenGrantDate)
const descriptionText = 'Grant Date:';


test('should render description and form if no transaction date is provided', () => {
  const { getByRole, getByText } = render(component(grantId, defaultGrantDate)); 
  const description = getByText(descriptionText);
  expect(description).toBeInTheDocument();
  const input = getByRole('textbox');
  expect(input).toBeInTheDocument(); 
});


test('should render description if transaction date is provided', () => {
  const { getByText } = render(component(grantId, isoFormatGivenGrantDate));  
  const description = getByText(descriptionText);
  expect(description).toBeInTheDocument();
  const grantDate = getByText(formatDate(isoFormatGivenGrantDate));
  expect(grantDate).toBeInTheDocument();
});


test('should render form if Edit button is pressed', () => {
  const { getByText, getByRole } = render(component(grantId, isoFormatGivenGrantDate));
  const editButton = getByText('Edit');
  expect(editButton).toBeInTheDocument();  
  userEvent.click(editButton);  
  const input = getByRole('textbox');
  expect(input).toBeInTheDocument();
});

test('should render description after change', async () => {
  
  jest.spyOn(editGrant, 'editGrant').mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve({ grantDate: isoFormatGivenGrantDate }),
  }));

  const { getByRole, getByText } = render(component(grantId, defaultGrantDate));
  const input = getByRole('textbox');
  fireEvent.change(input, { target: { value: isoFormatGivenGrantDate }});
  const grantDate = await waitFor(() => getByText(formatDate(isoFormatGivenGrantDate)));
  expect(grantDate).toBeInTheDocument();
});