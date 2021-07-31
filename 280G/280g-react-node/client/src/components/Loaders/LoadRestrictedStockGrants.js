import React, { useState, useRef, useEffect } from 'react';
import { useSetRecoilState, useRecoilCallback } from 'recoil';

import Loading from './Loading';
import { fetchGrants } from '../../api/restrictedStock';
import { grantIdsState, grantState } from '../../recoil/restrictedStock';
import { setGrantData } from '../../utilities/restrictedStock';

const LoadRestrictedStockGrants = ({ executiveId }) => {

  const setGrantIds = useSetRecoilState(grantIdsState(executiveId));
  const [ loading, setLoading ] = useState(true);
  const loaded = useRef(false);

  const setGrant = useRecoilCallback(({ set }) => (grant) => set(grantState(grant._id), setGrantData(grant)), []);

  useEffect(() => {

    const getGrants = async () => {
      const grants = await fetchGrants(executiveId);
      const grantIds = [];
      for (const grant of grants) {
        setGrant(grant);
        grantIds.push(grant._id);
      }
      setGrantIds(grantIds);
      loaded.current(true);
    };

    (loaded.current) ? setLoading(false) : getGrants();

  }, [executiveId, setGrant, setGrantIds, setLoading]);  

  return loading && <Loading componentMessage="Restricted Stock Grants" />

};

export default LoadRestrictedStockGrants;
