import React from 'react';
import { useRecoilValue } from 'recoil';

import { executiveState } from '../../recoil/executive';

import HeaderItem from './HeaderItem';

const ExecutiveHeaderItem = ({ companyId, executiveId }) => {

  const executive = useRecoilValue(executiveState(executiveId));

  return (
    <HeaderItem path={ `/company/${companyId}/executive/${executiveId}` } text={ executive.executiveName } />
  );

};

export default ExecutiveHeaderItem;