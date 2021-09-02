import React from 'react';

import StyledRadio from './StyledRadio';
import RadioLabel from './RadioLabel';

const RadioForm = ({ name, formChoices, checked, handleChange }) => (
  <form>
    { formChoices.map((choice) => (
      <div key={ choice }>
        <StyledRadio name={ name } id={ choice } type="radio" value={ choice } checked={ choice === checked } onChange={ handleChange } />
        <RadioLabel choice={ choice } text={ choice } />
      </div> 
    ))}
  </form>

);

export default RadioForm;