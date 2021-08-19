export const deleteExecutive = async (id) => {
  const url = `http://localhost:5000/executive/${id}`;
  const options = { method: 'DELETE' };
  const response = await fetch(url, options);
  return await response.json();
};