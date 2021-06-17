import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { companyState, defaultCompanyState, companyCompletedState, defaultCompletedState } from '../../recoil/atoms/company';
import { fetchCompanies } from '../../api/company';
import { deleteCompany } from '../../api/company';

const Home = () => {

  const [ companies, setCompanies ] = useState([]);
  const setCompany = useSetRecoilState(companyState);
  const setCompleted = useSetRecoilState(companyCompletedState);

  const handleDelete = async (e) => {
    const id = e.target.name;
    await deleteCompany(id);
    setCompanies(companies.filter((company) => (company._id !== id)));
  };

  useEffect(() => {
    setCompany(defaultCompanyState);
    setCompleted(defaultCompletedState);
  }, [setCompany, setCompleted]);

  useEffect(() => {
    const getCompanies = async () => {
      const companyData = await fetchCompanies();
      setCompanies(companyData);
    };
    getCompanies();
  }, []);

  return (
    <>
      <h1>Companies</h1>

      { companies.map((company) => (
        <div key={ company._id }>
          <Link to={`/company/${company._id}/info`}>
            <h2>{ company.name }</h2>
          </Link>
          <button name={ company._id } onClick={ handleDelete }>Delete Company</button>
        </div>
      ))}
      <Link to={ '/company/info' }>
        <button>Add Company</button>
      </Link>
      
    </>
    );
};

export default Home;