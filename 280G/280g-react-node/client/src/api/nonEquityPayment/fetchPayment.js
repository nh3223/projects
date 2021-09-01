export const fetchPayment = async (paymentId) => {
  const url = `http://localhost:5000/nonequitypayment/${paymentId}`;
  const response = await fetch(url);
  return await response.json();
};