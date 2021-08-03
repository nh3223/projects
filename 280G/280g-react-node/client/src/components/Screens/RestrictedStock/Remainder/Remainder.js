import React from 'react';

import RemainderPeriods from './RemainderPeriods';
import RemainderType from './RemainderType';

const Remainder = ({ grant: { cliff, remainderPeriods, remainderType }, completed, handlers }) => (
  <>
    <RemainderPeriods name="remainderPeriods" cliff={ cliff } completed={ completed.remainderPeriods } remainderPeriods={ remainderPeriods } handlers={ handlers } />
    <RemainderType name="remainderType" completed={ completed.remainderType } remainderType={ remainderType } handleChange={ handlers.change }/>
  </>
);

export default Remainder;