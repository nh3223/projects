export const deleteGrant = async (grantId) => {
  const url = `http://localhost:5000/equitygrant/${grantId}`;
  const options = { method: 'DELETE' };
  const response = await fetch(url, options);
  return await response.json();
};