import React from 'react';

import HeaderLayout from '../../Elements/Layouts/HeaderLayout'
import Header from './Header/Header';
import CompanyHeader from './CompanyHeader/CompanyHeader';
import ExecutiveHeader from './ExecutiveHeader/ExecutiveHeader';

const Headers = ({ companyId, executiveId }) => (

  <HeaderLayout>
    <Header companyId={ companyId } />
    { companyId ? <CompanyHeader companyId={ companyId } /> : null }

  </HeaderLayout>

);

export default Headers;   


// { executiveId ? <ExecutiveHeader companyId={ companyId } executiveId={ executiveId } /> : null }