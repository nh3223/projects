export const editCompensation = async (executiveId, edits) => {
  const url = `http://localhost:5000/compensation/${executiveId}`;
  const options = {
    method: 'PATCH',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(edits)
  };
  console.log('api', edits, options)
  const response = await fetch(url, options);
  return await response.json();
};
