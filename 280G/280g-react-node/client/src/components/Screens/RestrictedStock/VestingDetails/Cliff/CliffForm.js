import React from 'react';

import HasCliffForm from './HasCliffForm';
import PercentageForm from './PercentageForm';
import DurationForm from './DurationForm';

const CliffForm = ({ vestingDetails: { cliff, cliffPercentage, cliffMonths}, handlers }) => (
  <>
    <HasCliffForm cliff={ cliff } handleChange={ handlers.cliffChange } />
    { (cliff) &&
      <>
        <PercentageForm cliffPercentage={ cliffPercentage } handleSubmit={ handlers.cliffPercentageSubmit } handleChange={ handlers.cliffPercentageChange } />
        <DurationForm cliffMonths={ cliffMonths } handleSubmit={ handlers.cliffMonthsSubmit } handleChange={ handlers.cliffMonthsChange } />
      </>
    }
  </>
);

export default CliffForm;