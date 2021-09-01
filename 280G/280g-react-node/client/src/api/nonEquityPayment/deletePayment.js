export const deletePayment = async (paymentId) => {
  const url = `http://localhost:5000/nonequitypayment/${paymentId}`;
  const options = { method: 'DELETE' };
  const response = await fetch(url, options);
  return await response.json();
};