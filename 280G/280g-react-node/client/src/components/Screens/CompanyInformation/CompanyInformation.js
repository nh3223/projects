import React, { useState, useRef, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil'

import { companyState } from '../../../recoil/company';
import { createCompany, editCompany } from '../../../api/company';
import isCompleted from '../../../utilities/isCompleted';

import LoadCompany from '../../Loaders/LoadCompany';
import LoadExecutives from '../../Loaders/LoadExecutives';
import CompanyHeader from '../../Navigation/CompanyHeader';
import CompanyName from './CompanyName/CompanyName';
import TransactionDate from './TransactionDate/TransactionDate';
import TransactionPrice from './TransactionPrice/TransactionPrice';
import Executives from './Executives/Executives';

const CompanyInformation = () => {

  const { companyId } = useParams();
  const history = useHistory();

  const [ company, setCompany ] = useRecoilState(companyState);
  const [ completed, setCompleted ] = useState((companyId)
    ? { companyName: true, transactionDate: true, transactionPrice: true }
    : { companyName: false, transactionDate: false, transactionPrice: false }
  );
  
  const edit = useRef((companyId) ? false : true);
  
  const handleChange = (name, value) => setCompany({ ...company, [name]: value });
  
  const handleEdit = ({ target: { name } }) => {
    setCompleted({ ...completed, [name]: false });
    edit.current = true;
  };
    
  const handleSubmit = (e) => {
    e.preventDefault();
    setCompleted({ ...completed, [e.target.name]: true });
  };

  const handlers = { handleChange, handleEdit, handleSubmit };

  // const companyNameHandlers = {
  //   change: (e) => setCompany({ ...company, name: e.target.value }),
  //   edit: () => setCompleted({ ...completed, name: false }),
  //   submit: () => {
  //     setCompleted({ ...completed, name: true });
  //     formSubmit.current = true;
  //   }
  // };
  
  // const transactionDateHandlers = {
  //   change: (date) => {
  //     setCompany({ ...company, transactionDate: formatISO(date) });
  //     setCompleted({ ...completed, date: true });
  //     formSubmit.current = true;
  //   },
  //   edit: () => setCompleted({ ...completed, date: false })
  // };
  
  // const transactionPriceHandlers = {
  //   change: (e) => setCompany({ ...company, transactionPrice: e.target.value }),
  //   edit: () => setCompleted({ ...completed, price: false }),
  //   submit: () => {
  //     setCompleted({ ...completed, price: true });
  //     formSubmit.current = true;
  //   }
  // };

  useEffect(() => {
    
    const create = async (companyData) => {
      const savedCompany = await createCompany(companyData);
      history.push(`/company/${savedCompany._id}/info`);
    };
    
    const edit = async (companyData) => await editCompany(companyId, companyData);
    
    const companyData = JSON.stringify(company);

    if (isCompleted(completed) && edit.current) {
      (companyId) ? edit(companyData) : create(companyData);
      edit.current = false;
    }

  }, [companyId, completed, company, history]);
  
  return (
    <>
      <CompanyHeader companyId={ companyId } />
      <LoadCompany companyId={ companyId } />
      <LoadExecutives companyId={ companyId } />
      <h2>Company Information</h2>
      <CompanyName companyName={ company.companyName } completed={ completed.companyName } handlers={ handlers } />
      <TransactionDate transactionDate={ company.transactionDate } completed={ completed.transactionDate } handlers={ handlers } />
      <TransactionPrice transactionPrice={ company.transactionPrice } completed={ completed.transactionPrice } handlers={ handlers } />
      { companyId && <Executives companyId={ companyId }/> }
    </>
  );
};

export default CompanyInformation;