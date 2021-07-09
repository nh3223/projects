import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { createGrant } from '../../../api/restrictedStock';

import { grantIdsState } from '../../../recoil/restrictedStock';

import ExecutiveHeader from '../../Navigation/ExecutiveHeader';
import RestrictedStockForm from './RestrictedStockForm';

const RestrictedStock = () => {
  
  const { id } = useParams();

  const grantIds = useRecoilValue(grantIdsState(id));
  const [ add, setAdd ] = useState(false);

  const handleAdd = () => setAdd(true);

  const handleSubmit = async (grant) => {
    await createGrant(grant);
    setAdd(false);
  };

  return (
    <>
      <ExecutiveHeader executiveId={ id } />
      <h1>Restricted Stock Grants</h1>
      { (!add) && <button onClick={ handleAdd }>Add a Restricted Stock Grant</button> }
      { (add) && <RestrictedStockForm handleSubmit={ handleSubmit }/>}
      { grantIds.map((grantId) => <Link key={ grantId } to={ `/restricted-stock/${grantId}` } />) }
    </>
  );
};

  export default RestrictedStock;