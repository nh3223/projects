export const fetchCompanies = async () => {
  const url = 'http://localhost:5000/company';
  const response = await fetch(url);
  return await response.json();
};

export const fetchCompany = async (id) => {
  const url = `http://localhost:5000/company/${id}`;
  const response = await fetch(url);
  return await response.json();
};

export const createCompany = async (company) => {
  const url = 'http://localhost:5000/company';
  const options = {
    method: 'POST', 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(company)
  };
  console.log('create company', options)
  const response = await fetch(url, options);
  return await response.json();
};

export const editCompany = async (id, company) => {
  const url = `http://localhost:5000/company/${id}`;
  const options = {
    method: 'PATCH', 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(company)
  };
  const response = await fetch(url, options);
  return await response.json();
};

export const saveCompany = async (company) => {
  const companyData = JSON.stringify({
    name: company.name,
    transactionPrice: company.transactionPrice,
    transactionDate: company.transactionDate
  });
  if (company.id) {
    return await editCompany(company.id, companyData);
  } else {
    return await createCompany(companyData);
  }
};

export const deleteCompany = async (id) => {
  const url = `http://localhost:5000/company/${id}`;
  const options = {
    method: 'DELETE'
  };
  const response = await fetch(url, options);
  return await response.json();
};






