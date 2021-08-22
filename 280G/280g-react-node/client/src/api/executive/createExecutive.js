import { defaultExecutive } from '../../utilities/executive/executive';

export const createExecutive = async (companyId) => {
  const url = 'http://localhost:5000/executive';
  const options = {
    method: 'POST', 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ company: companyId, ...defaultExecutive })
  };
  const response = await fetch(url, options);
  return await response.json();
};
