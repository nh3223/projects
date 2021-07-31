import React from 'react';

import CheckboxForm from '../../../Elements/CheckboxForm/CheckBoxForm';
import AccelerationPercentage from './AccelerationPercentage';
import AccelerationMethod from './AccelerationMethod';

const Acceleration = ({ grant: { acceleration, accelerationPercentage, accelerationMethod }, completed, handlers }) => (
  <>
    <CheckboxForm name="acceleration" text="Are the shares subject to acceleration?" checked={ acceleration } handleChange={ handlers.change } />
    { (acceleration)
      ? <>
          <AccelerationPercentage name="accelerationPercentage" completed={ completed } accelerationPercentage={ accelerationPercentage } handlers={ handlers } />
          <AccelerationMethod name="accelerationMethod" accelerationMethod={ accelerationMethod } handleChange={ handlers.change }/>
        </>
      : null
    }
  </>
);

export default Acceleration;