import React from 'react';
import { useRecoilValue } from "recoil";
import { useLoadGrant } from '../../../../hooks/useLoadGrant';

import { grantDateState, numberSharesState } from '../../../../recoil/equityGrant';
import { formatDate } from '../../../../utilities/date/date';

import ListItem from '../../../Elements/ListItem/ListItem';

const EquityGrantListItem = ({ companyId, executiveId, grantId, handleDelete }) => {

  const grantDate = useRecoilValue(grantDateState(grantId));
  const shares = useRecoilValue(numberSharesState(grantId));
  useLoadGrant(grantId);

  const path = `/company/${companyId}/executive/${executiveId}/equity-grant/${grantId}`;
  const grantDescription = `Grant Date: ${formatDate(grantDate)}, Shares: ${shares}`
  const buttonText = 'Delete Grant';

  return <ListItem path={ path } text={ grantDescription } id={ grantId } buttonText={ buttonText } handleDelete={ handleDelete } />

};

export default EquityGrantListItem;