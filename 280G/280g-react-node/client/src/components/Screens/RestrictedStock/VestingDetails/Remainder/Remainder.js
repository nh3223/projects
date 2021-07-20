import React from 'react';

import RemainderIdentifier from './RemainderIdentifier';
import RemainderForm from './RemainderForm';

const Remainder = ({ vestingDetails, completed, handlers }) => (
  completed
  ? <RemainderIdentifier vestingDetails={ vestingDetails } handlerEdit={ handlers.editRemainder } />
  : <RemainderForm vestingDetails={ vestingDetails } handlers={ handlers }/>
);

export default Remainder;