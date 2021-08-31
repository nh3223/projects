export const fetchExecutives = async (companyId) => {
  const url = `http://localhost:5000/company/${companyId}/executives`;
  const response = await fetch(url);
  return await response.json();
};