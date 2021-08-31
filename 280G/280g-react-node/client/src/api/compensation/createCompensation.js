import { defaultCompensation } from '../../utilities/compensation/default';

export const createCompensation = async (executiveId) => {
  const url = 'http://localhost:5000/compensation';
  const newCompensation = JSON.stringify({
    executive: executiveId,
    ...defaultCompensation
  });
  const options = {
    method: 'POST', 
    headers: { "Content-Type": "application/json" },
    body: newCompensation
  };
  const response = await fetch(url, options);
  return await response.json();
};
