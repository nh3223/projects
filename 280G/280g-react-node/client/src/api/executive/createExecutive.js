import { defaultExecutive } from '../../utilities/executive/default';

export const createExecutive = async (companyId) => {
  const url = 'http://localhost:5000/executive';
  const newExecutive = JSON.stringify({
    company: companyId,
    ...defaultExecutive
  })
  const options = {
    method: 'POST', 
    headers: { "Content-Type": "application/json" },
    body: newExecutive
  };
  const response = await fetch(url, options);
  return await response.json();
};
