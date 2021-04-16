const updateScore = (scores, updates) => {
  //updates = { problemId, time }
  const targetTime = 3
  const problemScore =  targetTime / updates.time;
  scores[updates.problemId] = problemScore
  return scores
}

const scoreReducer = (scores, action) => {
  const types = {
    'GET_SCORES': action.scores,
    'UPDATE_SCORE': updateScore(scores, action.updates)
  }
  return types[action.types] || scores;
};

export default scoreReducer;