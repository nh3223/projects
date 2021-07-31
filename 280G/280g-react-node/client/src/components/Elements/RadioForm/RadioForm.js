import React from 'react';

import StyledRadio from './StyledRadio';
import Description from '../Description/Description';

const RadioForm = ({ name, values, criteria, handleChange }) => (
  
  <form onChange={ handleChange } >
    { values.map((value) => (
      <>
        <StyledRadio name={ name } type="radio" value={ value } checked={ value === criteria } />
        <Description text={ value } />
      </> 
    ))}
  </form>

);

export default RadioForm;