export const fetchExecutives = async (executiveId) => {
  const url = `http://localhost:5000/executive`;
  const response = await fetch(url);
  return await response.json();
};