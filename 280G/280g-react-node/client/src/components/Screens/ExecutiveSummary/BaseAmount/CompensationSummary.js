import React from 'react';
import MultiLineLayout from '../../../Elements/Layouts/MultiLineLayout';

import SubTitle from '../../../Elements/TextElements/SubTitle/SubTitle';
import CompensationSummaryItem from './CompensationSummaryItem';

const CompensationSummary = ({ compensation }) => (
  
  <MultiLineLayout>
    <SubTitle text="Base Period Compensation" />
    { compensation.map((year) => <CompensationSummaryItem key={ year.year } year={ year } />) }
  </MultiLineLayout>

);

export default CompensationSummary;