import React from 'react';
import CheckboxForm from '../../../Elements/CheckboxForm/CheckboxForm';

import CliffPercentage from './CliffPercentage';
import CliffDuration from './CliffDuration';

const Cliff = ({ grant: { cliff, cliffPercentage, cliffDuration }, completed, handlers }) => (
  <>
    <CheckboxForm name="cliff" text="Are the shares subject to cliff vesting?" checked={ cliff } handleChange={ handlers.change } />
    { (cliff) 
      ? <>
          <CliffPercentage name="cliffPercentage" completed={ completed.cliffPercentage } cliffPercentage={ cliffPercentage } handlers={ handlers } />
          <CliffDuration name="cliffDuration" completed={ completed.cliffDuration } cliffDuration={ cliffDuration } handlers={ handlers } />
        </>
      : null
    }
  </>
);

export default Cliff;