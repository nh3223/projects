import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { createGrant } from '../../../../api/equityGrant/createGrant';
import { deleteGrant } from '../../../../api/equityGrant/deleteGrant'

import { equityGrantIdsState } from '../../../../recoil/equityGrant';

import Headers from '../../../Navigation/Headers/Headers';

import Loading from '../../Loading/Loading';
import SubTitle from '../../../Elements/TextElements/SubTitle/SubTitle';
import AddButton from '../../../Elements/Buttons/AddButton/AddButton';
import EquityGrantsListItem from './EquityGrantsListItem';
import { useLoadGrants } from '../../../../hooks/useLoadGrants';
import { fetchGrants } from '../../../../api/equityGrant/fetchGrants';

const EquityGrants = () => {
  
  const { companyId, executiveId } = useParams();

  const [ grantIds, setGrantIds ] = useRecoilState(equityGrantIdsState(executiveId));
  const { status, error } = useLoadGrants(executiveId);
  
  const history = useHistory();

    const handleAdd = async () => {
      const newGrant = await createGrant(executiveId);
      setGrantIds([ ...grantIds, newGrant._id ]);
      history.push(`/company/${companyId}/executive/${executiveId}/equity-grants/${newGrant._id}`)
    };

  const handleDelete = async ({ target: { id }}) => {
    await deleteGrant(id);
    const grants = await fetchGrants(executiveId);
    setGrantIds(grants.map((grant) => grant._id));
  };

  if (status === 'loading') return <Loading component="EquityGrants" error={ error } />
  
  console.log(grantIds);

  return (

    <>
      <Headers companyId={ companyId } executiveId={ executiveId } />
      
      <SubTitle text="Equity Grants" />
      <AddButton name="addEquityGrant" text="Add a new Equity Grant" handleAdd={ handleAdd } />
      { grantIds.map((grantId) => (
          <EquityGrantsListItem key={ grantId } companyId={ companyId } executiveId={ executiveId } grantId={ grantId } handleDelete={ handleDelete } />
        ))
      }
    </>
  );
};

export default EquityGrants;