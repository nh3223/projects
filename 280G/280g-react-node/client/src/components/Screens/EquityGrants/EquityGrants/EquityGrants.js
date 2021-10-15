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

const EquityGrants = () => {
  
  const { companyId, executiveId } = useParams();

  const [ grantIds, setGrantIds ] = useRecoilState(equityGrantIdsState(executiveId));
  const { status, error } = useLoadGrants(executiveId);
  
  const history = useHistory();

    const handleAdd = async () => {
      const newGrant = await createGrant(executiveId);
      setGrantIds([ ...grantIds, newGrant._id ]);
      history.push(`/company/${companyId}/executive/${executiveId}/equity-grant/${newGrant._id}`)
    };

  const handleDelete = async (grantId) => {
    await deleteGrant(grantId);
    setGrantIds(grantIds.filter((id) => id !== grantId));
  }

  if (status === 'loading') return <Loading component="EquityGrants" error={ error } />
  
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