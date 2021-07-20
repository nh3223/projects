import React from 'react';

const MethodForm = ({ accelerationMethod, handleChange }) => (
  <form onChange={ handleChange }>
    <input type="radio" value='Next to Vest' checked={ 'Next to Vest' === accelerationMethod } />Next to Vest
    <input type="radio" value='Last to Vest' checked={ 'Last to Vest' === accelerationMethod } />Last to Vest
    <input type="radio" value='Proportional' checked={ 'Proportional' === accelerationMethod } />Proportional
    <input type="radio" value='Other' checked={ 'Other' === accelerationMethod } />Other (modify below)
  </form>
);

export default MethodForm;