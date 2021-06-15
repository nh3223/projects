import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { fetchCompanies } from '../../api/company';
import { deleteCompany } from '../../api/company';

const Home = () => {

  const [ companies, setCompanies ] = useState([]);

  const handleDelete = async (e) => {
    const id = e.target.name;
    await deleteCompany(id);
    setCompanies(companies.filter((company) => (company._id !== id)));
  };

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
        <>
          <Link key={ company._id } to={`/company/${company._id}/info`}>
            <h2>{ company.name }</h2>
          </Link>
          <button name={ company._id } onClick={ handleDelete }>Delete Company</button>
        </>
      ))}
      <Link to={ '/company/info' }>
        <button>Add Company</button>
      </Link>
      
    </>
    );
};

export default Home;