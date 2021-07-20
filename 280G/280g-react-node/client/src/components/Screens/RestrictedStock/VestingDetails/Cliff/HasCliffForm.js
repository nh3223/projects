import React from 'react';

const HasCliffForm = ({ cliff, handleChange }) => (
  <form>
    <label>Is the Grant subject to cliff vesting?</label>
    <input type="checkbox" onChange={ handleChange } checked={ cliff }/>
  </form>
);

export default HasCliffForm;