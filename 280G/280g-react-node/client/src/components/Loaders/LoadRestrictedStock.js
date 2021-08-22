import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import Loading from './Loading';
import { fetchGrants } from '../../api/restrictedStock';
import { restrictedStockGrantIdsState } from '../../recoil/restrictedStock';

import LoadRestrictedStockGrant from './LoadNonEquityPayment';

const LoadRestrictedStock = ({ executiveId }) => {

  const [ grantIds, setGrantIds ] = useRecoilState(restrictedStockGrantIdsState(executiveId));
  
  const [ loading, setLoading ] = useState(null);
  const [ error, setError ] = useState(null);

  useEffect(() => {

    const getGrantIds = async () => {

      setLoading(true);

      try {
        const grants= await fetchGrants(executiveId);
        setGrantIds(grants.map((grant) => grant._id));
        setLoading(false);
      }

      catch (e) {
        setError(e.message);
      }

    };

    if (grantIds.length === 0) getGrantIds();

  }, [executiveId, grantIds.length, setGrantIds]);  

  return (loading)
  ? <Loading componentMessage="Restricted Stock Grants . . ." errorMessage={ error } />
  : grantIds.map((grantId) => <LoadRestrictedStockGrant key={ grantId } paymentId={ grantId } />)

};

export default LoadRestrictedStock;
