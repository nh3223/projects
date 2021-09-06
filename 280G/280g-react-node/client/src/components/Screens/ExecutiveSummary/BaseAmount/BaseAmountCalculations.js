import React from 'react';

import MultiLineLayout from '../../../Elements/Layouts/MultiLineLayout';
import Description from '../../../Elements/TextElements/Description/Description';

const BaseAmountCalculations = ({ baseAmount, parachuteThreshold }) => (

  <MultiLineLayout>
    <Description text={ `Base Amount: $${baseAmount}` } />
    <Description text={ `Parachute Threshold: $${parachuteThreshold}` } />
  </MultiLineLayout>

);

export default BaseAmountCalculations;