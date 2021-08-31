import defaultGrant from '../../utilities/equityGrant/default';

export const createGrant = async (executiveId) => {
  const url = 'http://localhost:5000/equitygrant';
  const newGrant = JSON.stringify({
    executive: executiveId,
    ...defaultGrant
  });
  const options = {
    method: 'POST', 
    headers: { "Content-Type": "application/json" },
    body: newGrant
  };
  const response = await fetch(url, options);
  return await response.json();
};