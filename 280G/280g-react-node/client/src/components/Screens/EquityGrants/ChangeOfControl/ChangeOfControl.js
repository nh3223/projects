import React from 'react';
import { useRecoilState } from 'recoil';

import { changeOfControlState } from '../../../../recoil/equityGrant';
import { editGrant } from '../../../../api/equityGrant/editGrant';

import MultiLineLayout from '../../../Elements/Layouts/MultiLineLayout';
import CheckboxForm from '../../../Elements/Forms/CheckboxForm/CheckboxForm';
import Note from '../../../Elements/TextElements/Note/Note';

const ChangeOfControl = ({ grantId }) => {

  const [ changeOfControl, setChangeOfControl ] = useRecoilState(changeOfControlState(grantId));

  const handleChange = async ({ target: { checked }}) => {
    setChangeOfControl(checked);
    await editGrant(grantId, { changeOfControl: checked });
  };

  const name = 'Change of Control Checkbox Form';
  const formText = 'Check if grant is contingent on the change of control: ';
  const noteText = 'Note: Grants made within 1 year of the change and grants subject to performance vesting are presumed to be contingent on the change of control.  Please check if this presumption cannot be rebutted.';
  
  return (
    <MultiLineLayout>
      <CheckboxForm name={ name } text={ formText } checked={ changeOfControl } handleChange={ handleChange } />
      <Note text={ noteText } />
    </MultiLineLayout>
  );  

}

export default ChangeOfControl;