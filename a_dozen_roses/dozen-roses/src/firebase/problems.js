import database from './firebase';

export const fetchProblems = async () => {
  const data = await database.ref('problems').once('value');
  const problems = data.val();
  return problems;
};