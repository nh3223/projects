export const fetchExecutive = async (executiveId) => {
  const url = `http://localhost:5000/executive/${executiveId}`;
  const response = await fetch(url);
  return await response.json();
};