export const fetchPayments = async (executiveId) => {
  const url = `http://localhost:5000/nonequitypayment/executive/${executiveId}`;
  const response = await fetch(url);
  return await response.json();
};