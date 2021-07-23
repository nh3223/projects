import React from 'react';

import HeaderItem from './HeaderItem';

const ExecutiveHeader = ({ companyId, executiveId }) => (
  <>
    <HeaderItem path={ `/company/${companyId}/executive/${executiveId}` } text="Executive Summary" />
    <HeaderItem path={ `/company/${companyId}/executive/${executiveId}/compensation` } text="Compensation" />
    <HeaderItem path={ `/company/${companyId}/executive/${executiveId}/non-equity-payments` } text="Non-Equity Payments" />
    <HeaderItem path={ `/company/${companyId}/executive/${executiveId}/options` } text="Options" />
    <HeaderItem path={ `/company/${companyId}/executive/${executiveId}/restricted-stock` } text="Restricted Stock" />
  </>
);

export default ExecutiveHeader;