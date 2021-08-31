export const fetchGrant = async (grantId) => {
  const url = `http://localhost:5000/equitygrant/${grantId}`;
  const response = await fetch(url);
  return await response.json();
};