import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { fetchCompanies } from '../../api/company';

const Home = () => {

  const [ companies, setCompanies ] = useState([]);

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
        <Link key={ company._id } to={`/company/${company._id}`}>
          <h2>{ company.name }</h2>
        </Link>
      ))}
    </>
    );
};

export default Home;