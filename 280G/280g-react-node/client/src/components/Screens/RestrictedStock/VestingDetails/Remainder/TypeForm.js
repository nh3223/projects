import React from 'react';

const TypeForm = ({ remainderType, handleChange }) => (
  <form onChange={ handleChange }>
    <input type="radio" value="Monthly" checked={ 'Monthly' === remainderType }/>Monthly
    <input type="radio" value="Quarterly" checked={ 'Quarterly' === remainderType }/>Quarterly
    <input type="radio" value="Annually" checked={ 'Annually' === remainderType }/>Annually
    <input type="radio" value="Other" checked={ 'Other' === remainderType }/>Other (modify below)
  </form>
);

export default TypeForm;