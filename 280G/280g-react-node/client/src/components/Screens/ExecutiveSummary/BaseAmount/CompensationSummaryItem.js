import React from 'react';

import SingleLineLayout from '../../../Elements/Layouts/SingleLineLayout';
import Description from '../../../Elements/TextElements/Description/Description';

const CompensationSummaryItem = ({ year }) => (
  <SingleLineLayout>
    <Description text={ year.year } />
    <Description text={ `$${year.compensation}` } />
  </SingleLineLayout>
);

export default CompensationSummaryItem;