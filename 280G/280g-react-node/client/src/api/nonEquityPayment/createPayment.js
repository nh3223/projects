import { defaultNonEquityPayment } from "../../utilities/nonEquityPayment/default";

export const createPayment = async (executiveId) => {
  const url = 'http://localhost:5000/nonequitypayment';
  const newPayment = JSON.stringify({
    executive: executiveId,
    ...defaultNonEquityPayment
  });
  const options = {
    method: 'POST', 
    headers: { "Content-Type": "application/json" },
    body: newPayment
  };
  const response = await fetch(url, options);
  return await response.json();
};