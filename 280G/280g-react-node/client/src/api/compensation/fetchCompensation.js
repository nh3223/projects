export const fetchCompensation = async (executiveId) => {
  const url = `http://localhost:5000/compensation/${executiveId}`;
  const response = await fetch(url);
  return await response.json();
};