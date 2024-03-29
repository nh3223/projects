import React from 'react';
import { useRecoilValue } from 'recoil';

import { companyNameState, transactionPriceState, transactionDateState } from '../../../recoil/company';
import { formatDate } from '../../../utilities/date/date';

import MultiLineLayout from '../../Elements/Layouts/MultiLineLayout'
import Title from '../../Elements/TextElements/Title/Title';
import SubTitle from '../../Elements/TextElements/SubTitle/SubTitle';
import Description from '../../Elements/TextElements/Description/Description';

const ProjectSummaryCompanyInformation = ({ companyId }) => {

  const companyName = useRecoilValue(companyNameState(companyId));
  const transactionPrice = useRecoilValue(transactionPriceState(companyId));
  const transactionDate = useRecoilValue(transactionDateState(companyId));
  
  const priceText = `Transaction Price Per Share: $${ transactionPrice }`;
  const dateText = `Transaction Date: ${ (transactionDate) ? formatDate(transactionDate) : '' }`;
  
  return (
    <MultiLineLayout>
      <Title text={ companyName } />
      <SubTitle text="280G Summary" />
      <Description text={ priceText } />
      <Description text={ dateText } />
    </MultiLineLayout>
  );

};

export default ProjectSummaryCompanyInformation;