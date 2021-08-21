import { defaultExecutive } from '../../utilities/executive/executive';

export const createExecutive = async () => {
  const url = 'http://localhost:5000/executive';
  const options = {
    method: 'POST', 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(defaultExecutive)
  };
  const response = await fetch(url, options);
  return await response.json();
};
