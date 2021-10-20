export const createCompany = async () => {
  const url = 'http://localhost:5000/company';
  const options = {
    method: 'POST', 
    headers: { "Content-Type": "application/json" },
    body: { }
  };
  const response = await fetch(url, options);
  return await response.json();
};
