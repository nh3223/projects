import React from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { deleteCompany } from '../../../api/company/deleteCompany';
import { useLoadCompanies } from '../../../hooks/useLoadCompanies';
import { companiesState } from '../../../recoil/company';

import Loading from '../Loading/Loading';
import Title from '../../Elements/TextElements/Title/Title';
import CompanyListItem from './CompanyListItem';
import AddButton from '../../Elements/Buttons/AddButton/AddButton';

const Home = () => {

  const [ companies, setCompanies ] = useRecoilState(companiesState);
  const { loading, error } = useLoadCompanies();

  const history = useHistory();

  const handleAdd = () => history.push(`/company/info`);

  const handleDelete = async ({ target: { id }}) => {
    await deleteCompany(id);
    setCompanies(companies.filter((company) => company._id !== Number(id)));
  };

  if (loading) return <Loading component="Home" error={ error } />

  return (
  
    <>
      <Title text="Companies" />
      { companies.map((company) => <CompanyListItem key={ company._id } company={ company } handleDelete={ handleDelete } />) }
      <AddButton name="Add Company" text="Add Company" handleAdd={ handleAdd } />
    </>
  
  );

};

export default Home;