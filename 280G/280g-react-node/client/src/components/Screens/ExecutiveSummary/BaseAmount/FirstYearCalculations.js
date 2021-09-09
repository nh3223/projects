import React from 'react';

import { formatDate } from '../../../../utilities/date/date';

import MultiLineLayout from '../../../Elements/Layouts/MultiLineLayout';
import Description from '../../../Elements/TextElements/Description/Description';
import SubTitle from '../../../Elements/TextElements/SubTitle/SubTitle';

const FirstYearCalculations = ({ startDate, firstYearPayments, annualizedCompensation }) => (
  
  <MultiLineLayout>
    <SubTitle text="First Year Annualization" />
    <Description text={ `Start Date: ${formatDate(startDate)} `} /> 
    <Description text={ `First Year Payments: $${ firstYearPayments }` } />
    <Description text={ `Annualized First Year Compensation: $${ annualizedCompensation }`} />
  </MultiLineLayout>
  
);

export default FirstYearCalculations;