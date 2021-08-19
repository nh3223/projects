export const editExecutive = async (executive) => {
  const url = `http://localhost:5000/executive/${executive._id}`;
  const options = {
    method: 'PATCH',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(executive)
  };
  const response = await fetch(url, options);
  return await response.json();
};

