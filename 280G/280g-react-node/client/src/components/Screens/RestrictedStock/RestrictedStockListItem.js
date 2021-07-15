import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from "recoil";
import { restrictedStockGrantState } from '../../../recoil/restrictedStock';


const RestrictedStockListItem = ({ id }) => {

  const grant = useRecoilValue(restrictedStockGrantState(id));
  
  return (
    <Link to={ `/restricted-stock/${id}` } >
      <p>{ `Grant Date: ${grant.grantDate}, Shares: ${grant.numberShares}` }</p>
    </Link>
  );

};

export default RestrictedStockListItem;