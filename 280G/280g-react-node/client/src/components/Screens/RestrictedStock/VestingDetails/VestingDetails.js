import React from 'react';

import Cliff from './Cliff/Cliff';
import Remainder from './Remainder/Remainder'

const VestingDetails = ({ vestingDetails, handlers }) => {



  return (
    <>
      <Cliff vestingDetails={ vestingDetails } handlers={ handlers } />
      <Remainder vestingDetails={ vestingDetails } handlers={ handlers } />
    </>
  );

};

export default VestingDetails;