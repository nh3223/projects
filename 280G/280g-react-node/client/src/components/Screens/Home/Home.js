import React from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { deleteCompany } from '../../../api/company/deleteCompany';
import { useLoadCompanies } from '../../../hooks/useLoadCompanies';
import { companiesState } from '../../../recoil/company';

import Loading from '../Loading/Loading';
import Headers from '../../Navigation/Headers/Headers';
import Title from '../../Elements/TextElements/Title/Title';
import CompanyListItem from './CompanyListItem';
import AddButton from '../../Elements/Buttons/AddButton/AddButton';
import { createCompany } from '../../../api/company/createCompany';
import { fetchCompanies } from '../../../api/company/fetchCompanies';

const Home = () => {

  const [ companies, setCompanies ] = useRecoilState(companiesState);
  const { status, error } = useLoadCompanies();

  const history = useHistory();

  const handleAdd = async () => {
    const newCompany = await createCompany();
    history.push(`/company/${newCompany._id}/info`);
  };

  const handleDelete = async ({ target: { id }}) => {
    await deleteCompany(id);
    const remainingCompanies = await fetchCompanies();
    setCompanies(remainingCompanies);
    // setCompanies(companies.filter((company) => company._id !== Number(id)));
  };

  if (status === 'loading') return <Loading component="Home" error={ error } />

  return (
  
    <>
      <Headers />
      <Title text="Companies" />
      { companies.map((company) => <CompanyListItem key={ company._id } company={ company } handleDelete={ handleDelete } />) }
      <AddButton name="Add Company" text="Add Company" handleAdd={ handleAdd } />
    </>
  
  );

};

export default Home;