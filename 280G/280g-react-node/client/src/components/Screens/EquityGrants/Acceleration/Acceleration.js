import React from 'react';
import { useRecoilState } from 'recoil';

import { accelerationState } from '../../../../recoil/equityGrant';
import { editGrant } from '../../../../api/equityGrant/editGrant';

import MultiLineLayout from '../../../Elements/Layouts/MultiLineLayout';
import CheckboxForm from '../../../Elements/Forms/CheckboxForm/CheckboxForm';
import AccelerationPercentage from './AccelerationPercentage';
import AccelerationMethod from './AccelerationMethod';

const Acceleration = ({ grantId }) => {

  const [ acceleration, setAcceleration ] = useRecoilState(accelerationState(grantId));

  const handleChange = async ({ target: { checked }}) => {
    setAcceleration(checked);
    await editGrant(grantId, { acceleration: checked });
  };

  const name = 'Acceleration';
  const text = 'Check if shares are subject to acceleration';

  return (
    <MultiLineLayout>
      <CheckboxForm name={ name } text={ text } checked={ acceleration } handleChange={ handleChange } />
      { (acceleration)
        ? <>
            <AccelerationPercentage grantId={ grantId } />
            <AccelerationMethod grantId={ grantId } />
          </>
        : null
      }
    </MultiLineLayout>

  );

};

export default Acceleration;