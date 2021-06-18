import { fetchCompany } from "../api/company";

const getCompanyData = (id, company) => {
  
  console.log('getCOmpanyData', company);
  return ({
  id,
  name: company.name,
  transactionDate: company.transactionDate,
  transactionPrice: company.transactionPrice
  });
};

const getDefaultCompanyData = () => ({
  id: '',
  name: '',
  transactionDate: '',
  transactionPrice: ''
});

export const getCompany = async (id) => {
  const company = await fetchCompany(id);
  console.log(company);
  return (id) ? getCompanyData(id, company) : getDefaultCompanyData();
};

export const getCompanyCompleted = (id) => ((id)
  ? { name: true, transactionDate: true, transactionPrice: true }
  : { name: false, transactionDate: false, transactionPrice: false }
);