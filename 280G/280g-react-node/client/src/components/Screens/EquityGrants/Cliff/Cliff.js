import React from 'react';
import { useRecoilState } from 'recoil';

import { cliffState } from '../../../../recoil/equityGrant';
import { editGrant } from '../../../../api/equityGrant/editGrant';

import MultiLineLayout from '../../../Elements/Layouts/MultiLineLayout';
import CheckboxForm from '../../../Elements/Forms/CheckboxForm/CheckboxForm';
import CliffPercentage from './CliffPercentage';
import CliffDuration from './CliffDuration';

const Cliff = ({ grantId }) => {

  const [ cliff, setCliff ] = useRecoilState(cliffState(grantId));

  const handleChange = async ({ target: { checked }}) => {
    setCliff(checked);
    await editGrant(grantId, { cliff: checked });
  };

  const name = 'Cliff';
  const text = 'Check if grant subject to cliff vesting';

  return (
    <MultiLineLayout>
      <CheckboxForm name={ name } text={ text } checked={ cliff } handleChange={ handleChange } />
      { (cliff)
        ? <>
            <CliffPercentage grantId={ grantId } />
            <CliffDuration grantId={ grantId } />
          </>
        : null
      }
    </MultiLineLayout>

  );

};

export default Cliff;