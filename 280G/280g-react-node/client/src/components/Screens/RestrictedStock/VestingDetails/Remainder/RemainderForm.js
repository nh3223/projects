import React from 'react';

import PeriodsForm from './PeriodsForm';
import TypeForm from './TypeForm';

const RemainderForm = ({ vestingDetails, handlers }) => (
  <>
    { (vestingDetails.cliff) && <p>With respect to the remaining shares:</p> }
    <PeriodsForm reaminderPeriods={ vestingDetails.remainderPeriods } handleChange={ handlers.remainderPeriodsChange } handleSumbit={ handlers.reaminderPeriodsSubmit } />
    <TypeForm remainderType={ vestingDetails.remainderType } handleChange={ handlers.remainderTypeChange } />
  </>
);

export default RemainderForm;