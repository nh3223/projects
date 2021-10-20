export const createPayment = async (executiveId) => {
  const url = 'http://localhost:5000/nonequitypayment';
  const options = {
    method: 'POST', 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ executive: executiveId })
  };

  const response = await fetch(url, options);
  return await response.json();
};