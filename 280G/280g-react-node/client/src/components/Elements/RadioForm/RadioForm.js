import React from 'react';

import StyledRadio from './StyledRadio';
import Description from '../Description/Description';

const RadioForm = ({ name, values, criteria, handleChange }) => {
  
  const processChange = ({ target: { name, value }}) => handleChange(name, value);

  return (
  
    <form>
      { values.map((value) => (
        <div key={ value }>
          <StyledRadio name={ name } type="radio" value={ value } checked={ value === criteria } onChange={ processChange } />
          <Description text={ value } />
        </div> 
      ))}
    </form>

  );

};

export default RadioForm;