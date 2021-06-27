export const createExecutive = async (executive) => {
  const url = 'http://localhost:5000/executive';
  const options = {
    method: 'POST', 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(executive)
  };
  const response = await fetch(url, options);
  return await response.json();
};

export const deleteExecutive = async (id) => {
  console.log(id);
  const url = `http://localhost:5000/executive/${id}`;
  const options = { method: 'DELETE' };
  const response = await fetch(url, options);
  return await response.json();
};

export const editExecutive = async (executive) => {
  console.log('editExecutive api', executive);
  const url = `http://localhost:5000/executive/${executive._id}`;
  const options = {
    method: 'PATCH',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(executive)
  };
  const response = await fetch(url, options);
  return await response.json();
}

export const fetchExecutives = async (id) => {
  const url = `http://localhost:5000/company/executives/${id}`;
  const response = await fetch(url);
  return await response.json();
};

export const fetchExecutive = async (id) => {
  const url = `http://localhost:5000/executive/${id}`;
  const response = await fetch(url);
  return await response.json();
};