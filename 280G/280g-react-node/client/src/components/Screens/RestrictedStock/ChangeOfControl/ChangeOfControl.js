import React from 'react';

const ChangeOfControl = ({ changeOfControl, handleChange }) => (
  <form>
    <label>Check if grant is contingent on the change of control:</label>
    <input type="checkbox" checked={ changeOfControl } onChange={ handleChange } />
    <p>Note: Grants made within 1 year of the change and grants subject to performance vesting are presumed to be contingent on the change of control.</p>
  </form>
);

export default ChangeOfControl;