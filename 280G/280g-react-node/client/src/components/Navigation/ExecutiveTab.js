import React from 'react';
import { useRecoilValue } from 'recoil';

import { executiveNameState } from '../../recoil/executive';

import Tab from '../Elements/Navigation/Tab';

const ExecutiveTab = ({ path, executiveId }) => {

  const name = useRecoilValue(executiveNameState(executiveId));

  const executivePath = `${path}/executive/${executiveId}`;

  return <Tab path={ executivePath } text={ name } />

};

export default ExecutiveTab;