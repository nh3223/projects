import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { createGrant, deleteGrant } from '../../../api/restrictedStock';

import { equityGrantIdsState } from '../../../recoil/restrictedStock';

import Headers from '../../../Elements/Layouts/Headers';
import Header from '../../../Navigation/Header';
import CompanyHeader from '../../../Navigation/CompanyHeader';
import ExecutiveHeader from '../../../Navigation/ExecutiveHeader';

import SubTitle from '../../Elements/SubTitle/SubTitle';
import AddButton from '../../Elements/AddButton/AddButton';
import EquityGrantsListItem from './EquityGrantsListItem';

const EquityGrants = () => {
  
  const { companyId, executiveId } = useParams();

  const [ grantIds, setGrantIds ] = useRecoilState(equityGrantIdsState(executiveId));
  
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

  return (

    <>
      <Headers>
        <Header companyId={ companyId } />
        <CompanyHeader companyId={ companyId } />
        <ExecutiveHeader executiveId={ executiveId } />
      </Headers>

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