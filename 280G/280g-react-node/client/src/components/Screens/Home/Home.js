import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { fetchCompanies } from '../../api/company';
import { deleteCompany } from '../../api/company';

import Title from '../Elements/Title/Title';
import CompanyListItem from './CompanyListItem';
import AddButton from '../Elements/AddButton/AddButton';

const Home = () => {

  const [ companies, setCompanies ] = useState();

  const history = useHistory();

  const handleAdd = () => history.push(`/company/info`);

  const handleDelete = async ({ target: { name }}) => {
    const id = name;
    await deleteCompany(id);
    setCompanies(companies.filter((company) => (company._id !== id)));
  };

  useEffect(() => {
    const getCompanies = async () => {
      const companyData = await fetchCompanies();
      setCompanies(companyData);
    };
    getCompanies();
  }, [setCompanies]);

  return (
  
    <>
      <Title text="Companies" />
      { companies.map((company) => <CompanyListItem key={ company._id } company={ company } handleDelete={ handleDelete } />) }
      <AddButton name="Add Company" text="Add Company" handleAdd={ handleAdd } />
    </>
  
  );

};

export default Home;