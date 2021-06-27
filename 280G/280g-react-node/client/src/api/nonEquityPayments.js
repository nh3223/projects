export const createPayment = async (payment) => {
  const url = 'http://localhost:5000/nonequitypayment';
  const options = {
    method: 'POST', 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payment)
  };
  const response = await fetch(url, options);
  return await response.json();
};

export const deletePayment = async (id) => {
  const url = `http://localhost:5000/nonequitypayment/${id}`;
  const options = { method: 'DELETE' };
  const response = await fetch(url, options);
  return await response.json();
};

export const editPayment = async (payment) => {
  console.log('edit payment', payment);
  const url = `http://localhost:5000/nonequitypayment/${payment._id}`;
  const options = {
    method: 'PATCH',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payment)
  };
  const response = await fetch(url, options);
  return await response.json();
}

export const fetchPayments = async (id) => {
  console.log('fetch payments', id);
  const url = `http://localhost:5000/nonequitypayment/executive/${id}`;
  const response = await fetch(url);
  return await response.json();
};

export const fetchPayment = async (id) => {
  const url = `http://localhost:5000/nonequitypayment/${id}`;
  const response = await fetch(url);
  return await response.json();
};