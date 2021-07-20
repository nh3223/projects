import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState, useRecoilCallback } from 'recoil';
import { createGrant } from '../../../api/restrictedStock';

import { restrictedStockGrantIdsState, restrictedStockGrantState } from '../../../recoil/restrictedStock';

import ExecutiveHeader from '../../Navigation/ExecutiveHeader';
import RestrictedStockGrant from './RestrictedStockGrant';

const RestrictedStock = () => {
  
  const { executiveId } = useParams();

  const [ grantIds, setGrantIds ] = useRecoilState(restrictedStockGrantIdsState(executiveId));
  const [ add, setAdd ] = useState(false);

  const setGrant = useRecoilCallback(({ set }) => (grant) => set(restrictedStockGrantState(grant._id), grant), []);

  const handleAdd = () => setAdd(true);

  const handleCreate = async (grant) => {
    const newGrant = await createGrant(grant);
    setGrant(newGrant);
    setGrantIds([ ...grantIds, newGrant._id ]);
    setAdd(false);
  };

  const removeGrantId = (grantId) => setGrantIds(grantIds.filter((id) => id !== grantId));

  return (
    <>
      <ExecutiveHeader executiveId={ executiveId } />
      <h1>Restricted Stock Grants</h1>
      { (!add) && <button onClick={ handleAdd }>Add a Restricted Stock Grant</button> }
      { (add) && <RestrictedStockGrant grantId={ null } handleCreate={ handleCreate }/>}
      { grantIds.map((grantId) => <RestrictedStockGrant key={ grantId } grantId={ grantId } add={ add } removeGrantId={ removeGrantId } />) }
    </>
  );
};

  export default RestrictedStock;