import React from 'react';

import CliffForm from './CliffForm';
import CliffIdentifier from './CliffIdentifier';

const Cliff = ({ vestingDetails, completed, handlers }) => (
  completed
  ? <CliffIdentifier vestingDetails={ vestingDetails } handleEdit={ handlers.editCliff } />
  : <CliffForm vestingDetails={ vestingDetails } handlers={ handlers } />
);

export default Cliff;