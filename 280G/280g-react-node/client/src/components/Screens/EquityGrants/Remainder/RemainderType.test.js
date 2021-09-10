import React, { useState, useEffect } from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RecoilRoot, useSetRecoilState } from 'recoil';

import RemainderType from './RemainderType';
import { remainderTypeState } from '../../../../recoil/equityGrant';
import * as editGrant from '../../../../api/equityGrant/editGrant';

const InitializeState = ({ grantId, checked }) => {

  const setRemainderType = useSetRecoilState(remainderTypeState(grantId));
  const [ loaded, setLoaded ] = useState(false);
  const [ loading, setLoading ] = useState(true);
  
  useEffect(() => {
    if (loaded) setLoading(false)
  }, [loaded, setLoading])

  useEffect(() => {
    setRemainderType(checked);
    setLoaded(true);
  }, [checked, setRemainderType, setLoaded]);

  return loading ? null : <RemainderType grantId={ grantId } />

}
const component = (grantId, checked) => (
  <RecoilRoot>
    <InitializeState grantId={ grantId } checked={ checked } />
  </RecoilRoot>
);

const grantId = 12;
const monthly = 'Monthly';
const quarterly = 'Quarterly';
const annually = 'Annually';
const other = 'Other';

test('should render description and radio buttons with labels', () => {
  const { getByRole, getByLabelText } = render(component(grantId, monthly)); 
  const description = getByRole('heading', { level: 2 });
  const radioMonthly = getByLabelText(monthly);
  const radioQuarterly = getByLabelText(quarterly);
  const radioAnnually = getByLabelText(annually);
  const radioOther = getByLabelText(other);
  expect(description).toBeInTheDocument();
  expect(radioMonthly).toBeInTheDocument();
  expect(radioQuarterly).toBeInTheDocument();
  expect(radioAnnually).toBeInTheDocument();
  expect(radioOther).toBeInTheDocument();
});

test('should start with monthly checked and change with appropriate editGrant call', () => {
  
  const spy = jest.spyOn(editGrant, 'editGrant').mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve({  }),
  }));
  
  const { getByLabelText } = render(component(grantId, monthly)); 
  const radioMonthly = getByLabelText(monthly);
  const radioQuarterly = getByLabelText(quarterly);
  const radioAnnually = getByLabelText(annually);
  const radioOther = getByLabelText(other);

  userEvent.click(radioQuarterly);
  expect(spy).toHaveBeenCalledWith(grantId, { remainderType: quarterly});
  expect(radioQuarterly).toBeChecked();
  expect(radioMonthly).not.toBeChecked();

  userEvent.click(radioAnnually);
  expect(spy).toHaveBeenCalledWith(grantId, { remainderType: annually});
  expect(radioAnnually).toBeChecked();
  expect(radioQuarterly).not.toBeChecked();

  userEvent.click(radioOther);
  expect(spy).toHaveBeenCalledWith(grantId, { remainderType: other});
  expect(radioOther).toBeChecked();
  expect(radioAnnually).not.toBeChecked();

});

test('should start with quarterly checked and change to monthly with appropriate editGrant call', () => {
  
  const spy = jest.spyOn(editGrant, 'editGrant').mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve({  }),
  }));
  
  const { getByLabelText } = render(component(grantId, quarterly)); 
  const radioQuarterly = getByLabelText(quarterly);
  const radioMonthly = getByLabelText(monthly);

  userEvent.click(radioMonthly);
  expect(spy).toHaveBeenCalledWith(grantId, { remainderType: monthly});
  expect(radioQuarterly).not.toBeChecked();
  expect(radioMonthly).toBeChecked();
});