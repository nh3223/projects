import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { formatISO } from 'date-fns';

import LoadExecutive from '../../Loaders/LoadExecutive';
import StartDate from './StartDate/StartDate';
import BasePeriodCompensation from './BasePeriodCompensation/BasePeriodCompensation';
import FirstYearPayments from './FirstYearPayments/FirstYearPayments';
import ExecutiveHeader from '../../Navigation/ExecutiveHeader';
import { executiveState, } from '../../../recoil/executive';
import { editExecutive } from '../../../api/executive';
import { getYears, getCompensation } from '../../../utilities/getCompensation';

const Compensation = () => {

  const { executiveId } = useParams();

  const [ executive, setExecutive ] = useRecoilState(executiveState(executiveId));
  const [ completed, setCompleted ] = useState({});
  const onLoad = useRef(true);
  const startDate = useRef(executive.startDate);

  const startDateHandlers = {
    change: async (date) => {
      const updatedExecutive = { ...executive, startDate: formatISO(date) }
      setExecutive(updatedExecutive);
      await editExecutive(updatedExecutive);
      setCompleted({ ...completed, startDate: true });
    },
    edit: () => setCompleted({ ...completed, startDate: false })
  };

  const basePeriodCompensationHandlers = {
    change: ({ target: { name, value }}) => {
      const year = Number(name);
      setExecutive({ ...executive, basePeriodCompensation: { ...executive.basePeriocCompensation, [year]: value} });
    },
    edit: (e) => {
      const year = Number(e.target.name);
      setCompleted({ ...completed, basePeriodCompensation: { ...executive.basePeriodCompensation, [year]: false } });
    },
    submit: async (year) => {
      await editExecutive(executive);
      setCompleted({ ...completed, basePeriodCompensation: { ...executive.basePeriodCompensation, [year]: true } });
    }
  };

  const firstYearPaymentHandlers = {
    change: (e) => setExecutive({ ...executive, firstYearPayments: e.target.value }),
    edit: () => setCompleted({ ...completed, firstYearPayments: false }),
    submit: async () => {
      await editExecutive(executive);
      setCompleted({ ...completed, firstYearPayments: true });
    }
  };

  useEffect(() => {    
    if (onLoad) {  
      const startDateCompleted = (executive.startDate) ? true : false;
      const firstYearPaymentsCompleted = (executive.firstYearPayments) ? true : false;
      const compensationCompleted = {};
      for (const year in executive.basePeriodCompensation) {
        compensationCompleted[year] = (executive.basePeriodCompensation[year]) ? true : false;
      }
      setCompleted({
        startDate: startDateCompleted,
        firstYearPayments: firstYearPaymentsCompleted,
        basePeriodCompensation: compensationCompleted
      });
      onLoad.current = false;
    }
  }, [executive, setCompleted])

  useEffect(() => {
    if ((startDate.current !== executive.startDate) && executive.startDate) {
      const years = (getYears(executive.startDate));
      const compensation = getCompensation(years, executive.basePeriodCompensation);
      setExecutive({ ...executive, basePeriodCompensation: compensation });
      startDate.current = executive.startDate;
    }
  }, [executive, setExecutive]);

  return (
    <>
      <ExecutiveHeader executiveId={ executiveId } />
      <LoadExecutive executiveId={ executiveId } />
      <h1>Executive: { executive.name }</h1>
      <StartDate startDate={ executive.startDate } completed={ completed.startDate } handlers={ startDateHandlers } />
      <BasePeriodCompensation  basePeriodCompensation={ executive.basePeriodCompensation } startDate={ executive.startDate } completed={ completed.basePeriodCompensation } handlers={ basePeriodCompensationHandlers } />
      <FirstYearPayments firstYearPayments={ executive.firstYearPayments } completed={ completed.firstYearPayments } handlers={ firstYearPaymentHandlers } />        
    </>  
  );
};
export default Compensation;