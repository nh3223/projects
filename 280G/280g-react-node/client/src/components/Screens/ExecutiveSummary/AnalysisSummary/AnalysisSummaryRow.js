import React from 'react';

import SingleLineLayout from '../../../Elements/Layouts/SingleLineLayout';
import Description from '../../../Elements/TextElements/Description/Description';

const AnalysisSummaryRow = ({ description, amount }) => (
  <SingleLineLayout>
    <Description text={ description } />
    <Description text={ amount } />
  </SingleLineLayout>
);

export default AnalysisSummaryRow;