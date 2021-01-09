document.addEventListener('DOMContentLoaded', async function() {  
    const currentUser = await getCurrentUser();
    (currentUser) ? play() : login();
  });

const clear = () => {
    views = ['progress_bar_container','play', 'login', 'problems'];
    views.forEach(element => document.getElementById(element).style.display = 'none');
};

const getCurrentUser = ()  => {
    fetch('/user')
    .then(response => response.json())
    .then(response => currentUser = response.user)
};

const play = async () => {
    await clear();
    document.getElementById('play').style.display = 'block';
    document.getElementById('play_game_button').addEventListener('click', () => playGame());
};

const login = async () => {
    await clear();
    document.getElementById('login').style.display = 'block';
};

const playGame = async () => {
    
    document.getElementById('play').style.display = 'none';
    document.getElementById('problems').style.display = 'block';
    
    const problems = await getProblems();
    await showProgressBar(problems);
    const scores = await playRound(problems);
    saveScores(scores);
    play()
}

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

const playRound = async (problems) => {
    
    const selectedProblems = await selectProblems(problems);
    let results = []
    for (const problem of selectedProblems) {
        let time = null;
        while (!time) {
            time = await solveProblem(problem);
        }
        results.push({'id': problem.id, 'score': Math.exp(time)})
    }
};

const selectProblems = (problems) => {    
    const availableProblems = problems.filter(problem => problem.level <= current_user.level);
    return pick_problems(availableProblems);
}

const pickProblems = (problems) => {
    
    const totalScore = problems.reduce((total, problem) => total + problem.score, 0);
    let cumulativeScore = 0;
    problems.map(problem => {
        const weight = score / totalScore;
        problem.weight = cumulativeScore + weight
        cumulativeScore +=  weight
    });
    pickedProblems = []
    for (let i = 0, i < 12; i++) {
        randomChoice = Math.random();
        const pick = problems.filter(problem => problem.weight > Math.random())[0];
        pickedProblems.push(pick);
        problems = problems.filter(problem => problem != pick);
    }
    return pickedProblems;
}

const show_progress_bar = () => {
    document.getElementById('progress_bar_container').style.display = 'block'
    const progress = await get_progress()
    progress_bar = document.getElementById('progress_bar')
    console.log(progress)
    progress_bar.setAttribute('aria-valuenow', progress)
    progress_bar.setAttribute('style',`width: ${progress}%`)
}

const solveProblem = async (current_problem) => {
    recognition = await getSpeechRecognition()
    document.getElementById('show_problem').innerHTML = current_problem.problem
    startTime = performance.now()
    recognition.start()
    console.log('speech on')
    recognition.onresult = (event) => await getTime(event); 
    recognition.onerror = (event) => console.log(event);
    recognition.onnomatch = (event) => console.log(event);
    recognition.stop();
};
    
const getTime = (event) => {
    endTime = performance.now();
    time = (endTime - startTime) / 1000;
    answer = event.results[0][0].transcript;
    recognition.stop();
    return {
        'time': time,
        'answer': answer
    };
};


/*    return new Promise((resolve) => {
        time = get_time(current_problem, start_time, recognition)
        resolve(time)
    });
}

function get_time(current_problem, start_time, recognition, number_text) {
    return new Promise((resolve) => {
        recognition.onresult = function(event) {
            console.log(event)
            end_time = performance.now()
            const number = event.results[0][0].transcript;
            console.log(number);
            time = (end_time - start_time) / 1000;
            if (number != current_problem.answer) {
                time = time + 5
            }
            recognition.stop()
            console.log(time)
            resolve(time)
        }
        recognition.onerror = function(event) {
            console.log(event)
        }

        recognition.onnomatch = function(event) {
            console.log(event)
        }
    });
}
*/
function get_progress() {
    return fetch('/progress')
    .then(response => response.json())
}



