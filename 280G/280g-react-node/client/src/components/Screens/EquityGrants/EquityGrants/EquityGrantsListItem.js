import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from "recoil";

import { equityGrantState } from '../../../recoil/restrictedStock';

import Description from '../../../Elements/TextElements/Description/Description';

const EquityGrantListItem = ({ grantId }) => {

  const grant = useRecoilValue(equityGrantState(grantId));
  
  const grantDescription = `Grant Date: ${grant.grantDate}, Shares: ${grant.numberShares}`

  return (
    <Link to={ `/equity-grant/${grantId}` } >
      <Description text={ grantDescription } />
    </Link>
  );

};

export default EquityGrantListItem;