export const fetchCompensation = async (id) => {
  const url = `http://localhost:5000/executive/${id}`;
  const response = await fetch(url);
  return await response.json();
};
