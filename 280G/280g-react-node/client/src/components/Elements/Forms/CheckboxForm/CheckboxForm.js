import React from 'react';

import StyledCheckbox from './StyledCheckbox';
import CheckboxLabel from './CheckboxLabel';

const CheckboxForm = ({ name, text, checked, handleChange }) => (
  <form>
    <StyledCheckbox id={ name } type="checkbox" checked={ checked } onChange={ handleChange } />
    <CheckboxLabel name={ name } text={ text } />
  </form>
);

export default CheckboxForm;