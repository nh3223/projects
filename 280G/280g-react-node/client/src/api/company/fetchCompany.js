export const fetchCompany = async (companyId) => {
  const url = `http://localhost:5000/company/${companyId}`;
  const response = await fetch(url);
  return await response.json();
};