import React from 'react';
import { useRecoilValue } from 'recoil';

import { grantDateState } from '../../recoil/equityGrant';
import { formatDate } from '../../utilities/formatDate';

import Tab from '../Elements/Navigation/Tab';

const GrantTab = ({ path, grantId }) => {

  const date = useRecoilValue(grantDateState(grantId));

  const grantPath = `${path}/equity-grants/${grantId}`;

  return <Tab path={ grantPath } text={ formatDate(date) } />

};

export default GrantTab;