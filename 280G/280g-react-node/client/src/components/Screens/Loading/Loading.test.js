import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'

import Loading from './Loading';

const component = 'Test'
const error = 'Please enter a valid payment amount';
const noError = '';

test('should show error message', () => {
  const { getByText } = render(<Loading component={ component } error={ error } />);
  const errorMessage = getByText(error);
  expect(errorMessage).toBeInTheDocument();
});

test('should show loading message', () => {
  const { getByText } = render(<Loading component={ component } error={ noError } />);
  const loadingMessage = getByText(component, { exact: false });
  expect(loadingMessage).toBeInTheDocument(); 
});
