import React from 'react';

import CheckboxForm from '../../../Elements/CheckboxForm/CheckboxForm';
import Note from '../../../Elements/Note/Note';

const ChangeOfControl = ({ changeOfControl, handleChange }) => (
  <>
    <CheckboxForm text="Check if grant is contingent on the change of control: " checked={ changeOfControl } handleChange={ handleChange } />
    <Note text="Note: Grants made within 1 year of the change and grants subject to performance vesting are presumed to be contingent on the change of control." />
  </>
);

export default ChangeOfControl;