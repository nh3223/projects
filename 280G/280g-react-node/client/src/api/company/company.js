import { defaultCompany } from "../../recoil/company";

export const fetchCompanies = async () => {
  const url = 'http://localhost:5000/company';
  const response = await fetch(url);
  return await response.json();
};

export const fetchCompany = async (companyId) => {
  const url = `http://localhost:5000/company/${companyId}`;
  const response = await fetch(url);
  return await response.json();
};

export const createCompany = async () => {
  const url = 'http://localhost:5000/company';
  const options = {
    method: 'POST', 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(defaultCompany)
  };
  const response = await fetch(url, options);
  return await response.json();
};

export const editCompany = async (companyId, edits) => {
  const url = `http://localhost:5000/company/${companyId}`;
  const options = {
    method: 'PATCH', 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(edits)
  };
  const response = await fetch(url, options);
  return await response.json();
};

export const deleteCompany = async (companyId) => {
  const url = `http://localhost:5000/company/${companyId}`;
  const options = {
    method: 'DELETE'
  };
  const response = await fetch(url, options);
  return await response.json();
};






