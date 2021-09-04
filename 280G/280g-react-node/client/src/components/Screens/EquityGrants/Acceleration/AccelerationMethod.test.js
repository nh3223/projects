import React, { useState, useEffect } from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RecoilRoot, useSetRecoilState } from 'recoil';

import AccelerationMethod from './AccelerationMethod';
import { accelerationMethodState } from '../../../../recoil/equityGrant';
import * as editGrant from '../../../../api/equityGrant/editGrant';

const InitializeState = ({ grantId, checked }) => {

  const setAccelerationMethod = useSetRecoilState(accelerationMethodState(grantId));
  const [ loaded, setLoaded ] = useState(false);
  const [ loading, setLoading ] = useState(true);
  
  useEffect(() => {
    if (loaded) setLoading(false)
  }, [loaded, setLoading])

  useEffect(() => {
    setAccelerationMethod(checked);
    setLoaded(true);
  }, [checked, setAccelerationMethod, setLoaded]);

  return loading ? null : <AccelerationMethod grantId={ grantId } />

}
const component = (grantId, checked) => (
  <RecoilRoot>
    <InitializeState grantId={ grantId } checked={ checked } />
  </RecoilRoot>
);

const grantId = 12;
const next = 'Next to Vest';
const last = 'Last to Vest';
const proportional = 'Proportional';
const other = 'Other';

test('should render description and radio buttons with labels', () => {
  const { getByRole, getByLabelText } = render(component(grantId, next)); 
  const description = getByRole('heading', { level: 2 });
  const radioNext = getByLabelText(next);
  const radioLast = getByLabelText(last);
  const radioProportional = getByLabelText(proportional);
  const radioOther = getByLabelText(other);
  expect(description).toBeInTheDocument();
  expect(radioNext).toBeInTheDocument();
  expect(radioLast).toBeInTheDocument();
  expect(radioProportional).toBeInTheDocument();
  expect(radioOther).toBeInTheDocument();
});

test('should start with next checked and change with appropriate editGrant call', () => {
  
  const spy = jest.spyOn(editGrant, 'editGrant').mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve({  }),
  }));
  
  const { getByLabelText } = render(component(grantId, next)); 
  const radioNext = getByLabelText(next);
  const radioLast = getByLabelText(last);
  const radioProportional = getByLabelText(proportional);
  const radioOther = getByLabelText(other);

  userEvent.click(radioLast);
  expect(spy).toHaveBeenCalledWith(grantId, { accelerationMethod: last});
  expect(radioLast).toBeChecked();
  expect(radioNext).not.toBeChecked();

  userEvent.click(radioProportional);
  expect(spy).toHaveBeenCalledWith(grantId, { accelerationMethod: proportional});
  expect(radioProportional).toBeChecked();
  expect(radioLast).not.toBeChecked();

  userEvent.click(radioOther);
  expect(spy).toHaveBeenCalledWith(grantId, { accelerationMethod: other});
  expect(radioOther).toBeChecked();
  expect(radioProportional).not.toBeChecked();

});

test('should start with last checked and change to next with appropriate editGrant call', () => {
  
  const spy = jest.spyOn(editGrant, 'editGrant').mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve({  }),
  }));
  
  const { getByLabelText } = render(component(grantId, last)); 
  const radioLast = getByLabelText(last);
  const radioNext = getByLabelText(next);

  userEvent.click(radioNext);
  expect(spy).toHaveBeenCalledWith(grantId, { accelerationMethod: next});
  expect(radioLast).not.toBeChecked();
  expect(radioNext).toBeChecked();
});