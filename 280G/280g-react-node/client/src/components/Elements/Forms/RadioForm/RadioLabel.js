import React from 'react';

import Label from '../Label/Label';

const RadioLabel = ({ choice, text }) => (
  <Label htmlFor={ choice }>
    { text }
  </Label>
);

export default RadioLabel;