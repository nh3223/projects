export const deletePayment = async (grantId) => {
  const url = `http://localhost:5000/nonequitypayment/${grantId}`;
  const options = { method: 'DELETE' };
  const response = await fetch(url, options);
  return await response.json();
};