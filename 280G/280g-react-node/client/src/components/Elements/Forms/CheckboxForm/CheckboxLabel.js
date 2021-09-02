import React from 'react';

import Label from '../Label/Label';

const CheckboxLabel = ({ name, text }) => (
  <Label htmlFor={ name }>
    { text }
  </Label>
);

export default CheckboxLabel;