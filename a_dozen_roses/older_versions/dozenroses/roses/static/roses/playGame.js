import { getProblems, saveScores } from './fetch.js';
import { getProgress, updateProgress, showProgressBar } from './progress.js';
import { getSpeechRecognition } from './speech.js';

const playGame = async () => {
    
    document.getElementById('play').style.display = 'none';
    document.getElementById('problems').style.display = 'block';
    
    const problems = await getProblems();
    const progress = await getProgress(problems);
    const selectedProblems = await selectProblems(problems);
  
    await showProgressBar(progress, problems.length);
    
    let results =  [];
    for (const problem of selectedProblems) {
        result = await answerProblem(problem, progress);
        progress = updateProgress(problem.score, result.score, progress);
        await showProgressBar(progress, problems.length);
        results.push(result);
    }
    
    saveScores(results);
    play()
};

const answerProblem = async (problem) => {
    let time = null;
    const scoreMultiplier = 20;
    while (!time) {
        time = await solveProblem(problem);
    }
    return {
        'id': problem.id,
        'score': time * scoreMultiplier
    };
};

const selectProblems = (problems) => {    
    const availableProblems = problems.filter(problem => problem.level <= current_user.level);
    return pickProblems(availableProblems);
};

const pickProblems = (problems) => {
    
    const totalScore = problems.reduce((total, problem) => total + problem.score, 0);
    let cumulativeScore = 0;
    problems.map(problem => {
        const weight = score / totalScore;
        problem.weight = cumulativeScore + weight
        cumulativeScore +=  weight
    });
    pickedProblems = []
    for (let i = 0; i < 12; i++) {
        randomChoice = Math.random();
        const pick = problems.filter(problem => problem.weight > Math.random())[0];
        pickedProblems.push(pick);
        problems = problems.filter(problem => problem != pick);
    }
    return pickedProblems;
};

const solveProblem = async (current_problem) => {
    recognition = await getSpeechRecognition()
    document.getElementById('show_problem').innerHTML = current_problem.problem
    startTime = performance.now()
    recognition.start()
    console.log('speech on')
    recognition.onresult = (event) => {
        return new Promise((resolve) => {
            result = getTime(event);
            resolve(result);
        });
    };
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

export { playGame };


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