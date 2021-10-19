import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import {render} from '@testing-library/react'

import Header from './Header';

test('should show default title', () => {
  const { getByText } = render(<Header />);
  const title = getByText('M&A 280G Analysis');
  expect(title).toBeInTheDocument();
});