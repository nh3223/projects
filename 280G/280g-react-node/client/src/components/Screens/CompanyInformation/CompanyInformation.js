import React, { useState, useRef, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil'
import { formatISO } from 'date-fns';

import { companyNameState, transactionPriceState, transactionDateState } from '../../../recoil/company';
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

  const { id } = useParams();
  
  const [ companyName, setCompanyName ] = useRecoilState(companyNameState);
  const [ transactionDate, setTransactionDate ] = useRecoilState(transactionDateState);
  const [ transactionPrice, setTransactionPrice ] = useRecoilState(transactionPriceState);
  const [ completed, setCompleted ] = useState({});
  const formSubmit = useRef(false);

  const history = useHistory();

  const companyNameHandlers = {
    change: (e) => setCompanyName(e.target.value),
    edit: () => {
      setCompleted({ ...completed, name: false });
      formSubmit.current = true;
    },
    submit: (e) => {
      e.preventDefault();
      setCompleted({ ...completed, name: true });
    }
  };
  
  const transactionDateHandlers = {
    change: (date) => {
      setTransactionDate(date);
      setCompleted({ ...completed, date: true });
    },
    edit: () => {
      setCompleted({ ...completed, date: false });
      formSubmit.current = true;
    }
  };  
  
  const transactionPriceHandlers = {
    change: (e) => setTransactionPrice(e.target.value),
    edit: () => {
      setCompleted({ ...completed, price: false });
      formSubmit.current = true;
    },
    submit: () => setCompleted({ ...completed, price: true })
  };

  useEffect(() => {
    
    const save = async (company) => {
      const savedCompany = await createCompany(company);
      history.push(`/company/${savedCompany._id}/info`);
    };
    
    const edit = async (company) => {
      await editCompany(id, company);
    };
    
    const company = JSON.stringify({
      name: companyName,
      transactionDate: formatISO(transactionDate),
      transactionPrice
    });

    if (formSubmit.current) {
      console.log(company)
      if (isCompleted(completed)) { 
        (id) ? edit(company) : save(company);
      }
    }
  }, [id, completed, companyName, transactionDate, transactionPrice, history]);
  
  useEffect(() => {
    (id) 
    ? setCompleted({ name: true, date: true, price: true })
    : setCompleted({ name: false, date: false, price: false })
  }, [id, setCompleted]);
  
  return (
    <>
      <CompanyHeader companyId={ id } />
      <LoadCompany companyId={ id } />
      <LoadExecutives companyId={ id } />
      <h2>Company Information</h2>
      <CompanyName companyName={ companyName } completed={ completed.name } handlers={ companyNameHandlers } />
      <TransactionDate transactionDate={ transactionDate } completed={ completed.date } handlers={ transactionDateHandlers } />
      <TransactionPrice transactionPrice={ transactionPrice } completed={ completed.price } handlers={ transactionPriceHandlers } />
      { id && <Executives companyId={ id }/> }
    </>
  );
};

export default CompanyInformation;