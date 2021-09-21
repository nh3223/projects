import React from 'react';
import { useParams } from 'react-router-dom';

import { useLoadGrant } from '../../../../hooks/useLoadGrant';

import Loading from '../../../Loaders/Loading';

import Headers from '../../../Elements/Layouts/Headers';
import Header from '../../../Navigation/Header';
import CompanyHeader from '../../../Navigation/CompanyHeader';
import ExecutiveHeader from '../../../Navigation/ExecutiveHeader';

import EquityGrantLayout from '../../../Elements/Layouts/EquityGrantLayout';
import GrantType from '../GrantType';
import BasicGrantInformation from './BasicGrantInformation';
import VestingInformation from './VestingInformation';
import CheckboxInformation from './CheckboxInformation';
import EquityGrantTable from '../EquityGrantTable/EquityGrantTable';

const EquityGrant = () => {

  const { companyId, executiveId, grantId } = useParams();

  const { loading, error } = useLoadGrant(grantId);

  if (loading) return <Loading component="Equity Grant" error={ error } />;

  return (
    <>
      <Headers>
        <Header companyId={ companyId } />
        <CompanyHeader companyId={ companyId } />
        <ExecutiveHeader executiveId={ executiveId } />        
      </Headers>

      <EquityGrantLayout>
        <GrantType grantId={ grantId } />        
        <BasicGrantInformation grantId={ grantId } />
        <VestingInformation grantId={ grantId } />
        <CheckboxInformation grantId={ grantId } />
        <EquityGrantTable companyId={ companyId } grantId={ grantId } />
      </EquityGrantLayout>
      
    </>
  );


}

export default EquityGrant;