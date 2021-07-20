import React from 'react';

import AccelerationForm from './AccelerationForm';
import AccelerationIdentifier from './AccelerationIdentifier';

const Acceleration = ({ percentageAcceleration, accelerationMethod, completed, handlers }) => (
  (completed)
    ? <AccelerationForm percentageAcceleration={ percentageAcceleration } accelerationMethod={ accelerationMethod } handlers={ handlers } />
    : <AccelerationIdentifier percentageAcceleration={ percentageAcceleration } accelerationMethod={ accelerationMethod } handlers={ handlers } />
);

export default Acceleration;