import React, { useState, useRef, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil'
import { parseISO, formatISO } from 'date-fns';

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
  const [ completed, setCompleted ] = useState({});
  const formSubmit = useRef(false);
  
  const companyNameHandlers = {
    change: (e) => setCompany({ ...company, name: e.target.value }),
    edit: () => setCompleted({ ...completed, name: false }),
    submit: () => {
      setCompleted({ ...completed, name: true });
      formSubmit.current = true;
    }
  };
  
  const transactionDateHandlers = {
    change: (date) => {
      setCompany({ ...company, transactionDate: formatISO(date) });
      setCompleted({ ...completed, date: true });
      formSubmit.current = true;
    },
    edit: () => setCompleted({ ...completed, date: false })
  };
  
  const transactionPriceHandlers = {
    change: (e) => setCompany({ ...company, transactionPrice: e.target.value }),
    edit: () => setCompleted({ ...completed, price: false }),
    submit: () => {
      setCompleted({ ...completed, price: true });
      formSubmit.current = true;
    }
  };

  useEffect(() => {
    
    const create = async (companyData) => {
      const savedCompany = await createCompany(companyData);
      history.push(`/company/${savedCompany._id}/info`);
    };
    
    const edit = async (company) => await editCompany(companyId, companyData);
    
    const companyData = JSON.stringify(company);

    if (isCompleted(completed) && formSubmit.current) {
      (companyId) ? edit(companyData) : create(companyData);
      formSubmit.current = false;
    }

  }, [companyId, completed, company, history]);
  
  useEffect(() => {
    (companyId)
    ? setCompleted({ name: true, date: true, price: true })
    : setCompleted({ name: false, date: false, price: false }) 
  }, [companyId, setCompleted]);
  
  return (
    <>
      <CompanyHeader companyId={ companyId } />
      <LoadCompany companyId={ companyId } />
      <LoadExecutives companyId={ companyId } />
      <h2>Company Information</h2>
      <CompanyName companyName={ company.name } completed={ completed.name } handlers={ companyNameHandlers } />
      <TransactionDate transactionDate={ company.transactionDate } completed={ completed.date } handlers={ transactionDateHandlers } />
      <TransactionPrice transactionPrice={ company.transactionPrice } completed={ completed.price } handlers={ transactionPriceHandlers } />
      { companyId && <Executives companyId={ companyId }/> }
    </>
  );
};

export default CompanyInformation;