export const deleteCompensation = async (executiveId) => {
  const url = `http://localhost:5000/compensation/${executiveId}`;
  const options = { method: 'DELETE' };
  const response = await fetch(url, options);
  return await response.json();
};