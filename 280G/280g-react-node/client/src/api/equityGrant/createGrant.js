import defaultGrant from '../../utilities/equityGrant/default';

export const createGrant = async (executiveId) => {
  const url = 'http://localhost:5000/equitygrant';
  const options = {
    method: 'POST', 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ executive: executiveId, ...defaultGrant })
  };
  const response = await fetch(url, options);
  return await response.json();
};