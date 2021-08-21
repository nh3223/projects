

export const api = async (apiAction, parameters) => {
  const [ url, options ] = apiAction(parameters);
  const response = await fetch(url, options);
  return await response.json();
}