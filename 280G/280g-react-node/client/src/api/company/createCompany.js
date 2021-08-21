import { defaultCompany } from "../../utilities/company/company";

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
