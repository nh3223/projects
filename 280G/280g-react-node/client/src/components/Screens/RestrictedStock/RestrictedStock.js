import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useRecoilState, useRecoilCallback } from 'recoil';
import { createGrant, deleteGrant } from '../../../api/restrictedStock';

import { restrictedStockGrantIdsState, restrictedStockGrantState } from '../../../recoil/restrictedStock';

import CompanyHeader from '../../Navigation/CompanyHeader';
import ExecutiveHeader from '../../Navigation/ExecutiveHeader';
import SubTitle from '../../Elements/SubTitle/SubTitle';
import AddButton from '../../Elements/AddButton/AddButton';
import RestrictedStockGrant from './RestrictedStockGrant';
import GrantListItem from '../../Elements/ListItem/GrantListItem/GrantListItem';

const RestrictedStock = () => {
  
  const { companyId, executiveId } = useParams();

  const [ grantIds, setGrantIds ] = useRecoilState(restrictedStockGrantIdsState(executiveId));
  const [ add, setAdd ] = useState(false);

  const history = useHistory();

  const setGrant = useRecoilCallback(({ set }) => (grant) => set(restrictedStockGrantState(grant._id), grant), []);

  const handleAdd = () => setAdd(true);

  const handleCreate = async (grant) => {
    setAdd(false);
    const newGrant = await createGrant(grant);
    setGrant(newGrant);
    setGrantIds([ ...grantIds, newGrant._id ]);
    history.push(`/company/${companyId}/executive/${executiveId}/restricted-stock/${newGrant._id}`)
  };

  const handleDelete = async (grantId) => {
    console.log('RestrictedStock-handleDelete',grantId)
    await deleteGrant(grantId);
    setGrantIds(grantIds.filter((id) => id !== grantId));
  }

  return (
    <>
      <CompanyHeader companyId={ companyId } />
      <ExecutiveHeader executiveId={ executiveId } />
      <SubTitle text="Restricted Stock Grants" />
      { (add)
        ? <RestrictedStockGrant grantId={ null } add={ add } handleCreate={ handleCreate }/>
        : <AddButton name="addRestrictedStockGrant" text="Add a Restricted Stock Grant" handleAdd={ handleAdd } />
      }
      { grantIds.map((grantId) => <GrantListItem key={ grantId } companyId={ companyId } executiveId={ executiveId } type="restricted-stock" grantId={ grantId } handleDelete={ handleDelete } />) }
    </>
  );
};

  export default RestrictedStock;