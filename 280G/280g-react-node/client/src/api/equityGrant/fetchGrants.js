export const fetchGrants = async (executiveId) => {
  const url = `http://localhost:5000/equitygrant/executive/${executiveId}`;
  const response = await fetch(url);
  return await response.json();
};
