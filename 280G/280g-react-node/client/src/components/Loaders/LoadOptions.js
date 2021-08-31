import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import Loading from './Loading';
import { fetchGrants } from '../../api/option';
import { optionGrantIdsState } from '../../recoil/equityGrant';

import LoadOptionGrant from './LoadNonEquityPayment';

const LoadOptions = ({ executiveId }) => {

  const [ grantIds, setGrantIds ] = useRecoilState(optionGrantIdsState(executiveId));
  
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
  ? <Loading componentMessage="Option Grants . . ." errorMessage={ error } />
  : grantIds.map((grantId) => <LoadOptionGrant key={ grantId } paymentId={ grantId } />)

};

export default LoadOptions;