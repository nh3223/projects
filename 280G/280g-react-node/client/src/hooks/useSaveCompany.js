import { useEffect } from 'react';

import { saveCompany } from '../api/company';
import isCompleted from '../utilities/isCompleted';

const useSaveCompany = (company, completed) => {
  useEffect(() => {
    const save = async (company) => await saveCompany(company);
    if (isCompleted(completed)) { save(company); }
  }, [completed, company]);
};

export default useSaveCompany;