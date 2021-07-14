export const createGrant = async (grant) => {
  const url = 'http://localhost:5000/option';
  const options = {
    method: 'POST', 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(grant)
  };
  const response = await fetch(url, options);
  return await response.json();
};

export const deleteGrant = async (id) => {
  const url = `http://localhost:5000/option/${id}`;
  const options = { method: 'DELETE' };
  const response = await fetch(url, options);
  return await response.json();
};

export const editGrant = async (grant) => {
  const url = `http://localhost:5000/option/${grant._id}`;
  const options = {
    method: 'PATCH',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(grant)
  };
  const response = await fetch(url, options);
  return await response.json();
}

export const fetchGrants = async (id) => {
  const url = `http://localhost:5000/option/executive/${id}`;
  const response = await fetch(url);
  return await response.json();
};

export const fetchGrant = async (id) => {
  const url = `http://localhost:5000/option/${id}`;
  const response = await fetch(url);
  return await response.json();
};