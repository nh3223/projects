import React from 'react';

import Description from '../Description/Description';
import StyledCheckbox from './StyledCheckbox';

const CheckboxForm = ({ name, text, checked, handleChange }) => {
  
  const processChange = ({ target: { name, checked }}) => handleChange(name, checked);
  
  return (
    <form>
      <Description text={ text } />
      <StyledCheckbox name={ name } type="checkbox" checked={ checked } onChange={ processChange } />
    </form>
  );

};

export default CheckboxForm;