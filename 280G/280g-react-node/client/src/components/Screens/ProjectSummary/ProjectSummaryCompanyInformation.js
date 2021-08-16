import React from 'react';

import Title from '../../Elements/TextElements/Title/Title';
import SubTitle from '../../Elements/TextElements/SubTitle/SubTitle';
import Description from '../../Elements/TextElements/Description/Description';

const ProjectSummaryCompanyInformation = ({ company: { companyName, transactionPrice, transactionDate } }) => (
  <>
    <Title text={ companyName } />
    <SubTitle text="280G Summary" />
    <Description text={ `Transaction Price: ${ transactionPrice }` } />
    <Description text={ `Transaction Date: ${ transactionDate }`} />
  </>
);

export default ProjectSummaryCompanyInformation;