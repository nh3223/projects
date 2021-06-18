export const fetchCompensation = async (id) => {
  const url = `http://localhost:5000/compensation/executive/${id}`;
  const response = await fetch(url);
  return await response.json();
};

export const createCompensation = async (compensation) => {
  const url = 'http://localhost:5000/compensation';
  const options = {
    method: 'POST', 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(compensation)
  };
  const response = await fetch(url, options);
  return await response.json();
};

export const deleteCompensation = async (id) => {
  const url = `http://localhost:5000/compensation/${id}`;
  const options = { method: 'DELETE' };
  const response = await fetch(url, options);
  return await response.json();
};

export const editCompensation = async (compensation) => {
  const url = `http://localhost:5000/compensation/${compensation._id}`;
  const options = {
    method: 'PATCH',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(compensation)
  };
  const response = await fetch(url, options);
  return await response.json();
};