export const editPayment = async (grantId, edits) => {
  const url = `http://localhost:5000/nonequitypayment/${grantId}`;
  const options = {
    method: 'PATCH',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(edits)
  };
  const response = await fetch(url, options);
  return await response.json();
}