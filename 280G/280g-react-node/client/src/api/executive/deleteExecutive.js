export const deleteExecutive = async (executiveId) => {
  const url = `http://localhost:5000/executive/${executiveId}`;
  const options = { method: 'DELETE' };
  const response = await fetch(url, options);
  return await response.json();
};