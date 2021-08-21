export const deleteCompany = async (companyId) => {
  const url = `http://localhost:5000/company/${companyId}`;
  const options = {
    method: 'DELETE'
  };
  const response = await fetch(url, options);
  return await response.json();
};