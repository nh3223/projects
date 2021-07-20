import React from 'react';

import PercentageForm from './PercentageForm';
import MethodForm from './MethodForm';

const AccelerationForm = ({ percentageAcceleration, accelerationMethod, handlers: { percentageChange, percentageSubmit, methodChange }}) => (
  <>
    <PercentageForm percentageAcceleration={ percentageAcceleration } handleChange={ percentageChange } handleSubmit={ percentageSubmit } />
    { (percentageAcceleration !== 0 || percentageAcceleration !== 100)
        ? <MethodForm accelerationMethod={ accelerationMethod } handleChange={ methodChange } />
        : null
      }
  </>
);

export default AccelerationForm;