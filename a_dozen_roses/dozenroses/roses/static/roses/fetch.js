const getCurrentUser = ()  => {
    fetch('/user')
    .then(response => response.json())
    .then(user => console.log(user))
    .then(user => (user) ? user : null)
};

const getProblems = () => {
    return fetch('/problems')
      .then(response => response.json())
};

const saveScores = (scores) => {
    fetch('/scores', {
        method: 'PUT',
        body: JSON.stringify(scores)
    });
};

export {
    getCurrentUser,
    getProblems,
    saveScores
};