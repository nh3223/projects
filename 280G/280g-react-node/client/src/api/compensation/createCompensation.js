import { defaultCompensation } from '../../utilities/compensation/defaultCompensation';

export const createCompensation = async (executiveId) => {
  const url = 'http://localhost:5000/compensation';
  const options = {
    method: 'POST', 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ executive: executiveId, ...defaultCompensation })
  };
  const response = await fetch(url, options);
  return await response.json();
};