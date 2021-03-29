export const createScore = ({  problemId, score = 0 } = { }) => ({
  type: 'CREATE_SCORE',
  score: {
    problemId,
    score
  }
});