export const fetchCompanies = async () => {
  const url = 'http://localhost:5000/company';
  const response = await fetch(url);
  return await response.json();
};