import { fetchCompensation } from '../api/compensation';


const getExecutiveCompensation = async (id) => await fetchCompensation(id);

export const getCompensation = async (executives) => {
  const compensation = {}
  for (const executive of executives) {
    compensation[executive] = await getExecutiveCompensation(executive._id);
  };
  return compensation;
};