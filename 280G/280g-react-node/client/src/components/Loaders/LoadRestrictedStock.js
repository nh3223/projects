import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import Loading from './Loading';
import { fetchGrants } from '../../api/restrictedStock';
import { restrictedStockGrantIdsState } from '../../recoil/restrictedStock';

import LoadRestrictedStockGrant from './LoadNonEquityPayment';

const LoadRestrictedStock = ({ executiveId }) => {

  const [ grantIds, setGrantIds ] = useRecoilState(restrictedStockGrantIdsState(executiveId));
  const [ loadComplete, setLoadComplete ] = useState(false);

  useEffect(() => {

    const getGrantIds = async () => {
      const grants= await fetchGrants(executiveId);
      setGrantIds(grants.map((grant) => grant._id));
      setLoadComplete(true);
    };
    if (executiveId && grantIds.length === 0) getGrantIds();

  }, [executiveId, grantIds.length, setGrantIds]);  

  return (loadComplete)
  ? grantIds.map((id) => <LoadRestrictedStockGrant key={ id } paymentId={ id } />)
  : <Loading componentMessage="Restricted Stock Grants . . ." />

};

export default LoadRestrictedStock;
