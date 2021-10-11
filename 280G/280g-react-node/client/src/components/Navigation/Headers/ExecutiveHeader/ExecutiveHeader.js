import React from 'react';
import { useRecoilValue } from 'recoil';

import { equityGrantIdsState } from '../../../../recoil/equityGrant';

import NavigationBar from '../../../Elements/Navigation/NavigationBar';
import TabList from '../../../Elements/Navigation/TabList';
import Tab from '../../../Elements/Navigation/Tab';
import FixedTab from '../../../Elements/Navigation/FixedTab'
import GrantTab from '../../GrantTab';

const ExecutiveHeader = ({ companyId, executiveId }) => {

  const grantIds = useRecoilValue(equityGrantIdsState(executiveId));
  
  const path = `company/${companyId}/executive/${executiveId}`;

  return (
  
    <NavigationBar>
      <TabList>
        <Tab path={ path } text="Executive Summary" />
        <Tab path={ `${path}/compensation` } text="Compensation" />
        <Tab path={ `${path}/non-equity-payments` } text="Non-Equity Payments" />
        <FixedTab text="Equity Grants -->" />
        { grantIds.map((grantId) => <GrantTab key={ grantId } path={ path } grantId={ grantId } />) }
      </TabList>
    </NavigationBar>

  );
};

export default ExecutiveHeader;