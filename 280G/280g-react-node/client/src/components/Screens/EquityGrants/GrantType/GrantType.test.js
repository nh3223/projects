import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RecoilRoot } from 'recoil';

import GrantType from './GrantType';
import * as editGrant from '../../../../api/equityGrant/editGrant';
import { useSetEquityGrantTestData } from '../../../../tests/hooks/useSetEquityGrantTestData';

const InitializeState = ({ grantId, grantType }) => {

  const loading = useSetEquityGrantTestData({ grantId, grantType });

  return loading ? null : <GrantType grantId={ grantId } />

}
const component = (grantId, grantType) => (
  <RecoilRoot>
    <InitializeState grantId={ grantId } grantType={ grantType } />
  </RecoilRoot>
);

const grantId = 12;
const restrictedStock = 'Restricted Stock';
const option = 'Option';

test('should render description and radio buttons with labels', () => {
  const { getByRole, getByLabelText } = render(component(grantId, restrictedStock)); 
  const description = getByRole('heading', { level: 2 });
  const radioRestrictedStock = getByLabelText(restrictedStock);
  const radioOption = getByLabelText(option);
  expect(description).toBeInTheDocument();
  expect(radioRestrictedStock).toBeInTheDocument();
  expect(radioOption).toBeInTheDocument();
});

test('should start with restricted Stock checked and change to Option with appropriate editGrant call', () => {
  
  const spy = jest.spyOn(editGrant, 'editGrant').mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve({  }),
  }));
  
  const { getByLabelText } = render(component(grantId, restrictedStock)); 
  const radioRestrictedStock = getByLabelText(restrictedStock);
  const radioOption = getByLabelText(option);

  userEvent.click(radioOption);
  expect(spy).toHaveBeenCalledWith(grantId, { grantType: option});
  expect(radioOption).toBeChecked();
  expect(radioRestrictedStock).not.toBeChecked();
});

test('should start with option checked and change to restricted stock with appropriate editGrant call', () => {
  
  const spy = jest.spyOn(editGrant, 'editGrant').mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve({  }),
  }));
  
  const { getByLabelText } = render(component(grantId, option)); 
  const radioRestrictedStock = getByLabelText(restrictedStock);
  const radioOption = getByLabelText(option);

  userEvent.click(radioRestrictedStock);
  expect(spy).toHaveBeenCalledWith(grantId, { grantType: restrictedStock});
  expect(radioOption).not.toBeChecked();
  expect(radioRestrictedStock).toBeChecked();
});