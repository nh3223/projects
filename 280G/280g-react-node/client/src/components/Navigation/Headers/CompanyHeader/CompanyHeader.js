import React from 'react';
import { useRecoilValue } from 'recoil';

import { executiveIdsState } from '../../../../recoil/executive';

import NavigationBar from '../../../Elements/Navigation/NavigationBar';
import TabList from '../../../Elements/Navigation/TabList';
import Tab from '../../../Elements/Navigation/Tab';
import FixedTab from '../../../Elements/Navigation/FixedTab';
import ExecutiveTab from '../../ExecutiveTab';
import { projectNameState } from '../../../../recoil/company';

const CompanyHeader = ({ companyId }) => {

  const projectName = useRecoilValue(projectNameState(companyId));
  const executiveIds = useRecoilValue(executiveIdsState(companyId));

  const path = `/company/${companyId}`;

  return (
    <NavigationBar>
      <TabList>
        <FixedTab text={ projectName } />
        <Tab path={ path } text="Project Summary" />
        <Tab path={ `${path}/info` } text="Company Information" />
        <FixedTab text="Executives -->" />
        { executiveIds.map((executiveId) => <ExecutiveTab key={ executiveId } path={ path } executiveId={ executiveId } />) }        
      </TabList>
    </NavigationBar>
  );
};

export default CompanyHeader;