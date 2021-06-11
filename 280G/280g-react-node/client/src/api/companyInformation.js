export const fetchCompanyInformation = async (id) => {
  const url = `http://localhost:5000/company/${id}`;
  const response = await fetch(url);
  return await response.json();
};

export const fetchExecutives = async (id) => {
  const url = `http://localhost:5000/company/executives/${id}`;
  const response = await fetch(url);
  return await response.json();
};