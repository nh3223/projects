import React, { useState, useRef, useEffect } from 'react';
import { useSetRecoilState, useRecoilCallback } from 'recoil';

import Loading from './Loading';
import { fetchGrants } from '../../api/restrictedStock';
import { grantIdsState, grantState, vestingState } from '../../recoil/restrictedStock';

const LoadRestrictedStockGrants = ({ executiveId }) => {

  const setGrantIds = useSetRecoilState(grantIdsState(executiveId));
  const [ loading, setLoading ] = useState(true);
  const loaded = useRef(false);

  const setGrant = useRecoilCallback(({ set }) => ({ _id, grantDate, vestingStartDate, numberShares, changeOfControlGrant, percentageAcceleration }) => {
    set(grantState(_id), { _id, grantDate, vestingStartDate, numberShares, changeOfControlGrant, percentageAcceleration })
  }, []);

  const setVesting = useRecoilCallback(({ set }) => ({ _id, vestingSchedule }) => {
    set(vestingState(_id), { _id, vestingSchedule })
  }, []);

  useEffect(() => {

    const getGrants = async () => {
      const grants = await fetchGrants(executiveId);
      const grantIds = [];
      for (const grant of grants) {
        setGrant(grant);
        setVesting(grant);
        grantIds.push(grant._id);
      }
      setGrantIds(grantIds);
      loaded.current(true);
    };

    (loaded.current) ? setLoading(false) : getGrants();

  }, [executiveId, setGrant, setVesting, setGrantIds, setLoading]);  

  return (
    loading && <Loading componentMessage="Restricted Stock Grants" />
  );

};

export default LoadRestrictedStockGrants;
