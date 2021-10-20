export const createExecutive = async (companyId) => {
  const url = 'http://localhost:5000/executive';
  const options = {
    method: 'POST', 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ company: companyId })
  };
  const response = await fetch(url, options);
  return await response.json();
};
