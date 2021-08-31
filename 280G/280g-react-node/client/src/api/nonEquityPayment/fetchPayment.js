export const fetchPayment = async (grantId) => {
  const url = `http://localhost:5000/nonequitypayment/${grantId}`;
  const response = await fetch(url);
  return await response.json();
};