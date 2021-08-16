import React from 'react';
import { useRecoilValue } from 'recoil';

import { executiveState } from '../../../recoil/executive';

const ProjectSummaryColumn = ({ executiveId }) => {

  const executive = useRecoilValue(executiveState(executiveId));



  return Object.entries(executive)(
    <SummaryItem text={ executivej}
  )

}