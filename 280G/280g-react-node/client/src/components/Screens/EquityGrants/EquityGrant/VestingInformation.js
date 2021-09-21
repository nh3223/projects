import React from 'react';

import VestingLayout from '../../../Elements/Layouts/VestingLayout';
import VestingStartDate from '../VestingStartDate/VestingStartDate';
import Cliff from '../Cliff/Cliff';
import RemainderType from '../Remainder/RemainderType';
import RemainderPeriods from '../Remainder/RemainderPeriods';

const VestingInformation = ({ grantId }) => (

  <VestingLayout>
    <VestingStartDate grantId={ grantId } />
    <Cliff grantId={ grantId } />
    <RemainderType grantId={ grantId } />
    <RemainderPeriods grantId={ grantId } />
  </VestingLayout>

);

export default VestingInformation;